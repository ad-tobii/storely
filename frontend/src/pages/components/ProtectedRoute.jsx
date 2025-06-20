import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../lib/axios"
import { Loader2 } from "lucide-react";

/**
 * This component acts as a gatekeeper for routes that require customer authentication.
 * It makes a single API call to a protected backend endpoint on mount.
 *
 * - If the API call succeeds (HTTP 200), it means the user has a valid session
 *   cookie and is authorized. The component then renders its children (the protected page).
 *
 * - If the API call fails due to an authentication or authorization error (HTTP 401/403),
 *   it means the user is not logged in or does not have the correct role. The component
 *   then redirects the user to the /login page, preserving the originally requested URL
 *   as a query parameter so they can be sent back after a successful login.
 */
const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAccess = async () => {
      try {
        // This endpoint is protected by the `protectRoute` middleware on the backend.
        // It will only succeed if the user sends a valid session cookie.
        await axiosInstance.get('/cart/check-access');

        // If the request succeeds, the user is an authorized customer.
        setIsAuthorized(true);
      } catch (error) {
        // If the backend returns 401 (Unauthorized) or 403 (Forbidden),
        // the user is not allowed to see this page.
        if (error.response?.status === 401 || error.response?.status === 403) {
          // Construct the login URL with a redirect parameter.
          // This tells the login page where to send the user back to after they log in.
          const redirectUrl = location.pathname + location.search;
          navigate(`/login?redirect=${encodeURIComponent(redirectUrl)}`);
        } else {
          // Handle other potential server errors (e.g., 500 Internal Server Error)
          console.error("Authorization check failed with an unexpected error:", error);
          // You could navigate to a generic error page here if you have one.
          // For now, we'll just prevent rendering.
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyAccess();
  }, [navigate, location]);

  // While the check is in progress, display a full-page loading spinner.
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center bg-zinc-900">
        <Loader2 className="w-12 h-12 animate-spin text-white" />
      </div>
    );
  }

  // If authorization is confirmed, render the child component (the protected page).
  // If not authorized, this will return null, as the `navigate` function in the
  // `catch` block will have already initiated a redirect.
  return isAuthorized ? children : null;
};

export default ProtectedRoute;
import { useEffect } from 'react';
import { axiosInstance } from '../../../lib/axios'; // Adjust the import path based on your project structure

/**
 * A custom React hook to track a user's SESSION visit to a seller's store.
 * It sends a "fire-and-forget" request. The backend uses a cookie to ensure
 * a visit is only tracked once per 30-minute session.
 *
 * @param {string | null | undefined} sellerId - The ID of the seller whose store is being visited. The hook will not run until this is provided.
 */
export const useVisitTracker = (sellerId) => {
    
    useEffect(() => {
        // This function will contain the logic for the API call.
        const track = async () => {
            // 1. Guard Clause: Don't do anything if we don't have the seller's ID yet.
            if (!sellerId) {
                return;
            }

            try {
                // 2. Fire-and-forget POST request. The backend's cookie logic
                // will determine if this is a new visit or part of an existing session.
                axiosInstance.post('/api/visits', {
                    sellerId: sellerId,
                    // We no longer need to send the page path
                });

            } catch (error) {
                // 3. Fail Silently
                console.error("Visit tracking failed:", error.message);
            }
        };

        track();

    // 4. Dependency Array: This effect should run ONLY when the sellerId changes.
    // This is perfect for a storefront layout where the seller ID is consistent
    // across all pages of that store.
    }, [sellerId]);

};
// components/ProductReviews.jsx
"use client"
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../../../../store/useAuthStore';
import { axiosInstance } from '../../../../../lib/axios';
import { Star, Send, Loader2 } from 'lucide-react';

const StarRating = ({ rating, setRating, readOnly = false }) => (
    <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map(star => (
            <Star
                key={star}
                className={`w-6 h-6 transition-colors ${readOnly ? '' : 'cursor-pointer'}`}
                fill={star <= rating ? '#facc15' : 'none'}
                stroke={star <= rating ? '#facc15' : '#9ca3af'}
                onClick={() => !readOnly && setRating(star)}
            />
        ))}
    </div>
);

export default function ProductReviews({ productId, sellerId }) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userCanReview, setUserCanReview] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const { isAuthenticated, user } = useAuthStore();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch existing reviews
                const reviewsRes = await axiosInstance.get(`/reviews/${productId}`);
                setReviews(reviewsRes.data);

                // Check eligibility if user is a logged-in customer
                if (isAuthenticated && user?.role === 'customer') {
                    const eligibilityRes = await axiosInstance.get(`/reviews/eligibility/${productId}`);
                    setUserCanReview(eligibilityRes.data.canReview);
                }
            } catch (err) {
                setError('Failed to load reviews.');
            } finally {
                setLoading(false);
            }
        };
        if (productId) fetchData();
    }, [productId, isAuthenticated, user]);

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        if (rating === 0 || !comment) {
            setError('Please provide a rating and a comment.');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            const newReview = await axiosInstance.post(`/reviews/${productId}`, { rating, comment });
            setReviews([newReview.data, ...reviews]);
            setUserCanReview(false);
            setComment('');
            setRating(0);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit review.');
        } finally {
            setSubmitting(false);
        }
    };
    
    if (loading) return <div className="py-8 text-center"><Loader2 className="animate-spin inline-block"/></div>;

    return (
        <div className="mt-16 pt-10 border-t border-gray-200">
            <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
            
            {userCanReview && (
                <div className="mb-12 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
                    <form onSubmit={handleSubmitReview}>
                        <div className="mb-4">
                            <label className="block font-medium mb-2">Your Rating</label>
                            <StarRating rating={rating} setRating={setRating} />
                        </div>
                        <div className="mb-4">
                             <label className="block font-medium mb-2">Your Comment</label>
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                rows="4"
                                className="w-full p-2 border rounded-md"
                                placeholder={`Tell us what you think about this product...`}
                                required
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                        <button type="submit" disabled={submitting} className="bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 disabled:bg-blue-400">
                            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            Submit Review
                        </button>
                    </form>
                </div>
            )}
            
            {reviews.length > 0 ? (
                <div className="space-y-8">
                    {reviews.map(review => (
                        <div key={review._id} className="pb-6 border-b last:border-b-0">
                            <div className="flex items-center mb-2">
                                <StarRating rating={review.rating} readOnly={true} />
                                <p className="ml-4 font-bold">{review.customer.fullname}</p>
                                <p className="ml-auto text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</p>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No reviews yet. Be the first to share your thoughts!</p>
            )}
        </div>
    );
}
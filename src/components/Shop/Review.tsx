import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import ReviewForm from './ReviewForm';
import { submitReview, ReviewData } from '../../services/reviews';
import { useAuthStore } from '../../stores/authStore';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import ReviewCard from '../ui/ReviewCard';

interface Review {
  id: number;
  name: string;
  stars: number;
  comment: string;
  date: string;
  image?: string;
}


const Review: React.FC = () => {
  const [displayedReviews, setDisplayedReviews] = useState<Review[]>([]);
  const [reviewStack, setReviewStack] = useState<Review[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { isAuthenticated } = useAuthStore();
  const reviewsPerPage = 8;

  // Sample review data
  const sampleReviews: Review[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      stars: 5,
      comment: "Amazing product! Exceeded my expectations. Highly recommend to everyone.",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Mike Chen",
      stars: 4,
      comment: "Great quality and fast shipping. Will definitely order again.",
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Emily Davis",
      stars: 5,
      comment: "Perfect! Exactly what I was looking for. Customer service was excellent too.",
      date: "3 days ago",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      name: "David Wilson",
      stars: 3,
      comment: "Good product overall, but could be better.",
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Lisa Brown",
      stars: 5,
      comment: "Outstanding quality and value for money. Very satisfied with my purchase.",
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      name: "Alex Rodriguez",
      stars: 4,
      comment: "Fast delivery and good packaging. Product works as described.",
      date: "4 days ago"
    },
    {
      id: 7,
      name: "Maria Garcia",
      stars: 5,
      comment: "Love it! Will definitely buy again. Great customer service.",
      date: "6 days ago",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=200&fit=crop"
    },
    {
      id: 8,
      name: "John Smith",
      stars: 4,
      comment: "Good product, meets expectations. Would recommend to friends.",
      date: "1 week ago"
    },
    {
      id: 9,
      name: "Anna Taylor",
      stars: 5,
      comment: "Excellent quality! Better than I expected. Will order more soon.",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=200&fit=crop"
    },
  ];

  // Stack operations
  const pushToStack = (review: Review) => {
    setReviewStack(prevStack => [review, ...prevStack]);
  };

  useEffect(() => {
    console.log('Initializing review stack:', sampleReviews);
    setReviewStack([...sampleReviews]);
    
    // Pop initial reviews from stack
    const initialReviews = sampleReviews.slice(0, reviewsPerPage);
    const remainingStack = sampleReviews.slice(reviewsPerPage);
    
    setDisplayedReviews(initialReviews);
    setReviewStack(remainingStack);
    setShowViewMore(remainingStack.length > 0);
    
    console.log('Initialized with:', {
      displayed: initialReviews.length,
      remainingInStack: remainingStack.length,
      showMore: remainingStack.length > 0
    });
  }, []);

  const handleViewMore = () => {
    setIsLoadingMore(true);
    
    // Pop next batch from stack
    const nextBatch = reviewStack.slice(0, reviewsPerPage);
    const remainingStack = reviewStack.slice(reviewsPerPage);
    
    if (nextBatch.length > 0) {
      setDisplayedReviews(prev => [...prev, ...nextBatch]);
      setReviewStack(remainingStack);
      setShowViewMore(remainingStack.length > 0);
    }
    
    setIsLoadingMore(false);
  };


  const handleFormSubmit = async (formData: ReviewData) => {
    // Check authentication before submitting
    if (!isAuthenticated) {
      toast.error('Please sign in to submit your review', {
        duration: 4000,
        icon: '🔒',
      });
      return;
    }

    try {
      // Show loading toast
      const loadingToast = toast.loading('Submitting your review...');
      
      // Submit review to Shopify backend
      const result = await submitReview(formData);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success('Thank you for your review! You will receive 60 points.', {
          duration: 4000,
          icon: '⭐',
        });
        
        // Create new review and push to stack
        const newReview: Review = {
          id: Date.now(),
          name: formData.name,
          stars: formData.rating,
          comment: formData.text,
          date: new Date().toLocaleDateString()
        };
        
        // Push new review to stack (will appear next when "View More" is clicked)
        pushToStack(newReview);
        
        closeModal();
      } else {
        toast.error(result.message || 'Failed to submit review. Please try again.', {
          duration: 4000,
          icon: '❌',
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('An unexpected error occurred. Please try again.', {
        duration: 4000,
        icon: '❌',
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <div className="py-16 bg-[var(--background)]">
      <div className=" mx-auto px-8">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-[var(--foreground)] mb-2 uppercase tracking-wide">
              Customer Reviews
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              See what our customers are saying about our products
            </p>
          </div>
          <div className="flex justify-start">
            <button
              onClick={openModal}
              className="bg-[var(--primary)] text-[var(--background)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl uppercase tracking-wide shadow-lg"
            >
              Write A Review
            </button>
          </div>
        </div>
      </div>
        <div className="mx-auto px-8">
       <ResponsiveMasonry
                columnsCountBreakPoints={{350: 1, 750: 2, 900: 3 , 1200: 4}}
                // gutterBreakpoints={{350: "12px", 750: "16px", 900: "24px"}}
            >
              <Masonry>
                {displayedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </Masonry>
      </ResponsiveMasonry>
      </div>

      {showViewMore && (
        <div className="flex justify-center mt-8">
          <button 
            onClick={handleViewMore} 
            disabled={isLoadingMore}
            className="bg-[var(--primary)] text-[var(--background)] px-8 py-4 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl uppercase tracking-wide shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoadingMore ? 'Loading...' : 'View More Reviews'}
          </button>
        </div>
      )}

      {/* Review Form Modal */}
      <ReviewForm
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default Review;

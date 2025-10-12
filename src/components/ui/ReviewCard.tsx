
interface Review {
  id: number;
  name: string;
  stars: number;
  comment: string;
  date: string;
  image?: string;
}

function ReviewCard({ review }: { review: Review }) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${
          i < rating ? 'text-[var(--primary)]' : 'text-gray-500'
        }`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-[var(--background)] border border-[var(--border)] rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[var(--primary)] block w-full">
      {/* User Image */}
      {review.image && (
        <div className="mb-4">
          <img 
            src={review.image} 
            alt={review.name} 
            className="w-full  object-cover border-2 border-[var(--primary)]"
          />
        </div>
      )}
      
      {/* Review Content */}
      <div className="space-y-3">
        {/* Name and Stars */}
        <div className="flex items-center justify-between">
          <h3 className="text-[var(--foreground)] font-semibold text-lg">
            {review.name}
          </h3>
          <div className="flex">
            {renderStars(review.stars)}
          </div>
        </div>
        
        {/* Comment */}
        <p className="text-[var(--text-secondary)] leading-relaxed">
          {review.comment}
        </p>
        
        {/* Date */}
        <p className="text-gray-400 text-sm">
          {review.date}
        </p>
      </div>
    </div>
  )
}

export default ReviewCard

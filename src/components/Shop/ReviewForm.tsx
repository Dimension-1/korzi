import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Frown, Meh, Smile, Heart, Star, Camera,X } from 'lucide-react';

interface ReviewFormData {
  rating: number;
  text: string;
  name: string;
  email: string;
  images: FileList | null;
  video: File | null;
}

interface ReviewFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormData) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRating, setSelectedRating] = useState(5);
  const [formData, setFormData] = useState<ReviewFormData>({
    rating: 5,
    text: '',
    name: '',
    email: '',
    images: null,
    video: null
  });

  const ratingOptions = [
    { icon: Frown, rating: 1, label: 'Very Poor' },
    { icon: Meh, rating: 2, label: 'Poor' },
    { icon: Smile, rating: 3, label: 'Average' },
    { icon: Heart, rating: 4, label: 'Good' },
    { icon: Star, rating: 5, label: 'Excellent' }
  ];

  const handleRatingClick = (rating: number) => {
    setSelectedRating(rating);
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleNext = () => {
    if (!formData.text.trim()) {
      toast.error('Please share your experience before proceeding.');
      return;
    }
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name.');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email.');
      return;
    }
    if (!isValidEmail(formData.email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    onSubmit(formData);
    handleClose();
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setFormData({
      rating: 5,
      text: '',
      name: '',
      email: '',
      images: null,
      video: null
    });
    setSelectedRating(5);
    setCurrentStep(1);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 py-0 backdrop-blur-sm overflow"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-[var(--background)] border border-[var(--border)] rounded-xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-[var(--border)]">
          <h3 className="text-lg sm:text-xl font-bold text-[var(--foreground)] uppercase tracking-wide">Write A Review</h3>
          <button
            onClick={handleClose}
            className="text-[var(--text-secondary)] hover:text-[var(--foreground)] text-xl sm:text-2xl font-bold transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-4 sm:p-6">
          {/* Points Info */}
          <div className="mb-6">
            <p className="text-sm text-[var(--primary)]">
              You will receive <strong className="text-[var(--foreground)]">60 Points</strong> for leaving a review.
            </p>
          </div>

          {/* Step 1: Rating and Text */}
          {currentStep === 1 && (
            <>
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2 uppercase tracking-wide">
                  How was your experience?
                </h4>
                <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">
                  Your feedback is valuable in helping us better understand your needs and tailor our service accordingly.
                </p>
              </div>

              {/* Rating Icons */}
              <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 mb-6">
                {ratingOptions.map(({ icon: Icon, rating, label }) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingClick(rating)}
                    className={`flex flex-col items-center p-1 sm:p-2 md:p-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 ${
                      selectedRating === rating 
                        ? 'bg-[var(--primary)]/20 border-2 border-[var(--primary)] scale-105 shadow-lg' 
                        : 'hover:bg-[var(--background)] border-2 border-transparent hover:border-[var(--border)]'
                    }`}
                    title={label}
                  >
                    <Icon 
                      size={20} 
                      className={`sm:w-6 sm:h-6 md:w-7 md:h-7 transition-colors duration-200 ${
                        selectedRating === rating 
                          ? 'text-[var(--primary)]' 
                          : 'text-[var(--text-secondary)] hover:text-[var(--foreground)]'
                      }`} 
                    />
                    <span className={`text-xs mt-1 font-medium transition-colors duration-200 text-center ${
                      selectedRating === rating 
                        ? 'text-[var(--primary)]' 
                        : 'text-[var(--text-secondary)]'
                    }`}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Text Review */}
              <div className="mb-6">
                <textarea
                  value={formData.text}
                  onChange={(e) => setFormData(prev => ({ ...prev, text: e.target.value }))}
                  placeholder="Share your experience using this product"
                  rows={4}
                  className="w-full p-3 sm:p-4 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] resize-none transition-all duration-200 text-sm sm:text-base"
                />
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-[var(--primary)] text-[var(--background)] py-3 sm:py-4 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Next
              </button>
            </>
          )}

          {/* Step 2: Personal Info */}
          {currentStep === 2 && (
            <>
              {/* Form Fields */}
              <div className="space-y-4 sm:space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2 sm:mb-3 uppercase tracking-wide">
                    Name <span className="text-[var(--primary)]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full p-3 sm:p-4 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-200 text-sm sm:text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[var(--foreground)] mb-2 sm:mb-3 uppercase tracking-wide">
                    Email <span className="text-[var(--primary)]">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="Enter your email"
                    className="w-full p-3 sm:p-4 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] placeholder-[var(--text-secondary)] focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)] transition-all duration-200 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>

              {/* Upload Bonus */}
              <div className="mb-6">
                <p className="text-sm text-[var(--secondary)] font-semibold">
                  💡 Upload an image or video to receive a 1.5X bonus! (Optional)
                </p>
              </div>

              {/* Upload Options */}
              <div className="mb-6">
                <div className="flex items-center p-3 sm:p-4 md:p-5 border border-[var(--border)] rounded-lg hover:bg-[var(--primary)]/5 cursor-pointer transition-all duration-200 hover:border-[var(--primary)]/50">
                  <div className="mr-3 sm:mr-4 flex-shrink-0">
                    <Camera size={20} className="text-[var(--primary)] sm:w-6 sm:h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[var(--foreground)] uppercase tracking-wide text-sm sm:text-base">Upload Media (Optional)</div>
                    <div className="text-xs sm:text-sm text-[var(--text-secondary)]">Images (up to 5) or Video (max 50 MB)</div>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        const images: File[] = [];
                        let video: File | null = null;
                        
                        Array.from(files).forEach(file => {
                          if (file.type.startsWith('image/')) {
                            images.push(file);
                          } else if (file.type.startsWith('video/')) {
                            video = file;
                          }
                        });
                        
                        setFormData(prev => ({ 
                          ...prev, 
                          images: images.length > 0 ? images as any : null,
                          video: video
                        }));
                      }
                    }}
                    className="hidden"
                    id="media-upload"
                  />
                  <label htmlFor="media-upload" className="cursor-pointer flex-shrink-0">
                    <div className="text-[var(--text-secondary)] hover:text-[var(--primary)] font-semibold transition-colors duration-200 text-xs sm:text-sm">Choose</div>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-[var(--background)] border-2 border-[var(--border)] text-[var(--foreground)] py-3 sm:py-4 rounded-lg font-semibold hover:bg-[var(--border)]/20 hover:border-[var(--primary)] transition-all duration-300 uppercase tracking-wide text-sm sm:text-base"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-[var(--primary)] text-[var(--background)] py-3 sm:py-4 rounded-lg font-semibold hover:bg-[var(--secondary)] transition-all duration-300 uppercase tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
                >
                  Submit
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;

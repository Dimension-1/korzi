import { useState } from 'react';
import { Tag } from 'lucide-react';

interface CouponInputProps {
  onApplyCoupon: (code: string) => Promise<{ success: boolean; discount?: number; message?: string }>;
  appliedCoupon?: string;
  discount?: number;
}

export default function CouponInput({ onApplyCoupon, appliedCoupon, discount }: CouponInputProps) {
  const [couponCode, setCouponCode] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState('');

  const handleApply = async () => {
    if (!couponCode.trim()) return;
    
    setIsApplying(true);
    setError('');
    
    try {
      const result = await onApplyCoupon(couponCode.trim().toUpperCase());
      
      if (!result.success) {
        setError(result.message || 'Invalid coupon code');
      } else {
        setCouponCode('');
      }
    } catch (err) {
      setError('Failed to apply coupon');
    } finally {
      setIsApplying(false);
    }
  };

  if (appliedCoupon) {
    return (
      <div className="bg-[#1a1a1a] border border-[#02FF00]/30 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#02FF00]" />
            <span className="text-white text-sm font-medium">{appliedCoupon}</span>
            <span className="text-[#02FF00] text-sm">-₹{discount?.toFixed(0)}</span>
          </div>
          <button
            onClick={() => onApplyCoupon('')}
            className="text-red-400 text-sm hover:text-red-300"
          >
            Remove
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <Tag className="w-4 h-4 text-[#02FF00]" />
        <h3 className="text-white text-sm font-medium">Have a coupon code?</h3>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
          placeholder="Enter code"
          className="flex-1 px-3 py-2 bg-[#393737] text-white border border-white/30 rounded-lg focus:ring-2 focus:ring-[#02FF00] focus:border-[#02FF00] text-sm"
          disabled={isApplying}
        />
        <button
          onClick={handleApply}
          disabled={isApplying || !couponCode.trim()}
          className="px-4 py-2 bg-[#02FF00] hover:bg-[#00DD00] text-black font-medium rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isApplying ? 'Applying...' : 'Apply'}
        </button>
      </div>
      
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  );
}

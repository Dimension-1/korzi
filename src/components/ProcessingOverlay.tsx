import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProcessingOverlayProps {
  message?: string;
}

const ProcessingOverlay: React.FC<ProcessingOverlayProps> = ({ 
  message = 'Processing your order...' 
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-sm mx-4 text-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
        <p className="text-sm text-gray-600">Please wait, do not close this window</p>
      </div>
    </div>
  );
};

export default ProcessingOverlay;

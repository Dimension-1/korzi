import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, CheckCircle, Truck, RefreshCw } from 'lucide-react';
import { trackByLrn, trackByAwb, TrackingData } from '../services/bigship';

interface ShipmentTrackingProps {
  orderId: string;
  awbNumber?: string;
}

const ShipmentTracking: React.FC<ShipmentTrackingProps> = ({ orderId, awbNumber }) => {
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTracking();
  }, [orderId]);

  const fetchTracking = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Try tracking by AWB if available, otherwise by LRN
      const data = awbNumber 
        ? await trackByAwb(awbNumber)
        : await trackByLrn(orderId);
        
      setTracking(data);
    } catch (err) {
      setError('Tracking information not available yet');
      console.error('Tracking error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="ml-3 text-gray-600">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (error || !tracking) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <Package className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800 text-sm">
              {error || 'Tracking information will be available once the shipment is picked up'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const orderDetail = tracking.order_detail;
  const scanHistories = tracking.scan_histories || [];

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('delivered')) return 'bg-green-100 text-green-800';
    if (statusLower.includes('transit') || statusLower.includes('out for delivery')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('pickup')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Truck className="w-5 h-5 mr-2 text-blue-600" />
          Shipment Tracking
        </h3>
        <button
          onClick={fetchTracking}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Status Badge */}
      <div className="mb-6">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderDetail.current_tracking_status)}`}>
          {orderDetail.current_tracking_status}
        </span>
      </div>

      {/* Tracking Number */}
      {orderDetail.tracking_id && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">
            Tracking Number ({orderDetail.tracking_type.toUpperCase()})
          </p>
          <p className="text-lg font-mono font-semibold text-gray-900">
            {orderDetail.tracking_id}
          </p>
          {orderDetail.courier_name && (
            <p className="text-sm text-gray-600 mt-1">
              Courier: <span className="font-medium text-gray-900">{orderDetail.courier_name}</span>
            </p>
          )}
        </div>
      )}

      {/* Current Status */}
      {orderDetail.current_tracking_status && (
        <div className="mb-6 flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
          <Package className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-blue-600 font-medium">Current Status</p>
            <p className="text-gray-900 mt-1">{orderDetail.current_tracking_status}</p>
            {orderDetail.current_tracking_datetime && (
              <p className="text-xs text-gray-500 mt-1">
                Last updated: {new Date(orderDetail.current_tracking_datetime).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tracking Timeline */}
      {scanHistories.length > 0 && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-900 mb-3">Tracking History</h4>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {scanHistories.map((scan, index) => (
              <div key={index} className="relative flex items-start space-x-4 mb-6 last:mb-0">
                {/* Timeline dot */}
                <div className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full ${
                  index === 0 
                    ? 'bg-blue-600' 
                    : 'bg-gray-300'
                }`}>
                  {index === 0 ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                
                {/* Activity details */}
                <div className="flex-1 pt-1 pb-4">
                  <p className="text-sm font-medium text-gray-900">
                    {scan.scan_status}
                  </p>
                  {scan.scan_remarks && (
                    <p className="text-sm text-gray-600 mt-1">
                      {scan.scan_remarks}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-4 mt-2">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(scan.scan_datetime).toLocaleString()}</span>
                    </div>
                    {scan.scan_location && (
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <MapPin className="w-3 h-3" />
                        <span>{scan.scan_location}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No tracking updates */}
      {scanHistories.length === 0 && (
        <div className="text-center py-8">
          <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-sm text-gray-500">
            No tracking updates available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
};

export default ShipmentTracking;

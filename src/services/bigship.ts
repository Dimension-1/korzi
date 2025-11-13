const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

export interface ScanHistory {
  scan_datetime: string;
  scan_status: string;
  scan_remarks: string;
  scan_location: string;
}

export interface TrackingData {
  order_detail: {
    courier_name: string;
    tracking_type: string;
    tracking_id: string;
    invoice_id: string;
    order_manifest_datetime: string;
    current_tracking_datetime: string;
    current_tracking_status: string;
  };
  scan_histories: ScanHistory[];
}

// Create shipment (complete flow)
export const createShipment = async (orderData: any): Promise<any> => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/bigship/create-shipment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderData })
    });
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to create shipment');
    }
    
    return data;
  } catch (error) {
    console.error('Error creating BigShip shipment:', error);
    throw error;
  }
};

// Track by LRN
export const trackByLrn = async (lrn: string): Promise<TrackingData> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/bigship/track-lrn/${lrn}`
    );
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to track shipment');
    }
    
    return data.tracking;
  } catch (error) {
    console.error('Error tracking by LRN:', error);
    throw error;
  }
};

// Track by AWB
export const trackByAwb = async (awb: string): Promise<TrackingData> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/bigship/track-awb/${awb}`
    );
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to track by AWB');
    }
    
    return data.tracking;
  } catch (error) {
    console.error('Error tracking by AWB:', error);
    throw error;
  }
};

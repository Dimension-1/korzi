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
    const response = await fetch(`${BACKEND_URL}/api/shiprocket/create-shipment`, {
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
    console.error('Error creating Shiprocket shipment:', error);
    throw error;
  }
};

// Track by Shipment ID
export const trackByShipmentId = async (shipmentId: string): Promise<TrackingData> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/shiprocket/track/${shipmentId}`
    );
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to track shipment');
    }
    
    // Normalize Shiprocket tracking response to match our TrackingData interface
    const trackingInfo = data.tracking?.tracking_data || data.tracking;
    
    return {
      order_detail: {
        courier_name: trackingInfo?.courier_name || trackingInfo?.shipment_track?.[0]?.courier_name || '',
        tracking_type: 'shipment_id',
        tracking_id: shipmentId,
        invoice_id: trackingInfo?.order_id?.toString() || '',
        order_manifest_datetime: trackingInfo?.shipment_track?.[0]?.pickup_date || '',
        current_tracking_datetime: trackingInfo?.shipment_track?.[0]?.current_timestamp || '',
        current_tracking_status: trackingInfo?.shipment_status?.toString() || trackingInfo?.shipment_track?.[0]?.current_status || ''
      },
      scan_histories: (trackingInfo?.shipment_track_activities || trackingInfo?.tracking_data?.shipment_track_activities || []).map((activity: any) => ({
        scan_datetime: activity.date || '',
        scan_status: activity.status || activity.activity || '',
        scan_remarks: activity.activity || '',
        scan_location: activity.location || ''
      }))
    };
  } catch (error) {
    console.error('Error tracking by shipment ID:', error);
    throw error;
  }
};

// Track by AWB
export const trackByAwb = async (awb: string): Promise<TrackingData> => {
  try {
    const response = await fetch(
      `${BACKEND_URL}/api/shiprocket/track-awb/${awb}`
    );
    
    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to track by AWB');
    }
    
    const trackingInfo = data.tracking?.tracking_data || data.tracking;
    
    return {
      order_detail: {
        courier_name: trackingInfo?.courier_name || '',
        tracking_type: 'awb',
        tracking_id: awb,
        invoice_id: trackingInfo?.order_id?.toString() || '',
        order_manifest_datetime: trackingInfo?.pickup_date || '',
        current_tracking_datetime: trackingInfo?.current_timestamp || '',
        current_tracking_status: trackingInfo?.shipment_status?.toString() || ''
      },
      scan_histories: (trackingInfo?.shipment_track_activities || []).map((activity: any) => ({
        scan_datetime: activity.date || '',
        scan_status: activity.status || activity.activity || '',
        scan_remarks: activity.activity || '',
        scan_location: activity.location || ''
      }))
    };
  } catch (error) {
    console.error('Error tracking by AWB:', error);
    throw error;
  }
};

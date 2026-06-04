export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export type ServiceType = 'powerpoint' | 'animation' | 'elearning' | 'skkn' | 'gvg' | 'app';

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  unit: string;
  description: string;
  features: string[];
  revisions: string;
  targetUser: string;
}

export interface BookingOrder {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceType: ServiceType;
  packageId: string;
  quantity: number; // e.g. number of slides, animation minutes, or elearning packages
  requirements: string;
  fileLink?: string;
  attachmentName?: string;
  filename?: string;
  totalPrice: number;
  status: 'pending' | 'invoice_sent' | 'processing' | 'completed';
  createdAt: string;
  paymentMethod: string;
  // Specific to SKKN
  classSize?: string;
  className?: string;
  schoolName?: string;
}

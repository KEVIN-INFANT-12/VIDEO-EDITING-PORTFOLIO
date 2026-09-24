/** Shared data types for the video portfolio + enquiries. */

export type VideoCategory = 'short_form' | 'long_form';

export interface Video {
  id: string;
  title: string;
  description: string | null;
  category: VideoCategory;
  video_url: string;
  thumbnail_url: string | null;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

/** Payload for creating/updating a video from the admin form. */
export type VideoInput = Omit<Video, 'id' | 'created_at' | 'updated_at'>;

export type EnquiryStatus = 'new' | 'contacted' | 'closed';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  status: EnquiryStatus;
  created_at: string;
  updated_at?: string;
}

export type EnquiryInput = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
};

export const CATEGORY_LABELS: Record<VideoCategory, string> = {
  short_form: 'Short Form',
  long_form: 'Long Form',
};

export const SERVICE_OPTIONS = [
  'Short Form',
  'Long Form',
  'Cinematic Edit',
  'Motion Graphics',
  'Other',
] as const;

import { supabase } from './supabase';
import type { Enquiry, EnquiryInput, EnquiryStatus } from './types';

/** Public: submit a contact enquiry. Returns false if backend unconfigured. */
export async function createEnquiry(input: EnquiryInput): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('enquiries').insert({
    name: input.name,
    email: input.email,
    phone: input.phone || null,
    service: input.service || null,
    message: input.message,
  });
  if (error) throw error;
  return true;
}

/** Admin: list enquiries (newest first). */
export async function listEnquiries(): Promise<Enquiry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data as Enquiry[]) ?? [];
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<void> {
  if (!supabase) throw new Error('Supabase not configured');
  const { error } = await supabase
    .from('enquiries')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', id);
  if (error) throw error;
}

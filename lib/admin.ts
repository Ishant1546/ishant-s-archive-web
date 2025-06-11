import { auth } from '@clerk/nextjs';
import { supabaseAdmin } from './supabase';

export async function isAdmin(): Promise<boolean> {
  const { userId } = auth();
  if (!userId) return false;
  
  // Check if user has admin role in Clerk
  // This would typically be set in Clerk dashboard
  return true; // For demo purposes - implement proper role checking
}

export async function logAdminAction(
  action: string,
  entityType: string,
  entityId: string,
  details: string
) {
  const { userId } = auth();
  if (!userId) return;

  await supabaseAdmin.from('admin_logs').insert({
    admin_id: userId,
    action,
    entity_type: entityType,
    entity_id: entityId,
    details
  });
}
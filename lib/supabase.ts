import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          description: string;
          tags: string[];
          category_id: string;
          platform: string;
          file_url: string;
          thumb_url: string | null;
          download_count: number;
          like_count: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          description: string;
          tags?: string[];
          category_id: string;
          platform: string;
          file_url: string;
          thumb_url?: string | null;
          download_count?: number;
          like_count?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          description?: string;
          tags?: string[];
          category_id?: string;
          platform?: string;
          file_url?: string;
          thumb_url?: string | null;
          download_count?: number;
          like_count?: number;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          platform: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          platform: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          platform?: string;
        };
      };
      uploads: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          description: string;
          file_url: string;
          category_id: string;
          platform: string;
          tags: string[];
          status: 'pending' | 'approved' | 'rejected';
          approval_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          description: string;
          file_url: string;
          category_id: string;
          platform: string;
          tags?: string[];
          status?: 'pending' | 'approved' | 'rejected';
          approval_notes?: string | null;
          created_at?: string;
        };
        Update: {
          status?: 'pending' | 'approved' | 'rejected';
          approval_notes?: string | null;
        };
      };
      requests: {
        Row: {
          id: string;
          user_email: string;
          title: string;
          description: string;
          platform: string;
          fulfilled: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_email: string;
          title: string;
          description: string;
          platform: string;
          fulfilled?: boolean;
          created_at?: string;
        };
        Update: {
          fulfilled?: boolean;
        };
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          content: string;
          created_at?: string;
        };
        Update: {
          content?: string;
        };
      };
      votes: {
        Row: {
          id: string;
          post_id: string;
          user_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          user_id: string;
          created_at?: string;
        };
        Update: {};
      };
      admin_logs: {
        Row: {
          id: string;
          admin_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          details: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          admin_id: string;
          action: string;
          entity_type: string;
          entity_id: string;
          details: string;
          created_at?: string;
        };
        Update: {};
      };
      settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: {
          key: string;
          value: string;
          updated_at?: string;
        };
        Update: {
          value?: string;
          updated_at?: string;
        };
      };
    };
  };
};
export type ArticleCategory = 'context' | 'security' | 'assurance' | 'agent' | 'industry' | 'engineering' | 'leadership' | 'tutorial';

export interface Database {
  public: {
    Tables: {
      authors: {
        Row: {
          id: string;
          name: string;
          role: string | null;
          avatar_url: string | null;
          bio: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          role?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          created_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          subtitle: string | null;
          excerpt: string;
          content: string;
          category: ArticleCategory;
          category_label: string;
          author_id: string | null;
          cover_image_url: string | null;
          published: boolean;
          published_at: string | null;
          read_time: number;
          meta_title: string | null;
          meta_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          subtitle?: string | null;
          excerpt: string;
          content: string;
          category: ArticleCategory;
          category_label: string;
          author_id?: string | null;
          cover_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          read_time: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          subtitle?: string | null;
          excerpt?: string;
          content?: string;
          category?: ArticleCategory;
          category_label?: string;
          author_id?: string | null;
          cover_image_url?: string | null;
          published?: boolean;
          published_at?: string | null;
          read_time?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: {
      search_articles: {
        Args: { search_query: string };
        Returns: Database['public']['Tables']['articles']['Row'][];
      };
    };
    Enums: Record<string, never>;
  };
}

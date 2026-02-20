export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          category: string | null
          city_id: string | null
          content: string | null
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          city_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          city_id?: string | null
          content?: string | null
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          created_at: string
          faq: Json | null
          id: string
          intro_blurb: string | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          state: string
        }
        Insert: {
          created_at?: string
          faq?: Json | null
          id?: string
          intro_blurb?: string | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          state?: string
        }
        Update: {
          created_at?: string
          faq?: Json | null
          id?: string
          intro_blurb?: string | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          state?: string
        }
        Relationships: []
      }
      galleries: {
        Row: {
          caption: string | null
          city_id: string | null
          created_at: string
          event_type: string | null
          id: string
          image_url: string
          slug: string
          sort_order: number
          title: string
        }
        Insert: {
          caption?: string | null
          city_id?: string | null
          created_at?: string
          event_type?: string | null
          id?: string
          image_url: string
          slug: string
          sort_order?: number
          title: string
        }
        Update: {
          caption?: string | null
          city_id?: string | null
          created_at?: string
          event_type?: string | null
          id?: string
          image_url?: string
          slug?: string
          sort_order?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "galleries_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          budget_range: string | null
          created_at: string
          dietary_needs: string | null
          email: string
          event_city: string | null
          event_date: string | null
          event_type: string | null
          full_name: string
          guest_count: number | null
          id: string
          menu_interest: string | null
          message: string | null
          phone: string | null
          service_style: string | null
          source: string | null
          venue_address: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          dietary_needs?: string | null
          email: string
          event_city?: string | null
          event_date?: string | null
          event_type?: string | null
          full_name: string
          guest_count?: number | null
          id?: string
          menu_interest?: string | null
          message?: string | null
          phone?: string | null
          service_style?: string | null
          source?: string | null
          venue_address?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          dietary_needs?: string | null
          email?: string
          event_city?: string | null
          event_date?: string | null
          event_type?: string | null
          full_name?: string
          guest_count?: number | null
          id?: string
          menu_interest?: string | null
          message?: string | null
          phone?: string | null
          service_style?: string | null
          source?: string | null
          venue_address?: string | null
        }
        Relationships: []
      }
      menu_items: {
        Row: {
          created_at: string
          description: string | null
          dietary_tags: string[] | null
          id: string
          image_url: string | null
          menu_id: string
          name: string
          pricing_note: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          id?: string
          image_url?: string | null
          menu_id: string
          name: string
          pricing_note?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          id?: string
          image_url?: string | null
          menu_id?: string
          name?: string
          pricing_note?: string | null
          sort_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string | null
          faq: Json | null
          icon: string | null
          id: string
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          tagline: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          faq?: Json | null
          icon?: string | null
          id?: string
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          tagline?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          faq?: Json | null
          icon?: string | null
          id?: string
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          tagline?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          city_id: string | null
          client_name: string
          created_at: string
          event_type: string | null
          id: string
          quote: string
          rating: number | null
        }
        Insert: {
          city_id?: string | null
          client_name: string
          created_at?: string
          event_type?: string | null
          id?: string
          quote: string
          rating?: number | null
        }
        Update: {
          city_id?: string | null
          client_name?: string
          created_at?: string
          event_type?: string | null
          id?: string
          quote?: string
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "testimonials_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

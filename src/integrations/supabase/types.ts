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
          nearby_areas: string[] | null
          seo_description: string | null
          seo_title: string | null
          service_radius_notes: string | null
          slug: string
          state: string
          venues_or_landmarks: string[] | null
        }
        Insert: {
          created_at?: string
          faq?: Json | null
          id?: string
          intro_blurb?: string | null
          name: string
          nearby_areas?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          service_radius_notes?: string | null
          slug: string
          state?: string
          venues_or_landmarks?: string[] | null
        }
        Update: {
          created_at?: string
          faq?: Json | null
          id?: string
          intro_blurb?: string | null
          name?: string
          nearby_areas?: string[] | null
          seo_description?: string | null
          seo_title?: string | null
          service_radius_notes?: string | null
          slug?: string
          state?: string
          venues_or_landmarks?: string[] | null
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
          category: string | null
          created_at: string
          description: string | null
          dietary_tags: string[] | null
          featured: boolean | null
          id: string
          image_url: string | null
          menu_id: string
          name: string
          pricing_note: string | null
          sort_order: number
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          featured?: boolean | null
          id?: string
          image_url?: string | null
          menu_id: string
          name: string
          pricing_note?: string | null
          sort_order?: number
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          dietary_tags?: string[] | null
          featured?: boolean | null
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
      menu_sections: {
        Row: {
          created_at: string
          id: string
          is_featured: boolean
          menu_section_name: string
          menu_section_slug: string
          parent_section_slug: string | null
          section_intro: string | null
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          is_featured?: boolean
          menu_section_name: string
          menu_section_slug: string
          parent_section_slug?: string | null
          section_intro?: string | null
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          is_featured?: boolean
          menu_section_name?: string
          menu_section_slug?: string
          parent_section_slug?: string | null
          section_intro?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      menus: {
        Row: {
          best_for: string | null
          created_at: string
          description: string | null
          dietary_notes: string | null
          id: string
          menu_sections: Json | null
          name: string
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
        }
        Insert: {
          best_for?: string | null
          created_at?: string
          description?: string | null
          dietary_notes?: string | null
          id?: string
          menu_sections?: Json | null
          name: string
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
        }
        Update: {
          best_for?: string | null
          created_at?: string
          description?: string | null
          dietary_notes?: string | null
          id?: string
          menu_sections?: Json | null
          name?: string
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
        }
        Relationships: []
      }
      rental_items: {
        Row: {
          category: string
          colors: string | null
          created_at: string
          id: string
          item_name: string
          item_slug: string
          notes: string | null
          price_max: number | null
          price_min: number | null
          price_text: string | null
          service_slug: string
          sort_order: number
          subcategory: string | null
          unit: string | null
        }
        Insert: {
          category: string
          colors?: string | null
          created_at?: string
          id?: string
          item_name: string
          item_slug: string
          notes?: string | null
          price_max?: number | null
          price_min?: number | null
          price_text?: string | null
          service_slug?: string
          sort_order?: number
          subcategory?: string | null
          unit?: string | null
        }
        Update: {
          category?: string
          colors?: string | null
          created_at?: string
          id?: string
          item_name?: string
          item_slug?: string
          notes?: string | null
          price_max?: number | null
          price_min?: number | null
          price_text?: string | null
          service_slug?: string
          sort_order?: number
          subcategory?: string | null
          unit?: string | null
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
          process_steps: Json | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          sort_order: number
          starting_price_note: string | null
          tagline: string | null
          what_you_get: string[] | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          faq?: Json | null
          icon?: string | null
          id?: string
          name: string
          process_steps?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          sort_order?: number
          starting_price_note?: string | null
          tagline?: string | null
          what_you_get?: string[] | null
        }
        Update: {
          created_at?: string
          description?: string | null
          faq?: Json | null
          icon?: string | null
          id?: string
          name?: string
          process_steps?: Json | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          sort_order?: number
          starting_price_note?: string | null
          tagline?: string | null
          what_you_get?: string[] | null
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

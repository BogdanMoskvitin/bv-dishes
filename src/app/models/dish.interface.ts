export interface DishRequest {
  name: string;
  place: string;
  rating: number;
  created_at?: string;
}

export interface DishResponse {
  id: number;
  author: string;
  created_at: string;
  name: string;
  place: string;
  b_rating: number;
  v_rating: number;
}

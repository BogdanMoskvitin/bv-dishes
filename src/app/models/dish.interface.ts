export interface DishRequest {
  name: string;
  place_id: number;
  rating: number;
  created_at?: string;
}

export interface DishResponse {
  id: number;
  author: string;
  created_at: string;
  name: string;
  places: Place;
  b_rating: number;
  v_rating: number;
}

export interface Place {
  id: number;
  name: string;
}
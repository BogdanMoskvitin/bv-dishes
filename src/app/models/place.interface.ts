export interface PlaceRequest {
  name: string;
  address: string;
  rating: number;
}

export interface PlaceResponse {
  id: number;
  author: string;
  created_at: string;
  name: string;
  address: string;
  b_rating: number;
  v_rating: number;
}

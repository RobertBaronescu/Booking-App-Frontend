export interface Review {
  content: string;
  createdDate: Date | number;
  rating: number;
  userId: string;
  author?: string;
  avatar?: string;
}

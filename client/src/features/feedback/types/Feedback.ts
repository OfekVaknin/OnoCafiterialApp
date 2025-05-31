export interface Feedback {
  id: string;
  userId: string;
  message: string;
  rating: number; // 1-5
  createdAt: string;
}

export type Review = {
  id: number;
  text: string;
  movieId: number;
  user: {
    id: number;
    email: string;
    name: string;
  };
};

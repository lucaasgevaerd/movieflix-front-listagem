export type MovieIdContent = {
  id: number;
  imgUrl: string;
  title: string;
  year: number;
  subTitle: string;
  synopsis: string;
  genre: {
    id: number;
    name: string;
  }
};

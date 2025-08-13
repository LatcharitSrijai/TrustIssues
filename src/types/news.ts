export type Vote = {
  type: "fake" | "not-fake";
  comment: string;
  imageUrl?: string;
};

export type News = {
  id: number;
  title: string;
  shortDetail: string;
  fullDetail: string;
  status: "fake" | "not-fake";
  reporter: string;
  date: string;      
  imageUrl: string;   
  votes: Vote[];
};

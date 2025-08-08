export type TUser = {
  id: string;
  email: string;
  image: string;
  name: string;
  username: string;
};

export type TPin = {
  id: string;
  boardId: string;
  createdAt: string;
  description: string;
  imageUrl: string;
  title: string;
  updatedAt: string;
  userId: string;
  user: TUser;
};

export type TBoard = {
  id: string;
  createdAt: string;
  title: string;
  updatedAt: string;
  userId: string;
  pins: TPin[];
};

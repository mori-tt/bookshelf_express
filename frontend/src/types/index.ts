export interface Book {
  _id: string;
  title: string;
  description: string;
  comment: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface FormInputs {
  title: string;
  description: string;
  comment: string;
  rating: number;
}

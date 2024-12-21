declare module "react-rating" {
  import { ReactNode } from "react";

  interface RatingProps {
    emptySymbol: ReactNode;
    fullSymbol: ReactNode;
    fractions?: number;
    initialRating?: number;
    readonly?: boolean;
    onChange?: (value: number) => void;
  }

  const Rating: React.FC<RatingProps>;
  export default Rating;
}

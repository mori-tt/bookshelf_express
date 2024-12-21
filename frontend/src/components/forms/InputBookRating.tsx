import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Star as StarIcon } from "@smastrom/react-rating";

interface Props {
  rating: number;
  onChange: (value: number) => void;
}

const InputBookRating = ({ rating, onChange }: Props) => {
  return (
    <>
      <label className="sub-title">本の評価</label>
      <div className="form__stars">
        <Rating
          value={rating}
          onChange={onChange}
          itemStyles={{
            itemShapes: StarIcon,
            activeFillColor: "#ffd233",
            inactiveFillColor: "#e4dccb",
          }}
        />
      </div>
    </>
  );
};

export default InputBookRating;

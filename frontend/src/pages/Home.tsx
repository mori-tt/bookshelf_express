import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import bookApi from "../api/book";
import { useDispatchBooks } from "../contexts/BookContext";
import {
  InputBookTitle,
  InputBookDesc,
  InputBookComment,
  InputBookRating,
} from "../components/forms";

import Button from "../components/Button";
import { FormInputs } from "../types";

const Home = () => {
  const dispatch = useDispatchBooks();

  const navigate = useNavigate();

  const [rating, setRating] = useState(1);
  const handleChangeRating = (rating: number) => setRating(rating);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    criteriaMode: "firstError",
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const [error, setError] = useState("");
  const onSubmit = (formInputs: FormInputs) => {
    formInputs.rating = rating;

    bookApi
      .post(formInputs)
      .then((_newBook) => {
        dispatch({ type: "book/add", book: _newBook });
        reset();
        navigate("/books");
      })
      .catch((e) => {
        console.log("error occured!", e);
        setError(e);
      });
  };

  return (
    <div className="small-container">
      <h2 className="page-title">新規投稿フォーム</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputBookTitle register={register} errors={errors} />
        <InputBookDesc register={register} errors={errors} />
        <InputBookComment register={register} errors={errors} />
        <InputBookRating rating={rating} onChange={handleChangeRating} />

        <div className="error-msg text-center">{error}</div>

        <div className="footer">
          <Button className="blue">追加する</Button>
        </div>
      </form>
    </div>
  );
};

export default Home;

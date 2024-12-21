import { useState } from "react";
import { useForm } from "react-hook-form";

import { useDispatchBooks } from "../contexts/BookContext";
import bookApi from "../api/book";
import Button from "./Button";
import {
  InputBookTitle,
  InputBookDesc,
  InputBookComment,
  InputBookRating,
} from "./forms";
import { Book, FormInputs } from "../types";

interface Props {
  book: Book;
  setBook: (book: Book) => void;
  toggleEditModal: () => void;
}

const EditModal = ({ book, setBook, toggleEditModal }: Props) => {
  const dispatch = useDispatchBooks();

  const [editedBook, setEditedBook] = useState({ ...book });

  const clickCancel = () => toggleEditModal();

  const handleChangeRating = (rate: number) =>
    setEditedBook({ ...editedBook, rating: rate });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    criteriaMode: "firstError",
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    defaultValues: {
      title: editedBook.title,
      description: editedBook.description,
      comment: editedBook.comment,
      rating: editedBook.rating,
    },
  });

  const [error, setError] = useState("");
  const onSubmit = (inputs: FormInputs) => {
    const formedBook: Partial<Book> & { _id: string } = {
      _id: editedBook._id,
      rating: editedBook.rating,
      title: inputs.title,
      description: inputs.description,
      comment: inputs.comment,
    };

    bookApi
      .patch(formedBook)
      .then((_editedBook) => {
        dispatch({ type: "book/update", book: _editedBook });
        reset();
        setBook(_editedBook);
        toggleEditModal();
      })
      .catch((e) => {
        console.log("error occured!", e);
        setError(e);
      });
  };

  return (
    <div className="modal-container">
      <form className="modal" onSubmit={handleSubmit(onSubmit)}>
        <h3 className="page-title">
          [{editedBook.title}]<span>を編集</span>
        </h3>

        <InputBookTitle register={register} errors={errors} />
        <InputBookDesc register={register} errors={errors} />
        <InputBookComment register={register} errors={errors} />
        <InputBookRating
          rating={editedBook.rating}
          onChange={handleChangeRating}
        />

        <div className="error-msg text-center">{error}</div>

        <div className="footer">
          <Button className="gray mr-16" onClick={clickCancel}>
            キャンセル
          </Button>
          <Button className="blue">確定する</Button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;

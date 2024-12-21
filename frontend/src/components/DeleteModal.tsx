import { useNavigate } from "react-router-dom";

import { useDispatchBooks } from "../contexts/BookContext";
import bookApi from "../api/book";
import Button from "./Button";
import { useState } from "react";
import { Book } from "../types";

interface Props {
  book: Book;
  toggleDeleteModal: () => void;
}

const DeleteModal = ({ book, toggleDeleteModal }: Props) => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatchBooks();

  const onClickDelete = () => {
    bookApi
      .delete(book)
      .then(() => {
        dispatch({ type: "book/delete", book });
        toggleDeleteModal();
        navigate("/books");
      })
      .catch((e) => {
        console.log("error occured!", e);
        setError(e);
      });
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <h3 className="page-title">
          [{book.title}]<span>を削除しますか</span>
        </h3>
        <div className="error-msg text-center">{error}</div>
        <div className="footer">
          <Button className="gray mr-16" onClick={toggleDeleteModal}>
            キャンセル
          </Button>
          <Button className="red" onClick={onClickDelete}>
            削除
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

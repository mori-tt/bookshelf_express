import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useParams, useNavigate } from "react-router-dom";
import { Rating, Star } from "@smastrom/react-rating";

import { COLORS } from "../utils/config";
import bookApi from "../api/book";
import { Book as BookType } from "../types";

import Button from "../components/Button";
import EditModal from "../components/EditModal";
import DeleteModal from "../components/DeleteModal";

const ModalPortal = ({ children }: { children: React.ReactNode }) => {
  const target = document.querySelector(".container");
  if (!target) return null;
  return createPortal(children, target);
};

const Book = () => {
  const { id } = useParams();

  const [book, setBook] = useState<BookType>({} as BookType);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    bookApi
      .get(id)
      .then((_book) => {
        setBook(_book);
      })
      .catch((e) => {
        console.log("error occured!", e);
        setError("URLが不正です。");
      });
  }, []);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const toggleEditModal = () => setIsEditModalOpen((prev) => !prev);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const toggleDeleteModal = () => setIsDeleteModalOpen((prev) => !prev);

  const navigate = useNavigate();
  const goToBooksPage = () => navigate("/books");

  return (
    <>
      <div className="detail">
        <h3 className="book-title">{book.title}</h3>
        <div className="error-msg text-center">{error}</div>

        <div className="sub-title">本の概要</div>
        <p className="text">{book.description}</p>

        <div className="sub-title">本の感想</div>
        <p className="text">{book.comment}</p>

        <div className="sub-title">本の評価</div>
        <div className="detail__stars">
          <Rating
            value={book.rating}
            readOnly
            itemStyles={{
              itemShapes: Star,
              activeFillColor: COLORS.star.full,
              inactiveFillColor: COLORS.star.empty,
            }}
          />
        </div>

        <div className="footer">
          <Button className="blue mr-16" onClick={toggleEditModal}>
            編集
          </Button>
          <Button className="red" onClick={toggleDeleteModal}>
            削除
          </Button>
        </div>
      </div>

      {isEditModalOpen && (
        <ModalPortal>
          <EditModal
            book={book}
            setBook={setBook}
            toggleEditModal={toggleEditModal}
          />
        </ModalPortal>
      )}

      {isDeleteModalOpen && (
        <ModalPortal>
          <DeleteModal book={book} toggleDeleteModal={toggleDeleteModal} />
        </ModalPortal>
      )}

      <div className="detail__btnToBooks">
        <Button className="gray" onClick={goToBooksPage}>
          一覧へ
        </Button>
      </div>
    </>
  );
};

export default Book;

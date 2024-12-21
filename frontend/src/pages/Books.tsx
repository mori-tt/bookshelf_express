import { useBooks } from "../contexts/BookContext";

import Card from "../components/Card";

const Books = () => {
  const books = useBooks();

  if (!Array.isArray(books)) {
    return <div>データを読み込み中...</div>;
  }

  return (
    <>
      <h2 className="page-title">登録した本の一覧</h2>
      <div className="cards">
        {books.map((book) => (
          <Card key={book._id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Books;

import React, { createContext, useContext, useEffect, useReducer } from "react";

import bookApi from "../api/book";
import { Book } from "../types";

// 本の追加・更新・削除・初期化のコンテキスト
const BookContext = createContext<Book[]>([]);
const BookDispatchContext = createContext<React.Dispatch<BookContextAction>>(
  () => null
);

// 他のファイルからstateを参照できるようにエクスポート
const useBooks = () => useContext(BookContext);
const useDispatchBooks = () => useContext(BookDispatchContext);

interface BookContextState {
  books: Book[];
}

type BookContextAction =
  | {
      type: "book/init";
      books: Book[];
    }
  | {
      type: "book/add" | "book/update" | "book/delete";
      book: Book;
    };

const reducer = (
  books: Book[],
  action: BookContextAction & { books?: Book[] }
) => {
  switch (action.type) {
    case "book/init":
      return action.books;

    case "book/add":
      return [action.book, ...books];

    case "book/delete":
      return books.filter((_book) => _book._id !== action.book._id);

    case "book/update":
      const updatedBooks = books.filter(
        (_book) => _book._id !== action.book._id
      );
      updatedBooks.unshift(action.book);
      return updatedBooks;

    default:
      return books;
  }
};

const BookProvider = ({ children }: { children: React.ReactNode }) => {
  const [books, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookApi.getAll();
        dispatch({ type: "book/init", books: response });
      } catch (error) {
        console.error("Failed to fetch books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={books}>
      <BookDispatchContext.Provider value={dispatch}>
        {children}
      </BookDispatchContext.Provider>
    </BookContext.Provider>
  );
};

export { useBooks, useDispatchBooks, BookProvider };

import axios from "axios";
import { FormInputs, Book } from "../types";

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(
      error.response?.data?.msg || "時間をおいてお試しください。"
    );
  }
);

axios.defaults.withCredentials = false;

const ENDPOINT_URL = import.meta.env.VITE_BACK_URL + "/api/books";

const bookApi = {
  async get(id: string) {
    const result = await axios.get(ENDPOINT_URL + "/" + id);
    return result.data;
  },
  async getAll() {
    const result = await axios.get(ENDPOINT_URL);
    return result.data;
  },
  async post(book: FormInputs) {
    const result = await axios.post(ENDPOINT_URL, book);
    return result.data;
  },
  async delete(book: Book) {
    const result = await axios.delete(ENDPOINT_URL + "/" + book._id);
    return result.data;
  },
  async patch(book: Partial<Book> & { _id: string }) {
    const result = await axios.patch(ENDPOINT_URL + "/" + book._id, book);
    return result.data;
  },
};

export default bookApi;

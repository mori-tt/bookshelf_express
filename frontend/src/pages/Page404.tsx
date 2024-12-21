import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div className="page404">
      <h2 className="page-title">404 Not Found</h2>
      <Link to="/">トップに戻る</Link>
    </div>
  );
};

export default Page404;

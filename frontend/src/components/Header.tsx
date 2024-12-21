import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header">
        <div className="header__inner">
          <Link to="/">
            <img src="/images/logo_blue_2.png" alt="BookShelf" />
          </Link>

          <nav className="header__nav">
            <ul className="header__ul">
              <li className="header__list">
                <Link to="/">新規投稿</Link>
              </li>
              <li className="header__list">
                <Link to="/books">一覧ページ</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;

import { NavLink } from "react-router-dom";

const BookPreview = ({ bookData }) => {
  let bookUrlArr = bookData.url.split("/");
  return (
    <NavLink to={`/books/${bookUrlArr[bookUrlArr.length - 1]}`}>
      <div className="preview_container">
        <h4>{bookData.name}</h4>
        <div>Автор: {bookData.authors}</div>
        <div>Количество страниц: {bookData.numberOfPages}</div>
        <div>Издатель: {bookData.publisher}</div>
      </div>
    </NavLink>
  );
};

export default BookPreview;

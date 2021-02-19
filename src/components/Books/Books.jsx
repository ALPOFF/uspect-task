import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getBooksData,
  getFilteredBooksData,
  toggleIsFetching,
} from "../../state/books-reducer";
import BookPreview from "./BookPreview/BookPreview";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputComponent from "../common/Input/InputComponent";
import loaderGif from "./../../assets/images/loaderF.gif";
import PaginatorComponent from "../common/Paginator/PaginatorComponent";
const Books = (props) => {
  const [fromReleaseDate, setFromReleaseDate] = useState(new Date());
  const [toReleaseDate, setToReleaseDate] = useState(new Date());
  const [stateInput, setSateInput] = useState("");
  const booksMaxPage = 2;

  useEffect(() => {
    props.toggleIsFetching(true);
  }, []);

  const handleChangeInputState = (e) => {
    setSateInput(e.target.value);
  };

  const sendData = (e) => {
    props.getFilteredBooksData(
      stateInput,
      fromReleaseDate.toISOString().slice(0, -5),
      toReleaseDate.toISOString().slice(0, -5)
    );
    if (e != undefined) {
      e.preventDefault();
    }
  };

  return (
    <div className="page_main_container">
      {props.isFetching ? (
        <img src={loaderGif} alt="loading..." height={50} width={50} />
      ) : (
        <>
          <div className="filter_container">
            <InputComponent
              value={stateInput}
              onChangeValue={handleChangeInputState}
              sendData={sendData}
            />
            <DatePicker
              selected={fromReleaseDate}
              onChange={(date) => setFromReleaseDate(date)}
            />
            <DatePicker
              selected={toReleaseDate}
              onChange={(date) => setToReleaseDate(date)}
            />
            <button type="submit" onClick={() => sendData()}>
              Найти
            </button>
          </div>

          <div className="previews_container">
            {props.books.length !== 0 ? (
              props.books.map((el, index) => (
                <>
                  <BookPreview key={index} bookData={el} />
                </>
              ))
            ) : (
              <h3>Ничего не найдено</h3>
            )}
          </div>
          <PaginatorComponent
            dataArr={props.books}
            fetc={props.getBooksData}
            pageSize={9}
            maxPage={booksMaxPage}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.booksPage.books,
    filterResults: state.booksPage.filterResults,
    isFetching: state.booksPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  toggleIsFetching,
  getBooksData,
  getFilteredBooksData,
})(Books);

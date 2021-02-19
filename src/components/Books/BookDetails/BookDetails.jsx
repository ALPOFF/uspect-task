import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import {
  getBookDetailsData,
  toggleIsFetching,
} from "../../../state/books-reducer";
import { getCharactersData } from "../../../state/characters-reducer";
import { NavLink } from "react-router-dom";
import AddToFavoritesComponent from "../../common/AddToFavorite/AddToffavoriteComponent";
import loaderGif from "./../../../assets/images/loaderF.gif";

const BooksDetails = (props) => {
  useEffect(() => {
    let bookId = props.match.params.id;
    props.toggleIsFetching(true);
    props.getBookDetailsData(bookId);
  }, []);
  const favData = { favType: "books", favVal: props.bookDetails };

  function dateFromISO8601(isostr) {
    let date = new Date(isostr);
    return (
      date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
    );
  }

  return (
    <div className="details_main_container">
      {props.isFetching ? (
        <img src={loaderGif} alt="loading..." height={50} width={50} />
      ) : (
        <>
          {favData.favVal.length != 0 && (
            <AddToFavoritesComponent {...favData} />
          )}

          <table>
            {props.bookDetails.name && (
              <tr>
                <td>Название:</td>
                <td>{props.bookDetails.name}</td>
              </tr>
            )}

            {props.bookDetails.authors && props.bookDetails.authors[0] != "" && (
              <tr>
                <td>Автор:</td>
                <td>
                  {props.bookDetails.authors.map((el) => (
                    <div>{el}</div>
                  ))}
                </td>
              </tr>
            )}

            {props.bookDetails.country && (
              <tr>
                <td>Страна:</td>
                <td>{props.bookDetails.country}</td>
              </tr>
            )}

            {props.bookDetails.mediaType && (
              <tr>
                <td>Тип переплета:</td>
                <td>{props.bookDetails.mediaType}</td>
              </tr>
            )}

            {props.bookDetails.publisher && (
              <tr>
                <td>Издатель:</td>
                <td>{props.bookDetails.publisher}</td>
              </tr>
            )}

            {props.bookDetails.numberOfPages && (
              <tr>
                <td>Количество страниц:</td>
                <td>{props.bookDetails.numberOfPages}</td>
              </tr>
            )}

            {props.bookDetails.released && (
              <tr>
                <td>Дата издания:</td>
                <td>{dateFromISO8601(props.bookDetails.released)}</td>
              </tr>
            )}

            {props.bookDetails.isbn && (
              <tr>
                <td>ISBN:</td>
                <td>{props.bookDetails.isbn}</td>
              </tr>
            )}

            {props.bookDetails.characters && (
              <tr>
                <td>Герои:</td>
                <td>
                  {props.bookDetails.characters.map((el) => (
                    <NavLink
                      to={`/characters/${
                        el.data.url.split("/")[
                          el.data.url.split("/").length - 1
                        ]
                      }`}
                    >
                      <div>{el.data.name}</div>
                    </NavLink>
                  ))}
                </td>
              </tr>
            )}

            {props.bookDetails.povCharacters &&
              props.bookDetails.povCharacters.length != 0 && (
                <tr>
                  <td>Главные герои:</td>
                  <td>
                    {props.bookDetails.povCharacters.map((el) => (
                      <NavLink
                        to={`/characters/${
                          el.data.url.split("/")[
                            el.data.url.split("/").length - 1
                          ]
                        }`}
                      >
                        <div>{el.data.name}</div>
                      </NavLink>
                    ))}
                  </td>
                </tr>
              )}
          </table>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    bookDetails: state.booksPage.bookDetails,
    characters: state.charactersPage.characters,
    isFetching: state.booksPage.isFetching,
  };
};

export default compose(
  connect(mapStateToProps, {
    getBookDetailsData,
    getCharactersData,
    toggleIsFetching,
  }),
  withRouter
)(BooksDetails);

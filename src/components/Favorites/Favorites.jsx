import { connect } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Favorites.scss";

const Favorites = (props) => {
  const [filterState, setFilterState] = useState("books");

  return (
    <div style={{ marginTop: 30 }} className="page_main_container">
      <table>
        <tr>
          <td>
            <div
              className={
                filterState === "books"
                  ? "favorites_active"
                  : "favorites_not_active"
              }
              onClick={() => setFilterState("books")}
            >
              Книги
            </div>
            <div
              className={
                filterState === "characters"
                  ? "favorites_active"
                  : "favorites_not_active"
              }
              onClick={() => setFilterState("characters")}
            >
              Герои
            </div>
            <div
              className={
                filterState === "houses"
                  ? "favorites_active"
                  : "favorites_not_active"
              }
              onClick={() => setFilterState("houses")}
            >
              Дома/Семьи
            </div>
          </td>
          {props.favorites[filterState].dataArr.length != 0 && (
            <td>
              {props.favorites[filterState].dataArr.map((el) => (
                <>
                  {filterState === "characters" && (
                    <NavLink
                      to={`/characters/${
                        el.url.split("/")[el.url.split("/").length - 1]
                      }`}
                    >
                      <div>{el.name === "" ? "Имя отсутствует" : el.name}</div>
                    </NavLink>
                  )}

                  {filterState === "books" && (
                    <NavLink
                      to={`/books/${
                        el.url.split("/")[el.url.split("/").length - 1]
                      }`}
                    >
                      <div>
                        {el.name === "" ? "Название отсутствует" : el.name}
                      </div>
                    </NavLink>
                  )}

                  {filterState === "houses" && (
                    <NavLink
                      to={`/family/${
                        el.url.split("/")[el.url.split("/").length - 1]
                      }`}
                    >
                      <div>
                        {el.name === "" ? "Название отсутствует" : el.name}
                      </div>
                    </NavLink>
                  )}
                </>
              ))}
            </td>
          )}
        </tr>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.appReducer.favorites,
  };
};

export default connect(mapStateToProps, {})(Favorites);

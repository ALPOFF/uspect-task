import { useEffect } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import {
  getCharacterDetailsData,
  toggleIsFetching,
} from "../../../state/characters-reducer";
import AddToFavoritesComponent from "./../../common/AddToFavorite/AddToffavoriteComponent";
import loaderGif from "./../../../assets/images/loaderF.gif";
import GifComponent from "../../common/GifComponent/GifComponent";

const CharactersDetails = (props) => {
  useEffect(() => {
    let characterId = props.match.params.id;
    props.toggleIsFetching(true);
    props.getCharacterDetailsData(characterId);
  }, []);
  const favData = { favType: "characters", favVal: props.characterDetails };

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
            {props.characterDetails.name && (
              <tr>
                <td>Имя:</td>
                <td>{props.characterDetails.name}</td>
              </tr>
            )}

            {props.characterDetails.aliases &&
              props.characterDetails.aliases[0] != "" && (
                <tr>
                  <td>Клички:</td>
                  <td>
                    {props.characterDetails.aliases.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.characterDetails.born && (
              <tr>
                <td>Дата рождения:</td>
                <td>{props.characterDetails.born}</td>
              </tr>
            )}

            {props.characterDetails.culture && (
              <tr>
                <td>Культура:</td>
                <td>{props.characterDetails.culture}</td>
              </tr>
            )}

            {props.characterDetails.died && (
              <tr>
                <td>Дата смерти:</td>
                <td>{props.characterDetails.died}</td>
              </tr>
            )}

            {props.characterDetails.gender && (
              <tr>
                <td>Пол:</td>
                <td>{props.characterDetails.gender}</td>
              </tr>
            )}

            {props.characterDetails.father && (
              <tr>
                <td>Отец:</td>
                <td>{props.characterDetails.father}</td>
              </tr>
            )}

            {props.characterDetails.mother && (
              <tr>
                <td>Мать:</td>
                <td>{props.characterDetails.mother}</td>
              </tr>
            )}

            {props.characterDetails.playedBy &&
              props.characterDetails.playedBy[0] != "" && (
                <tr>
                  <td>Исполнитель роли:</td>
                  <td>
                    {props.characterDetails.playedBy.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.characterDetails.spouse && (
              <tr>
                <td>Супруг:</td>
                <td>{props.characterDetails.spouse}</td>
              </tr>
            )}

            {props.characterDetails.titles &&
              props.characterDetails.titles[0] != "" && (
                <tr>
                  <td>Тайтлы:</td>
                  <td>
                    {props.characterDetails.titles.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.characterDetails.tvSeries &&
              props.characterDetails.tvSeries[0] != "" && (
                <tr>
                  <td>Сезоны с участием данного персонажа:</td>
                  <td>
                    {props.characterDetails.tvSeries.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.characterDetails.povBooks &&
              props.characterDetails.povBooks.length != 0 && (
                <tr>
                  <td>Книги:</td>
                  <td>
                    {props.characterDetails.povBooks.map((el) => (
                      <NavLink
                        to={`/books/${
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

            {props.characterDetails.allegiances &&
              props.characterDetails.allegiances.length != 0 && (
                <tr>
                  <td>Дом:</td>
                  <td>
                    {props.characterDetails.allegiances.map((el) => (
                      <NavLink
                        to={`/family/${
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
          {props.characterDetails.name && (
            <div style={{ width: "50%", paddingTop: 20 }}>
              <GifComponent name={props.characterDetails.name} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    characterDetails: state.charactersPage.characterDetails,
    isFetching: state.charactersPage.isFetching,
  };
};

export default compose(
  connect(mapStateToProps, { getCharacterDetailsData, toggleIsFetching }),
  withRouter
)(CharactersDetails);

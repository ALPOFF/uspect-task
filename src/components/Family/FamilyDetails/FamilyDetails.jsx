import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { useEffect } from "react";
import {
  getFamilyDetailsData,
  getFamiliesData,
  toggleIsFetching,
} from "../../../state/family-reducer";
import { NavLink } from "react-router-dom";
import AddToFavoritesComponent from "../../common/AddToFavorite/AddToffavoriteComponent";
import loaderGif from "./../../../assets/images/loaderF.gif";

const FamilyDetails = (props) => {
  useEffect(() => {
    let familyId = props.match.params.id;
    props.toggleIsFetching(true);
    props.getFamilyDetailsData(familyId);
  }, []);
  const favData = { favType: "houses", favVal: props.familyDetails };

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
            {props.familyDetails.region && (
              <tr>
                <td>Регион:</td>
                <td>{props.familyDetails.region}</td>
              </tr>
            )}

            {props.familyDetails.name && (
              <tr>
                <td>Название:</td>
                <td>{props.familyDetails.name}</td>
              </tr>
            )}

            {props.familyDetails.coatOfArms && (
              <tr>
                <td>Герб:</td>
                <td>{props.familyDetails.coatOfArms}</td>
              </tr>
            )}

            {props.familyDetails.ancestralWeapons &&
              props.familyDetails.ancestralWeapons[0] != "" && (
                <tr>
                  <td>Родовое оружие:</td>
                  <td>
                    {props.familyDetails.ancestralWeapons.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.familyDetails.cadetBranches &&
              props.familyDetails.cadetBranches.length != 0 && (
                <tr>
                  <td>Кадетские отделения:</td>
                  <td>
                    {props.familyDetails.cadetBranches.map((el) => (
                      <div>{el}</div>
                    ))}
                  </td>
                </tr>
              )}

            {props.familyDetails.currentLord && (
              <tr>
                <td>Правитель:</td>
                <td>
                  {props.familyDetails.currentLord.map((el) => (
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

            {props.familyDetails.diedOut && (
              <tr>
                <td>Вымерли:</td>
                <td>{props.familyDetails.diedOut}</td>
              </tr>
            )}

            {props.familyDetails.founded && (
              <tr>
                <td>Дата основания:</td>
                <td>{props.familyDetails.founded}</td>
              </tr>
            )}

            {props.familyDetails.founder && (
              <tr>
                <td>Основатель:</td>
                <td>{props.familyDetails.founder}</td>
              </tr>
            )}

            {props.familyDetails.heir && (
              <tr>
                <td>Наследник:</td>
                <td>
                  {props.familyDetails.heir.map((el) => (
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

            {props.familyDetails.overlord &&
              props.familyDetails.overlord.length != 0 && (
                <tr>
                  <td>Повелитель:</td>
                  <td>
                    {props.familyDetails.overlord.map((el) => (
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

            {props.familyDetails.seats && props.familyDetails.seats[0] != "" && (
              <tr>
                <td>Место:</td>
                <td>
                  {props.familyDetails.seats.map((el) => (
                    <div>{el}</div>
                  ))}
                </td>
              </tr>
            )}

            {props.familyDetails.swornMembers &&
              props.familyDetails.swornMembers.length != 0 && (
                <tr>
                  <td>Входят в состав:</td>
                  <td>
                    {props.familyDetails.swornMembers.map((el) => (
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

            {props.familyDetails.titles && props.familyDetails.titles[0] != "" && (
              <tr>
                <td>Тайтлы:</td>
                <td>
                  {props.familyDetails.titles.map((el) => (
                    <div>{el}</div>
                  ))}
                </td>
              </tr>
            )}

            {props.familyDetails.words && (
              <tr>
                <td>Лозунг:</td>
                <td>{props.familyDetails.words}</td>
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
    familyDetails: state.familyPage.familyDetails,
    characters: state.charactersPage.characters,
    isFetching: state.familyPage.isFetching,
  };
};

export default compose(
  connect(mapStateToProps, {
    getFamilyDetailsData,
    getFamiliesData,
    toggleIsFetching,
  }),
  withRouter
)(FamilyDetails);

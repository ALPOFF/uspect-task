import favIconHeart from "./../../../assets/images/heart.png";
import favIconHeartActive from "./../../../assets/images/heart_active.png";
import "./AddToFavoriteComponent.scss";
import { connect } from "react-redux";
import { addNewFavorite } from "../../../state/app-reducer";
import { useState, useEffect } from "react";

const AddToFavoritesComponent = (props) => {
  const [btnState, setBtnState] = useState(true);

  const checkForExistance = (favData) => {
    for (let key in props.favorites) {
      if (key == favData.favType) {
        if (
          props.favorites[key].dataArr.some((el) => {
            return el.url === favData.favVal.url;
          })
        ) {
          return false; //уже есть
        } else {
          return true; //отсутствует
        }
      }
    }
  };

  useEffect(() => {
    if (!checkForExistance({ favType: props.favType, favVal: props.favVal })) {
      setBtnState(false);
    }
  }, []);

  const addToFav = (favData) => {
    if (checkForExistance(props)) {
      props.addNewFavorite(favData);
      setBtnState(false);
    }
  };

  return (
    <>
      <div
        className="favoriteButton"
        onClick={() =>
          addToFav({ favType: props.favType, favVal: props.favVal })
        }
      >
        <span>В избранное</span>
        <img
          src={btnState ? favIconHeart : favIconHeartActive}
          alt="fav_icon"
          height={20}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    favorites: state.appReducer.favorites,
  };
};

export default connect(mapStateToProps, { addNewFavorite })(
  AddToFavoritesComponent
);

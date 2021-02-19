import { NavLink } from "react-router-dom";

const Character = ({ characterData }) => {
  let characterDataUrlArr = characterData.url.split("/");
  return (
    <NavLink
      to={`/characters/${characterDataUrlArr[characterDataUrlArr.length - 1]}`}
    >
      <div className="preview_container">
        <div>
          {characterData.name != "" ? (
            <h4>{characterData.name}</h4>
          ) : (
            <h4>Отсутствует</h4>
          )}
        </div>
        <div>Пол: {characterData.gender}</div>
        <div>Кличка: {characterData.aliases}</div>
      </div>
    </NavLink>
  );
};

export default Character;

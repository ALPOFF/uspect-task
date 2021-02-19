import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getCharactersData,
  getFilteredCharactersData,
  toggleIsFetching,
} from "../../state/characters-reducer";
import CharactersPreview from "./CharactersPreview/CharactersPreview";
import "react-datepicker/dist/react-datepicker.css";
import SelectComponent from "../common/Select/SelectComponent";
import InputComponent from "../common/Input/InputComponent";
import loaderGif from "./../../assets/images/loaderF.gif";
import PaginatorComponent from "../common/Paginator/PaginatorComponent";

const Characters = (props) => {
  useEffect(() => {
    props.toggleIsFetching(true);
  }, []);

  const [stateInput, setSateInput] = useState("");
  const [stateSelect, setStateSelect] = useState("");
  const charactersMaxPage = 238;

  const handleChangeSelectState = (e) => {
    setStateSelect(e.target.value);
  };

  const handleChangeInputState = (e) => {
    setSateInput(e.target.value);
  };

  const sendData = (e) => {
    props.getFilteredCharactersData(stateInput, stateSelect);
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
            <SelectComponent
              value={stateSelect}
              onChangeValue={handleChangeSelectState}
            />
            <button type="submit" onClick={() => sendData()}>
              Найти
            </button>
          </div>
          <div className="previews_container">
            {props.characters.length !== 0 ? (
              props.characters.map((el, index) => (
                <>
                  <CharactersPreview key={index} characterData={el} />
                </>
              ))
            ) : (
              <h3>Ничего не найдено</h3>
            )}
          </div>
          <PaginatorComponent
            dataArr={props.characters}
            fetc={props.getCharactersData}
            pageSize={9}
            maxPage={charactersMaxPage}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    characters: state.charactersPage.characters,
    filterResults: state.charactersPage.filterResults,
    isFetching: state.charactersPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  toggleIsFetching,
  getCharactersData,
  getFilteredCharactersData,
})(Characters);

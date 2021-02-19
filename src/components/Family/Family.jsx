import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getFamiliesData,
  getFilteredFamiliesData,
  toggleIsFetching,
} from "../../state/family-reducer";
import FamilyPreview from "./FamilyPreview/FamilyPreview";
import "react-datepicker/dist/react-datepicker.css";
import InputComponent from "../common/Input/InputComponent";
import loaderGif from "./../../assets/images/loaderF.gif";
import PaginatorComponent from "../common/Paginator/PaginatorComponent";

const Family = (props) => {
  const [stateInput, setSateInput] = useState("");
  const housesMaxPage = 50;

  useEffect(() => {
    props.toggleIsFetching(true);
  }, []);

  const handleChangeInputState = (e) => {
    setSateInput(e.target.value);
  };

  const sendData = (e) => {
    props.getFilteredFamiliesData(stateInput);
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
            <button type="submit" onClick={() => sendData()}>
              Найти
            </button>
          </div>
          <div className="previews_container">
            {props.families.length !== 0 ? (
              props.families.map((el, index) => (
                <>
                  <FamilyPreview key={index} familyData={el} />
                </>
              ))
            ) : (
              <h3>Ничего не найдено</h3>
            )}
          </div>
          <PaginatorComponent
            dataArr={props.families}
            fetc={props.getFamiliesData}
            pageSize={9}
            maxPage={housesMaxPage}
          />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    families: state.familyPage.families,
    filterResults: state.familyPage.filterResults,
    isFetching: state.familyPage.isFetching,
  };
};

export default connect(mapStateToProps, {
  getFamiliesData,
  getFilteredFamiliesData,
  toggleIsFetching,
})(Family);

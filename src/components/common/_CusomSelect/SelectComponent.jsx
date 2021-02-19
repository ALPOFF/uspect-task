import React, { useState } from "react";
import { ReactComponent as DownArrow } from "./../../../../assets/images/downArrow.svg";
import "./SelectComponent.scss";

let dropDownValuesList = [{ sex: "М" }, { sex: "Ж" }];

const SelectComponent = ({ getCurrentLang }) => {
  const [openedStatus, setOpened] = useState(false);
  const [choosedLang, setChoosedLang] = useState({ sex: "Пол" });

  return (
    <div className="dd_wrapper">
      <div className="dd_header" onClick={() => setOpened(!openedStatus)}>
        {choosedLang.sex}
        <DownArrow />
      </div>
      <div className="dd_list">
        {openedStatus &&
          dropDownValuesList.map((el) => (
            <div
              className="dd_list_element"
              onClick={() => {
                setChoosedLang(el);
                setOpened(false);
                getCurrentLang(el);
              }}
            >
              {el.sex}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectComponent;

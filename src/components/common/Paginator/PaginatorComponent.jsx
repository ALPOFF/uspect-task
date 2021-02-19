import React, { useState, useEffect } from "react";
import "./PaginatorComponent.scss";
import leftArrow from "./../../../assets/images/left-arrow.png";
import rightArrow from "./../../../assets/images/right-arrow.png";

const PaginatorComponent = ({ dataArr, fetc, pageSize, maxPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [prevButtonState, setPrevButtonState] = useState(false);
  const [nextButtonState, setNextButtonState] = useState(true);

  useEffect(() => {
    fetc(currentPage, pageSize);
  }, []);

  const goToNext = () => {
    fetc(currentPage + 1, pageSize);
    if (currentPage + 1 === maxPage) {
      setPrevButtonState(true);
      setNextButtonState(false);
    } else {
      setNextButtonState(true);
      setPrevButtonState(true);
    }
    setCurrentPage(currentPage + 1);
  };

  const goToPrev = () => {
    fetc(currentPage - 1, pageSize);
    if (currentPage - 1 === 1) {
      setPrevButtonState(false);
      setNextButtonState(true);
    } else {
      setNextButtonState(true);
    }
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      {dataArr.length !== 0 && (
        <div className="paginator_container">
          {prevButtonState && (
            <span
              className="paginator_container_btn"
              onClick={() => goToPrev()}
            >
              <img src={leftArrow} alt="leftArrow" height={20} />
            </span>
          )}
          {nextButtonState && (
            <span
              className="paginator_container_btn"
              onClick={() => goToNext()}
            >
              <img src={rightArrow} alt="rightArrow" height={20} />
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default PaginatorComponent;

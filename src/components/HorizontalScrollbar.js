import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import List from "./List";
import RightArrowIcon from "../asset/icons/right.png";
import LeftArrowIcon from "../asset/icons/left.png";

const LeftArrow = () => {
  const { isFirstItemVisible, scrollPrev } = useContext(VisibilityContext);

  return (
    <div className="left-arrow" disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
      <img src={LeftArrowIcon} alt="left-arrow" />
    </div>
  );
};

const RightArrow = () => {
  const { isLastItemVisible, scrollNext } = useContext(VisibilityContext);

  return (
    <div className="right-arrow" disabled={isLastItemVisible} onClick={() => scrollNext()}>
      <img src={RightArrowIcon} alt="right-arrow" />
    </div>
  );
};

const HorizontalScrollbar = ({ data, setList, list }) => {
  return (
    <div className="scroll-menu-container">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data.map((item) => (
          <div 
            key={item.id || item}
            itemId={item.id || item}
            title={item.name || item}
            className="scroll-item"
          >
            <List item={item} list={list} setList={setList} />
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default HorizontalScrollbar;


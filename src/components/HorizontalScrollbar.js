import React, { useContext } from "react";
import { Box, Typography } from "@mui/material";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import List from "./List";
import RightArrowIcon from "../asset/icons/right.png";
import LeftArrowIcon from "../asset/icons/left.png";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollPrev()} className="left-arrow">
      <img src={LeftArrowIcon} alt="left-arrow" />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <Typography onClick={() => scrollNext()} className="right-arrow">
      <img src={RightArrowIcon} alt="right-arrow" />
    </Typography>
  );
};

const HorizontalScrollbar = ({ data, setList, list }) => {
  return (
    <Box className="scroll-menu-container">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data.map((item) => (
          <Box
            key={item.id || item.name}
            itemId={item.id || item.name}
            title={item.name || item}
            m="0 20px"
          >
            <List item={item} list={list} setList={setList} />
          </Box>
        ))}
      </ScrollMenu>
    </Box>
  );
};

export default HorizontalScrollbar;

// import React, { useContext } from "react";
// import { Box, Typography } from "@mui/material";
// import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
// import List from "./List";
// import RightArrowIcon from "../asset/icons/right.png";
// import LeftArrowIcon from "../asset/icons/left.png";

// const LeftArrow = () => {
//   const { scrollPrev } = useContext(VisibilityContext);

//   return (
//     <Typography onClick={() => scrollPrev()} className="right-arrow">
//       <img src={LeftArrowIcon} alt="right-arrow" />
//     </Typography>
//   );
// };

// const RightArrow = () => {
//   const { scrollNext } = useContext(VisibilityContext);

//   return (
//     <Typography onClick={() => scrollNext()} className="left-arrow">
//       <img src={RightArrowIcon} alt="right-arrow" />
//     </Typography>
//   );
// };

// const HorizontalScrollbar = ({ data, setList, list }) => {
//   return (
//     <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
//       {data.map((item) => (
//         <Box
//           key={item.id || item.name}
//           itemId={item.id || item.name}
//           title={item.name || item}
//           m="0 40px"
//         >
//           <List item={item} list={list} setList={setList} />
//         </Box>
//       ))}
//     </ScrollMenu>
//   );
// };

// export default HorizontalScrollbar;

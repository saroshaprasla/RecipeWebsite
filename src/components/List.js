import React from "react";
import { Stack, Typography } from "@mui/material";
import Icon from "../asset/icons/pot.png";

const List = ({ item, setList, list }) => {
  return (
    <Stack
      type="button"
      alignItems="center"
      justifyContent="center"
      className={`list-card ${list === item ? 'active' : ''}`}
      sx={{
        borderTop: list === item ? "4px solid #ff2625" : "",
        backgroundColor: "#fff",
        borderBottomLeftRadius: "20px",
        width: "270px",
        height: "280px",
        cursor: "pointer",
        gap: "47px",
        transition: "all 0.3s ease",
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }
      }}
      onClick={() => {
        setList(item);
        window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
      }}
    >
      <img src={Icon} alt="pot" style={{ width: "40px", height: "40px" }} />
      <Typography
        fontSize="24px"
        fontWeight="bold"
        fontFamily="Alegreya"
        color="#3A1212"
        textTransform="capitalize"
      >
        {item}
      </Typography>
    </Stack>
  );
};

export default List;


// import React from "react";
// import { Stack, Typography } from "@mui/material";
// import Icon from "../asset/icons/pot.png";

// const List = ({ item, setList, list }) => {
//   return (
//     <Stack
//       type="button"
//       alignItems="center"
//       justifyContent="center"
//       className="list-card"
//       sx={{
//         borderTop: list === item ? "4px solid #ff2625" : "",
//         backgroundColor: "#fff",
//         borderBottomLeftRadius: "20px",
//         width: "270px",
//         height: "280px",
//         cursor: "pointer",
//         gap: "47px",
//       }}
//       onClick={() => {
//         setList(item);
//         window.scrollTo({ top: 1800, left: 100, behavior: "smooth" });
//       }}
//     >
//       <img src={Icon} alt="pot" style={{ width: "40px", height: "40px" }} />
//       <Typography
//         fontSize="24px"
//         fontWeight="bold"
//         fontFamily="Alegreya"
//         color="#3A1212"
//         textTransform="capitalize"
//       >
//         {" "}
//         {item}
//       </Typography>
//     </Stack>
//   );
// };

// export default List;

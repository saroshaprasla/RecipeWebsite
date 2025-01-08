import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";

import HeroBannerImage from "../asset/images/pic.jpg";

const HeroBanner = () => {
  return (
    <Box
      sx={{
        mt: { lg: "212px", xs: "70px" },
        ml: { sm: "50px" },
      }}
      position="relative"
      p="20px"
    >
      <Typography color="#B22222" fontWeight="600" fontSize="26px">
        Spice & Spoon
      </Typography>
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "40px" } }}
      >
        Wholesome Bites <br /> For Your Happy Nights
      </Typography>
      <Typography fontSize="22px" lineHeight="35px" mb={4}>
        Dive into these tasty recipes
      </Typography>
      <Button
        variant="contained"
        color="success"
        href="#recipes"
        sx={{ backgroundColor: "#ff2625, padding: 10px" }}
      >
        Explore Recipes
      </Button>
      <Typography
        fontWeight={600}
        color="#808000"
        sx={{
          opacity: 0.1,
          display: { lg: "block", xs: "none" },
        }}
        fontSize="200px"
      >
        Recipe
      </Typography>
      <img src={HeroBannerImage} alt="banner" className="hero-banner-img" />
    </Box>
  );
};

export default HeroBanner;

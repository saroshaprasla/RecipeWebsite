import React from "react"; 
import { Link } from "react-router-dom"; 
import { Button, Stack, Typography } from "@mui/material";  

const RecipeCard = ({ recipe }) => {   
  // Get the correct image URL from the Tasty API response
  const imageUrl = recipe.thumbnail_url || recipe.thumbnail || recipe.beauty_url || '';

  return (     
    <Link className="recipe-card" to={`/recipe/${recipe.id}`}>       
      <img 
        src={imageUrl} 
        alt={recipe.name || recipe.title || 'Recipe image'} 
        loading="lazy"
        onError={(e) => {
          e.target.onerror = null;
          console.log('Image failed to load:', imageUrl);
        }}
      />
      <Typography 
        ml="21px" 
        color="#000" 
        fontWeight="bold" 
        mt="11px" 
        pb="10px" 
        textTransform="capitalize"
      >
        {recipe.name || recipe.title}
      </Typography>
    </Link>   
  ); 
};  

export default RecipeCard;




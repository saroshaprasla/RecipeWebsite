import React, { useContext } from 'react';
import { Box } from '@mui/material';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { Link } from 'react-router-dom';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import List from './List';  // Make sure this path matches your project structure

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);
  return (
    <button onClick={() => scrollPrev()} className="left-arrow">
      <KeyboardArrowLeftIcon style={{ fontSize: 40, color: '#FF2625' }} />
    </button>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);
  return (
    <button onClick={() => scrollNext()} className="right-arrow">
      <KeyboardArrowRightIcon style={{ fontSize: 40, color: '#FF2625' }} />
    </button>
  );
};

const RecipeCard = ({ recipe }) => (
  <Link to={`/recipe/${recipe.id}`} className="recipe-card">
    <img 
      src={recipe.thumbnail_url} 
      alt={recipe.name} 
      loading="lazy"
    />
    <Box p="10px">
      <p style={{ 
        fontWeight: 'bold', 
        fontSize: '16px',
        marginBottom: '10px'
      }}>
        {recipe.name}
      </p>
      <p style={{ color: '#666', fontSize: '14px' }}>
        {recipe.cook_time_minutes || 0} mins • {recipe.num_servings || 4} servings
      </p>
    </Box>
  </Link>
);

const HorizontalScrollbar = ({ data, setList, list, isLists }) => {
  if (!data?.length) return null;

  return (
    <div className="scroll-menu-container">
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {data.map((item) => (
          <Box 
            key={isLists ? item : item.id}
            itemId={isLists ? item : item.id}
            m="0 20px"
          >
            {isLists ? (
              <List item={item} list={list} setList={setList} />
            ) : (
              <RecipeCard recipe={item} />
            )}
          </Box>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default HorizontalScrollbar;







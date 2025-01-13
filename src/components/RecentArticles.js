import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RecentArticles = ({ articles }) => {
  if (!articles?.length) return null;

  return (
    <Box sx={{ marginTop: { lg: '50px', xs: '20px' } }}>
      <Typography 
        variant="h4" 
        mb={3}
        sx={{ 
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2d2d2d'
        }}
      >
        Recent Articles
      </Typography>
      
      <Stack 
        direction="row" 
        sx={{ 
          gap: { lg: '40px', xs: '20px' },
          overflowX: 'auto',
          pb: 2
        }}
      >
        {articles?.slice(0, 3).map((article, index) => (
          <Link 
            key={index}
            to={article.url || '#'} 
            style={{ textDecoration: 'none', minWidth: '300px' }}
          >
            <Box>
              <img 
                src={article.thumbnail_url || article.image_url} 
                alt={article.title}
                style={{ 
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px'
                }} 
              />
              <Typography 
                mt={2}
                color="#2d2d2d"
                fontWeight="600"
                fontSize="16px"
              >
                {article.title}
              </Typography>
            </Box>
          </Link>
        ))}
      </Stack>
    </Box>
  );
};

export default RecentArticles;
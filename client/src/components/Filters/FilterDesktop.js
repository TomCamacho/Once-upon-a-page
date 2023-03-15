import React, { useState } from 'react';
import {
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Select,
  TextField,
} from '@mui/material';
import { FilterList } from '@mui/icons-material';

const categories = [
  { name: 'Romance', id: 'romance' },
  { name: 'Mystery/Thriller', id: 'mystery' },
  { name: 'Science Fiction/Fantasy', id: 'sci-fi' },
  { name: 'Horror', id: 'horror' },
  { name: 'Historical Fiction', id: 'historical' },
  { name: 'Young Adult', id: 'young-adult' },
  { name: 'LGBT', id: 'lgbt' },
  { name: "Children's", id: 'children' },
  { name: 'Biography/Autobiography', id: 'biography' },
  { name: 'Self-help', id: 'self-help' },
];

const FilterDesktop = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [year, setYear] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('');

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleCategoryChange = (event) => {
    const { value } = event.target;

    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(value)) {
        return prevSelected.filter((category) => category !== value);
      } else {
        return [...prevSelected, value];
      }
    });
  };

  const handleRatingChange = (event, value) => {
    setRating(value);
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <IconButton
        onClick={toggleDrawer}
        sx={{
          position: 'fixed',
          bottom: '50px',
          left: '50px',
          bgcolor: '#1976d2',
        }}
        >
        <FilterList sx={{ color: '#fff' }} />
        </IconButton>
        <Drawer anchor="left" open={isOpen} onClose={toggleDrawer}>
    <FormControl component="fieldset">
      <FormGroup>
        <ListItem button onClick={toggleDrawer}>
          <ListItemIcon>
            <FilterList />
          </ListItemIcon>
          <ListItemText primary="Filter" />
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText primary="Categories" />
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category.id} sx={{ paddingLeft: 0 }}>
          <FormControlLabel
            control={
              <Checkbox
                value={category.id}
                onChange={handleCategoryChange}
                checked={selectedCategories.includes(category.id)}
                sx={{ fontSize: '0.4rem', p: 0 }}
              />
            }
            label={category.name}
            sx={{ marginLeft: '10px', fontSize: '0.4rem' }}
          />
        </ListItem>
        ))}
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText primary="Rating" />
        </ListItem>
        <ListItem>
          <Rating
            name="rating"
            value={rating}
            onChange={handleRatingChange}
          />
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText primary="Year" />
        </ListItem>
        <ListItem>
          <TextField
            label="Year"
            value={year}
            onChange={handleYearChange}
            size="small"
          />
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText primary="Author" />
        </ListItem>
        <ListItem>
          <TextField
            label="Author"
            value={author}
            onChange={handleAuthorChange}
            size="small"
          />
        </ListItem>
        <ListItem sx={{ paddingLeft: 0 }}>
          <ListItemText primary="Language" />
        </ListItem>
        <ListItem>
          <Select
            label="Language"
            value={language}
            onChange={handleLanguageChange}
            sx={{ fontSize: '0.8rem', minWidth: '120px'}}
            size = "small"
          >
            <option value="spanish">Spanish</option>
            <option value="english">English</option>
          </Select>
        </ListItem>
      </FormGroup>
    </FormControl>
  </Drawer>
</>


);
};

export default FilterDesktop;


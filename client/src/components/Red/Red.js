//Importacion de React
import axios from "axios";
import React, { useEffect } from "react";
import books from "../../FakeData/FakeData.js";
//impotacion de componentes--------------------
import Card from "../../commons/Card/Card.js";
import { useNavigate } from "react-router-dom";

//Estilos--------------------------------------

import { Box, Container, Grid, Link, Typography } from "@mui/material";

//Funcionalidades------------------------------

const Red = () => {
  const navigate = useNavigate();
  // const [books, setBooks] = React.useState([]);
  useEffect(() => {
    // axios
    //   .get(
    //     "https://localhost:3001/books"
    //   )
    //   .then((res) => {
    //     console.log(res.data);
    //     return setBooks(res.data);
    //   });
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3}>
          {books?.map((book, i) => {
            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                {/* <Typography onClick={() => navigate(`${book.id}`)}>*/}
                  <Card data={book} />
                  {/*</Typography> */}
                
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default Red;

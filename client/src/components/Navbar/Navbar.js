import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Box,
  Link,
} from "@mui/material";

import { useNavigate } from "react-router";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const userName = localStorage.getItem("userName");
  const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("userName");
    navigate("/");
  };

  useEffect(() => {
    if (localStorage.getItem("id"))
      axios
        .get(`http://localhost:3001/api/users/id/${id}`)
        .then((user) => {
          setUser(user);
        })
        .catch((err) => console.error(err));
  }, []);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1976d3" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton>
        <Typography
          onClick={() => navigate("/")}
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", flexGrow: 1, cursor: "pointer" }}
        >
          Once Upon A Page
        </Typography>
        {token ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "0.5rem",
              }}
            >
              <Button color="inherit" onClick={handleLogOut}>
                Log Out
              </Button>
              <Avatar sx={{ bgcolor: "#5a91c7" }}>
                {userName
                  .split(" ")
                  .map((word) => word.charAt(0))
                  .join("")}
              </Avatar>
              <Link
                href={`userData/${id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                User: {userName}
              </Link>
            </Box>
          </div>
        ) : (
          <div>
            <Button onClick={() => navigate("/login")} color="inherit">
              Log In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

import React from "react";
import { message } from "antd";
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
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/user";

import { useNavigate } from "react-router";

const Navbar = () => {
  //const token = localStorage.getItem("profile");
  //const id = localStorage.getItem("id");
  //const userName = localStorage.getItem("userName");

  const dispatch = useDispatch();

  const reduxUser = useSelector((state) => state.user);

  //const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut(reduxUser));
    localStorage.removeItem("profile");
    message.success(
      `Successful logout: See you around ${reduxUser.displayName}!`
    );
    //localStorage.removeItem("id");
    //localStorage.removeItem("userName");
    navigate("/");
  };

  // useEffect(() => {
  //   if (localStorage.getItem("id"))
  //     axios
  //       .get(`http://localhost:3001/api/users/id/${id}`)
  //       .then((user) => {
  //         setUser(user);
  //       })
  //       .catch((err) => console.error(err));
  // }, []);

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
        {reduxUser ? (
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
              <Button color="error" variant="contained" onClick={handleLogOut}>
                Log Out
              </Button>
              <Link
                href={`userData/${reduxUser.id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Avatar sx={{ bgcolor: "#5a91c7" }}>
                  {reduxUser.displayName
                    .split(" ")
                    .map((word) => word.charAt(0))
                    .join("")}
                </Avatar>
              </Link>
            </Box>
          </div>
        ) : (
          <div>
            <Button
              color="success"
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

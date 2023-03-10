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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  //const token = localStorage.getItem("profile");
  //const id = localStorage.getItem("id");
  //const userName = localStorage.getItem("userName");

  const dispatch = useDispatch();

  const localStorageUser = JSON.parse(localStorage.getItem("profile"));
  const reduxStateUser = useSelector((state) => state.user);

  let user;

  localStorageUser !== null
    ? (user = localStorageUser)
    : (user = reduxStateUser);

  //const [user, setUser] = useState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut(user));
    localStorage.removeItem("profile");
    message.success(`Successful logout: See you around ${user.fullName}!`);
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
    <AppBar position="static" sx={{ backgroundColor: "#014751" }}>
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
        {user ? (
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
              <Button
                color="error"
                sx={{ backgroundColor: "#0F2830" }}
                variant="contained"
                onClick={handleLogOut}
              >
                Log Out
              </Button>
              <Link
                href={`userData/${user.fullName}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Avatar sx={{ bgcolor: "#5a91c7" }}>
                  {user.fullName
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
              sx={{ backgroundColor: "#0F2830" }}
              variant="contained"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              sx={{ backgroundColor: "#D2C4FB" }}
              variant="contained"
              startIcon={<ShoppingCartIcon />}
              onClick={() => navigate("/cart")}
            >
              Cart
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

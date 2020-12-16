import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import * as actionTypes from "../store/actions/actionTypes";

import Logo from "../assets/images/Logo.svg";
import SmallText from "../components/SmallText";
import Form from "../components/Form";
import ProfileImage from "../assets/images/Profile.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 64,
    maxHeight: 64,
    backgroundColor: "#fff",
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolBar: {
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.palette.common.white,
  },
  logo: {
    height: 35,
  },
  profile: {
    display: "flex",
    cursor: "pointer",
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 20,
    height: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  profileName: {
    fontSize: 10,
    color: "#000",
    fontWeight: "bold",
    textDecoration: "none",
  },
  drawer: {
    width: 250,
  },
  logoDrawerContainer: {
    height: 70,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function Login(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const store = useSelector((state) => state);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="xl">
        <Toolbar className={classes.toolBar}>
          <SmallText
            to="/"
            text={<img src={Logo} className={classes.logo} alt="Logo" />}
          />
          {store.auth ? (
            <div className={classes.profile}>
              <div onClick={handleClick}>
                <img
                  src={ProfileImage}
                  alt="profileImage"
                  className={classes.profileImage}
                />
                <SmallText bold text={store.user.name} />
              </div>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem component={Link} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem component={Link} to="/account">
                  My account
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch({ type: actionTypes.LOGOUT })}
                >
                  Logout
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Form.Row>
                <SmallText to="/register" text="Register" />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <SmallText to="/login" text="Login" />
              </Form.Row>
            </div>
          )}
        </Toolbar>
      </Container>
    </div>
  );
}

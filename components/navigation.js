import React, { useState } from "react";
import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/useAuth";
import { DEFAULT_PROFILE_IMAGE } from "../config/constants";
import Button from "./button";

import {
  AppBar,
  Button as MaterialUIButton,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  link: {
    color: "#33691e",
    textDecoration: "none",
  },
  image: {
    borderRadius: "50%",
  },
  menuBar: {
    backgroundColor: "#f1f8e9",
    color: "#33691e",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  menuItem: {
    color: "#33691e",
    textDecoration: "none",
  },
  title: {
    flexGrow: 1,
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: "#fafafa",
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: "theme.palette.common.white",
      },
    },
  },
}))(MenuItem);

export default function Navigation() {
  const auth = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container className={classes.root} maxWidth={"md"}>
      <AppBar position="static" className={classes.menuBar}>
        <Toolbar data-cv-navigation-bar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a data-cy-navigation-homebutton className={classes.link}>
                Home
              </a>
            </Link>
          </Typography>
          {auth.user && <div>{auth.user.name}</div>}
          <MaterialUIButton
            aria-controls="customized-menu"
            data-cy-navigation-logo
            onClick={handleClick}
          >
            {auth.user && (
              <Image
                data-cy-profile-image
                src={auth.user?.profileImage || DEFAULT_PROFILE_IMAGE}
                alt="Profile picture"
                className={classes.image}
                width={50}
                height={50}
              />
            )}
          </MaterialUIButton>
          {auth.user && (
            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem>
                <Link href="/profile">
                  <a data-cy-navigation-profile className={classes.menuItem}>
                    Profile
                  </a>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem>
                <Link href="/settings">
                  <a data-cy-navigation-settings className={classes.menuItem}>
                    Settings
                  </a>
                </Link>
              </StyledMenuItem>
              <StyledMenuItem>
                <div>
                  <a
                    aria-controls="customized-menu"
                    data-cy-navigation-signout
                    className={classes.menuItem}
                    onClick={() => auth.signOut()}
                  >
                    Sign out
                  </a>
                </div>
              </StyledMenuItem>
            </StyledMenu>
          )}
          {!auth.user && (
            <>
              <Button>
                <a
                  aria-controls="customized-menu"
                  data-cy-navigation-login
                  className={classes.menuItem}
                  onClick={() => router.push("/login")}
                >
                  Log in
                </a>
              </Button>
              <Button>
                <a
                  aria-controls="customized-menu"
                  data-cy-navigation-signin
                  className={classes.menuItem}
                  onClick={() => router.push("/signup")}
                >
                  Sign up
                </a>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

import React, { useState } from "react";

import Link from "next/link";

import { useAuth } from "../hooks/useAuth";

import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import { withStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  button: {
    color: "#33691e",
  },
  link: {
    color: "#33691e",
    textDecoration: "none",
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
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  const auth = useAuth();

  return (
    <Container className={classes.root} maxWidth={"md"}>
      <AppBar position="static" className={classes.menuBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a className={classes.link} href="#">
                Home
              </a>
            </Link>
          </Typography>
          <Button aria-controls="customized-menu" onClick={handleClick}>
            <PersonIcon />
          </Button>
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem>
              <Link href="/profile">
                <a className={classes.menuItem}>Profile</a>
              </Link>
            </StyledMenuItem>
            <StyledMenuItem>
              <Link href="/settings">
                <a className={classes.menuItem}>Settings</a>
              </Link>
            </StyledMenuItem>
          </StyledMenu>
          {auth.user ? (
            <Button
              aria-controls="customized-menu"
              className={classes.button}
              onClick={() => auth.signOut()}
              variant="outlined"
            >
              Sign Out
            </Button>
          ) : (
            <Button
              aria-controls="customized-menu"
              className={classes.button}
              onClick={() => auth.signIn()}
              variant="outlined"
            >
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

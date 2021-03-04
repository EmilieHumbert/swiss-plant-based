import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/useAuth";
import Button from "../components/button";

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
import PersonIcon from "@material-ui/icons/Person";
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
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/">
              <a className={classes.link} href="#">
                Home
              </a>
            </Link>
          </Typography>
          <MaterialUIButton
            aria-controls="customized-menu"
            onClick={handleClick}
          >
            <PersonIcon />
          </MaterialUIButton>
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
              onClick={() => auth.signOut()}
              title="Sign Out"
              variant="outlined"
            />
          ) : (
            <Button
              aria-controls="customized-menu"
              onClick={() => router.push("/signup")}
              title="Sign In"
              variant="outlined"
            />
          )}
        </Toolbar>
      </AppBar>
    </Container>
  );
}

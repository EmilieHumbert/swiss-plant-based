import React from "react";

import Link from "next/link";

import { useAuth } from "../hooks/useAuth";

import {
  AppBar,
  Button,
  Container,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";

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
  title: {
    flexGrow: 1,
  },
}));

export default function Navigation() {
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
          <Button>
            <Link href="/settings">
              <PersonIcon />
            </Link>
          </Button>
          <Button
            className={classes.button}
            onClick={() => auth.signOut()}
            variant="outlined"
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
    </Container>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Pricing() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Header />
    </div>
  );
}

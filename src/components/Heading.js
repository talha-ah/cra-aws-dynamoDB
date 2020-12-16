import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

export default function Login(props) {
  const useStyles = makeStyles((theme) => ({
    text: {
      fontSize: 26,
      marginBottom: 30,
      fontWeight: "bold",
      color: props.color || theme.palette.common.white,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <Typography className={classes.text}>{props.text}</Typography>
    </div>
  );
}

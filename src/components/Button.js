import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export default function ButtonComponent(props) {
  const useStyles = makeStyles((theme) => ({
    button: {
      outline: 0,
      height: 44,
    },
  }));
  const classes = useStyles();

  return (
    <Button
      type={props.type}
      style={props.style}
      variant={props.variant || "contained"}
      onClick={props.onClick}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
      color={props.color || "primary"}
      className={classes.button + " " + props.className}
    >
      {props.children}
      {props.text}
    </Button>
  );
}

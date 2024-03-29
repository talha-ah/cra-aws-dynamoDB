import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";

import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";

import GLOBALS from "../../globals";

import Form from "../../components/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Loader from "../../components/Loader";
import Heading from "../../components/Heading";
import SmallText from "../../components/SmallText";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    minWidth: "100vw",
    minHeight: "100vh",
    alignItems: "center",
    flexDirection: "column",
    backgroundSize: "cover",
    justifyContent: "center",
    backgroundPosition: "center",
    backgroundColor: theme.palette.primary.main,
  },
}));

export default function Login(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "betarid65@gmail.com",
    password: "password12",
  });
  const [errors, setErrors] = React.useState({
    email: false,
    password: false,
  });

  const onSubmit = async () => {
    try {
      if (values.email === "") {
        setErrors({ ...errors, email: true });
      } else if (values.password === "") {
        setErrors({ ...errors, password: true });
      } else {
        setLoading(true);
        const { history, location } = props;
        const { from } = location.state || {
          from: {
            pathname: "/dashboard",
          },
        };

        const data = await Auth.signIn(values.email, values.password);
        alert("Login was successfull!");
        dispatch({
          type: GLOBALS.ActionTypes.LOGIN,
          user: data.attributes,
          token: data.signInUserSession.accessToken.jwtToken,
        });
        history.push(from);
      }
    } catch (err) {
      setLoading(false);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={classes.root}>
      <Heading text="Login to your account" />
      <Form.Root>
        <Form.Item>
          <Input
            type="email"
            name="email"
            value={values.email}
            placeholder="E-mail address"
            onChange={(event) => {
              const re = /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/;
              if (!re.test(String(event.target.value).toLowerCase())) {
                setErrors({ ...errors, email: true });
              } else {
                setErrors({ ...errors, email: false });
              }
              setValues({ ...values, email: event.target.value });
            }}
            error={errors.email && "Something"}
          >
            <PersonIcon />
          </Input>
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={(event) => {
              if (event.target.value.length < 8) {
                setErrors({ ...errors, password: true });
              } else {
                setErrors({ ...errors, password: false });
              }
              setValues({ ...values, password: event.target.value });
            }}
            error={errors.password && "Something"}
          >
            <LockIcon />
          </Input>
        </Form.Item>
        <Form.ButtonContainer>
          <Button
            fullWidth
            type="submit"
            color="secondary"
            onClick={onSubmit}
            disabled={loading}
            text={loading ? <Loader.Progress /> : "LOGIN"}
          />
        </Form.ButtonContainer>
        <Form.Item>
          <SmallText to="/register" text="Don't have an account ? Register !" />
          <SmallText to="/forgot-password" text="Forgot Password ?" />
        </Form.Item>
      </Form.Root>
    </div>
  );
}

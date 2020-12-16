import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Auth } from "aws-amplify";
// jwt-decode

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

export default function Register(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    firstName: "Talha",
    lastName: "Ahmed",
    email: "betarid65@gmail.com",
    phone: 4325551212,
    password: "password12",
    confirmPassword: "password12",
  });
  const [errors, setErrors] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const onSubmit = async () => {
    try {
      if (values.firstName === "") {
        setErrors({ ...errors, firstName: true });
      } else if (values.lastName === "") {
        setErrors({ ...errors, lastName: true });
      } else if (values.email === "") {
        setErrors({ ...errors, email: true });
      } else if (values.phone === "") {
        setErrors({ ...errors, phone: true });
      } else if (values.password === "") {
        setErrors({ ...errors, password: true });
      } else if (values.confirmPassword === "") {
        setErrors({ ...errors, confirmPassword: true });
      } else {
        setLoading(true);
        await Auth.signUp({
          username: values.email,
          password: values.password,
          attributes: {
            email: values.email,
            name: `${values.firstName} ${values.lastName}`,
            phone_number: "+1" + String(values.phone),
          },
        });
        alert(
          "Registration was successful!\nCheck your Email to verify your Account!",
        );
        props.history.replace("/confirm-email");
      }
    } catch (err) {
      setLoading(false);
      alert("Error: " + err.message);
    }
  };

  return (
    <div className={classes.root}>
      <Heading text="Register your account" />
      <Form.Root>
        <Form.Row>
          <Form.RowItem>
            <Input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={values.firstName}
              onChange={(event) => {
                if (
                  event.target.value.length <= 0 ||
                  event.target.value.length > 30
                ) {
                  setErrors({ ...errors, firstName: true });
                } else {
                  setErrors({ ...errors, firstName: false });
                }
                setValues({ ...values, firstName: event.target.value });
              }}
              error={errors.firstName && "Something"}
            />
          </Form.RowItem>
          <Form.RowItem>
            <Input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={values.lastName}
              onChange={(event) => {
                if (
                  event.target.value.length <= 0 ||
                  event.target.value.length > 30
                ) {
                  setErrors({ ...errors, lastName: true });
                } else {
                  setErrors({ ...errors, lastName: false });
                }
                setValues({ ...values, lastName: event.target.value });
              }}
              error={errors.lastName && "Something"}
            />
          </Form.RowItem>
        </Form.Row>
        <Form.Item>
          <Input
            type="email"
            name="email"
            placeholder="E-Mail Address"
            value={values.email}
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
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="number"
            name="phone"
            placeholder="Phone Number"
            value={values.phone}
            onChange={(event) => {
              if (event.target.value.length === 10) {
                setErrors({ ...errors, phone: true });
              } else {
                setErrors({ ...errors, phone: false });
              }
              setValues({ ...values, phone: event.target.value });
            }}
          />
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
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={(event) => {
              if (event.target.value !== values.password) {
                setErrors({ ...errors, confirmPassword: true });
              } else {
                setErrors({ ...errors, confirmPassword: false });
              }
              setValues({ ...values, confirmPassword: event.target.value });
            }}
            error={errors.confirmPassword && "Something"}
          />
        </Form.Item>
        <Form.ButtonContainer>
          <Button
            fullWidth
            type="submit"
            color="secondary"
            disabled={loading}
            onClick={onSubmit}
            text={loading ? <Loader.Progress /> : "REGISTER"}
          />
        </Form.ButtonContainer>
        <Form.Item>
          <SmallText text="Already have an account? Login Now" to="/login" />
        </Form.Item>
      </Form.Root>
    </div>
  );
}

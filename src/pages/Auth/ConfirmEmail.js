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

export default function ConfirmEmail(props) {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [values, setValues] = React.useState({
    email: "betarid65@gmail.com",
    code: null,
  });
  const [errors, setErrors] = React.useState({
    email: false,
    code: false,
  });

  const onSubmit = async () => {
    try {
      if (values.email === "") {
        setErrors({ ...errors, email: true });
      } else if (values.code === "") {
        setErrors({ ...errors, code: true });
      } else {
        setLoading(true);
        await Auth.confirmSignUp(values.email.trim(), values.code.trim());
        alert("Account Confirmation was successful!\nYou can login now!");
        props.history.replace("/login");
      }
    } catch (err) {
      alert("Error: " + err.message);
      setLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <Heading text="Confirm your email address" />
      <Form.Root>
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
            name="code"
            placeholder="Code"
            value={values.code}
            onChange={(event) => {
              setValues({ ...values, code: event.target.value });
            }}
          />
        </Form.Item>
        <Form.ButtonContainer>
          <Button
            fullWidth
            type="submit"
            color="secondary"
            disabled={loading}
            onClick={onSubmit}
            text={loading ? <Loader.Progress /> : "Confrim"}
          />
        </Form.ButtonContainer>
        <Form.Item>
          <SmallText text="Or Login Now" to="/login" />
        </Form.Item>
      </Form.Root>
    </div>
  );
}

import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Button,
  Alert,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";

import { loginUser } from "../redux/actions";
import { verifyLoginRequest } from "./../redux/Apis";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onChangeUsername = useCallback(
    (e) => {
      e.stopPropagation();
      setUsername(e.target.value);
    },
    [setUsername]
  );

  const onChangePassword = useCallback(
    (e) => {
      e.stopPropagation();
      setPassword(e.target.value);
    },
    [setPassword]
  );

  const validateForm = useCallback(() => {
    let formIsValid = true;
    if (!username) {
      setErrorMessage("Please enter username");
      formIsValid = false;
    }
    if (!password) {
      setErrorMessage("Please enter password");
      formIsValid = false;
    }
    return formIsValid;
  }, [username, password, setErrorMessage]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (validateForm()) {
        setErrorMessage("");
        setSubmitting(true);
        try {
          const res = await verifyLoginRequest(username);
          if (res) {
            if (res.birth_year === password) {
              delete res.birth_year;
              dispatch(loginUser(true, res));
            } else {
              setErrorMessage("Password is incorrect");
              setSubmitting(false);
            }
          } else {
            setErrorMessage("Invalid Login details");
            setSubmitting(false);
          }
        } catch (error) {
          setErrorMessage("Something went wrong with API");
          setSubmitting(false);
        }
      }
    },
    [username, password, setSubmitting, setErrorMessage]
  );

  if (user.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h2>Sign In</h2>
            {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : ""}

            <Form className="form" onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Username</Label>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={onChangeUsername}
                />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={onChangePassword}
                  placeholder="********"
                />
              </FormGroup>
              <Button>{submitting ? "Submitting.." : "Submit"}</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;

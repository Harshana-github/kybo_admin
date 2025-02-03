import React, { Fragment } from "react";

import ButtonGroup from "@atlaskit/button/button-group";
import LoadingButton from "@atlaskit/button/loading-button";
import Button from "@atlaskit/button/standard-button";
import { Checkbox } from "@atlaskit/checkbox";
import TextField from "@atlaskit/textfield";
import Form, {
  CheckboxField,
  ErrorMessage,
  Field,
  FormFooter,
  FormHeader,
  FormSection,
  HelperMessage,
  RequiredAsterisk,
  ValidMessage,
} from "@atlaskit/form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../Features/auth/authThunk";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "400px",
        maxWidth: "100%",
        margin: "0 auto",
        flexDirection: "column",
        justifyContent: "center",
        position: "absolute",
        top: "0",
        right: "0",
        bottom: "0",
        left: "0",
      }}
    >
      <Form onSubmit={handleSubmit}>
        {({ formProps, submitting }) => (
          <form {...formProps}>
            <FormHeader title="Sign in">
              <p aria-hidden="true">
                Required fields are marked with an asterisk <RequiredAsterisk />
              </p>
            </FormHeader>
            <FormSection>
              <Field
                aria-required={true}
                name="email"
                label="Email"
                isRequired
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                    {!error && (
                      <HelperMessage>
                        You can use letters, numbers and periods.
                      </HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>
                        This username is already in use, try another one.
                      </ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <Field
                aria-required={true}
                name="password"
                label="Password"
                defaultValue=""
                isRequired
                validate={(value) =>
                  value && value.length < 8 ? "TOO_SHORT" : undefined
                }
              >
                {({ fieldProps, error, valid, meta }) => {
                  return (
                    <Fragment>
                      <TextField type="password" {...fieldProps} />
                      {error && !valid && (
                        <HelperMessage>
                          Use 8 or more characters with a mix of letters,
                          numbers and symbols.
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>
                          Password needs to be more than 8 characters.
                        </ErrorMessage>
                      )}
                      {valid && meta.dirty ? (
                        <ValidMessage>Awesome password!</ValidMessage>
                      ) : null}
                    </Fragment>
                  );
                }}
              </Field>
              <CheckboxField
                name="remember"
                label="Remember me"
                defaultIsChecked
              >
                {({ fieldProps }) => (
                  <Checkbox
                    {...fieldProps}
                    label="Always sign in on this device"
                  />
                )}
              </CheckboxField>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle">Cancel</Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  Sign up
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
    </div>
  );
}

export default Login;

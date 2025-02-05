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
import { useTranslation } from "react-i18next";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t: tLogin, i18n } = useTranslation("login");

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Change language dynamically
  };

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
            <FormHeader title={tLogin("signIn")}>
              <p aria-hidden="true">
                {tLogin("requiredFieldsMessage")} <RequiredAsterisk />
              </p>
            </FormHeader>
            <FormSection>
              <Field
                aria-required={true}
                name="email"
                label={tLogin("email")}
                isRequired
              >
                {({ fieldProps, error }) => (
                  <Fragment>
                    <TextField autoComplete="off" {...fieldProps} />
                    {!error && (
                      <HelperMessage>{tLogin("emailHelper")}</HelperMessage>
                    )}
                    {error && (
                      <ErrorMessage>{tLogin("emailError")}</ErrorMessage>
                    )}
                  </Fragment>
                )}
              </Field>
              <Field
                aria-required={true}
                name="password"
                label={tLogin("password")}
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
                          {tLogin("passwordHelper")}
                        </HelperMessage>
                      )}
                      {error && (
                        <ErrorMessage>{tLogin("passwordError")}</ErrorMessage>
                      )}
                      {valid && meta.dirty ? (
                        <ValidMessage>{tLogin("awesomePassword")}</ValidMessage>
                      ) : null}
                    </Fragment>
                  );
                }}
              </Field>
              <CheckboxField
                name="remember"
                label={tLogin("rememberMe")}
                defaultIsChecked
              >
                {({ fieldProps }) => (
                  <Checkbox {...fieldProps} label={tLogin("alwaysSignIn")} />
                )}
              </CheckboxField>
            </FormSection>

            <FormFooter>
              <ButtonGroup>
                <Button appearance="subtle">{tLogin("cancel")}</Button>
                <LoadingButton
                  type="submit"
                  appearance="primary"
                  isLoading={submitting}
                >
                  {tLogin("signUp")}
                </LoadingButton>
              </ButtonGroup>
            </FormFooter>
          </form>
        )}
      </Form>
      <div
        style={{
          position: "fixed",
          bottom: "150px",
          left: "0",
          width: "100%",
          textAlign: "center",
        }}
      >
        <ButtonGroup>
          <Button appearance="subtle" onClick={() => changeLanguage("en")}>
            English
          </Button>
          <Button appearance="subtle" onClick={() => changeLanguage("jp")}>
            日本語
          </Button>
          <Button appearance="subtle" onClick={() => changeLanguage("si")}>
            සිංහල
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}

export default Login;

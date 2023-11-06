import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginUser } from "../helpers/apiServices";
import { useNavigate } from "react-router-dom";

const loginSchema = yup.object({
  email: yup
    .string("Enter your email")
    .required("Please enter your email address"),
  password: yup
    .string("Enter your password")
    .required("Please enter your password")
    .min(5, "Must be atleast 5 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const loginResult = await loginUser(values);
      if (loginResult) {
        navigate("/dashboard");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <div className="label-wrapper">
            <label for="email">Email</label>
          </div>
          <TextField
            size="small"
            className="credential-field"
            value={formik.values.email}
            onChange={formik.handleChange}
            name="email"
            placeholder="bruce@wayne.com"
            variant="outlined"
          />
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <p className="validation-error">{formik.errors.email}</p>
          ) : (
            <></>
          )}
        </div>
        <div>
          <div className="label-wrapper">
            <label for="password">Password</label>
          </div>
          <TextField
            size="small"
            className="credential-field"
            value={formik.values.password}
            onChange={formik.handleChange}
            type="password"
            name="password"
            placeholder="Atleast 8 characters"
            variant="outlined"
          />
          {formik.touched.password && Boolean(formik.errors.password) ? (
            <p className="validation-error">{formik.errors.password}</p>
          ) : (
            <></>
          )}
        </div>
        <Button
          style={{ marginTop: "25px" }}
          variant="contained"
          type="submit"
          className="secondary-button auth-button"
        >
          Log in to Dropform
        </Button>
      </div>
    </form>
  );
};

export default LoginPage;

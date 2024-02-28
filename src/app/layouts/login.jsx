import React, { useState } from "react";
import LoginForm from "../components/ui/loginForm";
import { useParams } from "react-router-dom";
import RegisterForm from "../components/ui/registerForm";
const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? "type" : "login"
  );

  const toggleFormType = () => {
    setFormType((prevState) => (prevState === "login" ? "register" : "login"));
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === "login" ? (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Еще нет аккаунта?{" "}
                <a role="button" onClick={toggleFormType}>
                  Зарегистрироваться
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Уже есть аккаунт?{" "}
                <a role="button" onClick={toggleFormType}>
                  Войти
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

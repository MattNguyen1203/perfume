import React from "react";
import "./Login.css";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    fetch("https://perfume-backend.onrender.com/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="bg-form">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="reg-bg">
          <div className="reg-con">
            <div className="reg-title">Register</div>
            <input
              type="text"
              id="user"
              {...register("user")}
              placeholder="Enter your name"
            />
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            <input
              type="text"
              id="phone"
              {...register("phone")}
              placeholder="Enter your phone"
            />
            <input
              type="password"
              id="password"
              {...register("password", { minLength: 8 })}
              placeholder="Enter your password"
            />
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;

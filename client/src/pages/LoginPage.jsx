import React from "react";
import AuthForm from "../components/AuthForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <section className="min-h-[100svh] grid place-items-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="text-center">
            <div className="badge badge-primary badge-outline mb-3">Welcome back</div>
            <h1 className="card-title justify-center text-2xl sm:text-3xl">
              Login to your account
            </h1>
            <p className="text-sm text-base-content/70 mt-1">
              Short links, big impact. Let’s get you in.
            </p>
          </div>

          <AuthForm title="Login to your account" type="login" />

          <div className="text-center text-sm mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="link link-primary">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
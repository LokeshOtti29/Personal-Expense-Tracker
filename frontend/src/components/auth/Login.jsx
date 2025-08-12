import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  remember: z.boolean().optional(),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        navigate("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="text-center mb-4">Login</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-outline mb-3">
              <input
                type="email"
                id="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email.message}</div>
              )}
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                id="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                placeholder="Enter password"
                {...register("password")}
              />
              {errors.password && (
                <div className="invalid-feedback">
                  {errors.password.message}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block mb-3 w-100"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className="text-center">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

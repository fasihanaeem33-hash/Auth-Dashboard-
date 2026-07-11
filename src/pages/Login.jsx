import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await login(
        formData.email,
        formData.password
      );

      toast.success("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Loader
        loading={loading}
        text="Logging In..."
      />

      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Login Card */}
        <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8">

          <h1 className="text-5xl font-bold text-center text-white">
            Welcome Back
          </h1>

          <p className="text-center text-gray-200 mt-3 mb-8 text-lg">
            Sign in to your account
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Email */}

            <div className="relative">

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-14 rounded-xl border border-white/30 bg-white/20 px-5 pr-14 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <FaEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />

            </div>

            {/* Password */}

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-14 rounded-xl border border-white/30 bg-white/20 px-5 pr-14 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-white text-lg font-semibold shadow-lg"
            >
              {loading ? "Please Wait..." : "Login"}
            </button>

            {/* Signup */}

            <p className="text-center text-gray-200">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-cyan-300 font-semibold hover:underline"
              >
                Signup
              </Link>
            </p>

          </form>

        </div>
      </div>
    </>
  );
};

export default Login;
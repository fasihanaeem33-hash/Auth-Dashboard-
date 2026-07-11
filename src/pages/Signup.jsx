import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaUser,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const Signup = () => {
  const navigate = useNavigate();

  const { signup } = useAuth();

  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    if (!formData.name.trim()) {
      toast.error("Enter your full name");
      return false;
    }

    if (formData.name.length < 3) {
      toast.error("Name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      await signup(
        formData.name,
        formData.email,
        formData.password
      );

      toast.success("Account Created Successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.message || "Signup Failed"
      );
    } finally {
      setLoading(false);
    }
  };

    return (
    <>
      <Loader
        loading={loading}
        text="Creating Account..."
      />

      <div
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center px-4 py-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Signup Card */}
        <div className="relative w-full max-w-md rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl p-8">

          <h1 className="text-5xl font-bold text-center text-white">
            Create Account
          </h1>

          <p className="text-center text-gray-200 mt-3 mb-8 text-lg">
            Join our dashboard
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Name */}

            <div className="relative">

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14 rounded-xl border border-white/30 bg-white/20 px-5 pr-14 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <FaUser className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 text-lg" />

            </div>

            {/* Email */}

            <div className="relative">

              <input
                type="email"
                name="email"
                placeholder="Email Address"
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
                placeholder="Password"
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

            {/* Confirm Password */}

            <div className="relative">

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full h-14 rounded-xl border border-white/30 bg-white/20 px-5 pr-14 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white transition"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash size={18} />
                ) : (
                  <FaEye size={18} />
                )}
              </button>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition duration-300 text-white text-lg font-semibold shadow-lg"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            {/* Login */}

            <p className="text-center text-gray-200">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-cyan-300 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>

          </form>

        </div>
      </div>
    </>
  );
};

export default Signup;
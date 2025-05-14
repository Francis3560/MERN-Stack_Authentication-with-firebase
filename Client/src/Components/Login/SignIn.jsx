import React, { useState } from "react";
import { FaXTwitter, FaEye, FaEyeSlash } from "react-icons/fa6";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import BackgroundImage from "../Images/LoginBackground.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!credentials.email || !credentials.password) {
      setModal({ open: true, type: "error", message: "Both fields are required." });
      return;
    }

    setLoading(true);

    try {
      // Change the URL to match your backend endpoint
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      
      // Store the JWT token in localStorage
      localStorage.setItem("token", response.data.token);

      setLoading(false);
      setModal({ open: true, type: "success", message: "Login successful!" });

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setLoading(false);
      setModal({
        open: true,
        type: "error",
        message: err.response ? err.response.data.message : "Login failed. Check your credentials.",
      });
    }
  };

  const handleTwitterLogin = async () => {
    // Twitter login logic (if implemented)
    try {
      // Assuming the Twitter login integration is handled elsewhere
      const user = await signInWithTwitter();
      if (user) {
        navigate("/index");
      }
    } catch (error) {
      setModal({ open: true, type: "error", message: "Twitter login failed. Try again." });
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <motion.div
        className="bg-[#27272c] mx-4 md:mx-0 lg:mx-0 shadow-lg rounded-lg flex w-full lg:w-3/4 overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="hidden lg:block lg:w-1/2 bg-cover relative"
          style={{ backgroundImage: `url(${BackgroundImage})`, backgroundPosition: "center" }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="z-10 flex flex-col justify-center h-full text-center px-8">
            <h1 className="text-4xl font-bold text-cyan-600">Tweet Analytica</h1>
            <p className="text-lg text-blue-800 mt-2">
              Unlocking the full potential of Sentiment Analysis
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-500 text-center lg:text-left mb-6">
            Sign-in to Tweet Analytica
          </h2>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={credentials.email}
              onChange={handleInputChange}
            />

            {/* Password Field with Toggle */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-12 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500 pr-10"
                value={credentials.password}
                onChange={handleInputChange}
              />
              <span className="absolute right-3 top-4 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-blue-500 text-white font-bold transition-all hover:bg-blue-600 flex items-center justify-center"
            >
              {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> : "Sign In"}
            </button>
          </form>

          <div className="my-4 text-white/80 text-center">or</div>

          <button
            onClick={handleTwitterLogin}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gray-800 text-white hover:bg-gray-900 transition-all duration-300"
          >
            <FaXTwitter />
            Sign-in with Twitter (X)
          </button>

          <p className="mt-4 text-white/80 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-800 font-bold hover:underline">
              Sign Up Now
            </a>
          </p>
        </div>
      </motion.div>

      {/* Modal */}
      {modal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg text-center shadow-lg">
            {modal.type === "success" ? (
              <AiFillCheckCircle className="text-green-500 text-4xl mx-auto mb-3" />
            ) : (
              <AiFillCloseCircle className="text-red-500 text-4xl mx-auto mb-3" />
            )}
            <p className="text-white text-lg">{modal.message}</p>
            <button
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={() => setModal({ open: false, type: "", message: "" })}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;

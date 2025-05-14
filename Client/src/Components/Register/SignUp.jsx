import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { motion } from "framer-motion";
import BackgroundImage from "../Images/RegisterBackground.jpg";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ open: false, type: "", message: "" });
  const [agree, setAgree] = useState(false);

  // Validation Functions
  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const isValidPhoneNumber = (phone) => /^(\+254)\d{9}$/.test(phone);
  const isValidPassword = (password) =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
      password
    );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Log formData to ensure confirmPassword is included
    console.log('Form Data on Submit:', formData);

    // Password and confirm password match check
    if (formData.password !== formData.confirmPassword) {
      setModal({ open: true, type: "error", message: "Passwords do not match." });
      return;
    }

    // Validate all required fields
    if (!formData.full_name || !formData.username || !formData.email || !formData.phone_number || !formData.password || !formData.confirmPassword) {
      setModal({ open: true, type: "error", message: "All fields are required." });
      return;
    }

    // Validate email format
    if (!isValidEmail(formData.email)) {
      setModal({ open: true, type: "error", message: "Please enter a valid email." });
      return;
    }

    // Validate phone number format
    if (!isValidPhoneNumber(formData.phone_number)) {
      setModal({ open: true, type: "error", message: "Please enter a valid phone number (e.g., +254XXXXXXXXX)." });
      return;
    }

    // Validate password strength
    if (!isValidPassword(formData.password)) {
      setModal({ open: true, type: "error", message: "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character." });
      return;
    }

    // Terms & conditions check
    if (!agree) {
      setModal({ open: true, type: "error", message: "You must agree to the Terms and Conditions." });
      return;
    }

    setLoading(true);

    try {
      const credentials = {
        full_name: formData.full_name,  
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        confirmPassword: formData.confirmPassword, 
      };

      const response = await axios.post("http://localhost:5000/api/auth/signup", credentials, {
        headers: { "Content-Type": "application/json" },
      });

      setLoading(false);

      if (response.status === 201) {
        setModal({ open: true, type: "success", message: "Account created successfully!" });
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      setLoading(false);
      setModal({ open: true, type: "error", message: error.response?.data?.message || "Sign-up failed. Please try again." });
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
            <h1 className="text-4xl font-bold text-cyan-600">Stay ahead of the curve with Tweet Analytica</h1>
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-blue-500 text-center lg:text-left mb-6">Sign-up to Tweet Analytica</h2>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={formData.full_name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={formData.username}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phone_number"
              placeholder="Phone Number (+254)"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={formData.phone_number}
              onChange={handleInputChange}
            />

            {/* Password Field with Toggle */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full h-12 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500 pr-10"
                value={formData.password}
                onChange={handleInputChange}
              />
              <span className="absolute right-3 top-4 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full h-12 mb-4 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white outline-none focus:border-blue-500"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />

            <div className="flex items center mb-4">
              <input type="checkbox" id="agree" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="text-teal-500 rounded-sm"/>
              <label htmlFor="agree" className="text-white/80 ml-2">I agree to the Terms & Conditions</label>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-blue-500 text-white font-bold transition-all hover:bg-blue-600 flex items-center justify-center"
            >
              {loading ? <span className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span> : "Sign Up"}
            </button>
            <div className="text-center mt-6">
              <p className="text-white/80">
                Already have an account? {" "}
                <a href="/login" className="text-blue-300 hover:underline">Sign In Here</a>
              </p>
            </div>
          </form>
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

export default SignUp;

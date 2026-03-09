import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
import { studentSignIn } from "../../../redux/actions/studentActions";

const StudentLogin = () => {
  const [mounted, setMounted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(studentSignIn({ username, password }, navigate));
  };

  return (
    <div className="app-bg relative min-h-screen flex items-center justify-center overflow-hidden px-4">

      {/* Animated background orbs */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl top-[-150px] left-[-150px] animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-3xl bottom-[-120px] right-[-120px] animate-pulse" />

      {/* Glass Card */}
      <div
        className={`relative z-10 w-full max-w-md backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-10 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        {/* Logo */}
          <div className="flex justify-center mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-2xl shadow-lg">
            🎓
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2">
          <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            Student Login
          </span>
        </h2>

        <p className="text-center text-gray-400 text-sm mb-8">
          Access your academic dashboard
        </p>

        <form onSubmit={login} className="space-y-6">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-400 font-medium">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full mt-2 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-400 font-medium">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 transition"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-gray-400 hover:text-indigo-400 transition"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </div>
            </div>
          </div>

          {/* Error */}
          {(error.usernameError || error.passwordError) && (
            <p className="text-red-400 text-sm text-center">
              {error.usernameError || error.passwordError}
            </p>
          )}

          {/* Button */}
          <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-violet-600 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-indigo-500/30"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          {/* Spinner */}
          {loading && (
            <div className="flex justify-center mt-2">
              <Spinner
                message=""
                height={25}
                width={120}
                color="#ffffff"
                messageColor="#fff"
              />
            </div>
          )}
        </form>

        {/* Back to home */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-gray-400 hover:text-indigo-400 transition"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;

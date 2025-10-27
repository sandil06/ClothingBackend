import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }
    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");

      // Optionally store token for later authenticated calls
      if (data?.token) localStorage.setItem("token", data.token);

      // Navigate by role
      if (data?.role === "admin") {
        navigate("/admin", { replace: true });
      } else if (data?.role === "buyer") {
        navigate("/customer", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white overflow-x-hidden font-[Manrope,_'Noto_Sans',_sans-serif]"
    >

      {/* Login Form */}
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="flex flex-col w-[512px] max-w-[512px] py-5">
          <h2 className="text-[#141414] text-[28px] font-bold text-center pb-3 pt-5">
            Welcome back
          </h2>

          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col flex-1">
              <p className="text-[#141414] text-base font-medium pb-2">Email</p>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#f2f2f2] h-14 p-4 text-base focus:outline-none"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-end gap-4 px-4 py-3">
            <label className="flex flex-col flex-1">
              <p className="text-[#141414] text-base font-medium pb-2">
                Password
              </p>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#f2f2f2] h-14 p-4 text-base focus:outline-none"
              />
            </label>
          </div>

          <p className="text-[#757575] text-sm underline px-4 pt-1">
            Forgot password?
          </p>

          {error && (
            <p className="text-red-600 text-sm text-center px-4">{error}</p>
          )}

          <div className="flex px-4 py-3">
            <button
              type="button"
              onClick={handleSignIn}
              disabled={loading}
              className="flex items-center justify-center w-full h-10 bg-black text-white rounded-lg font-bold disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <p className="text-[#757575] text-sm text-center pt-1">Or sign in with</p>

          <div className="flex justify-center">
            <div className="flex flex-wrap gap-3 px-4 py-3 max-w-[480px] justify-center">
              <button className="flex items-center justify-center w-full h-10 bg-[#f2f2f2] text-[#141414] rounded-lg font-bold">
                Continue with google
              </button>
              <button className="flex items-center justify-center w-full h-10 bg-[#f2f2f2] text-[#141414] rounded-lg font-bold">
                Continue with SocialMedia
              </button>
            </div>
          </div>

          <p className="text-[#757575] text-sm text-center underline">
            Don’t have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

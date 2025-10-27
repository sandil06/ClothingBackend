import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const API_BASE = import.meta.env.VITE_API_URL || "";
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Registration failed");

      setSuccess("Account created.");
      setForm({ name: "", email: "", password: "", confirm: "" });
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-white group/design-root overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* Register Form */}
        <div className="px-40 flex flex-1 items-center justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 mx-auto">
            <h2 className="text-[#141414] text-[28px] font-bold text-center pb-3 pt-5">
              Create Account
            </h2>
            {/* Removed <form> to fully avoid native browser validation */}
              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={onChange}
                    onInvalid={(e) => e.preventDefault()}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                    placeholder="Full Name"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] border border-[#e0e0e0] bg-white focus:border-[#e0e0e0] h-14 placeholder:text-[#757575] p-[15px] text-base font-normal focus:outline-0 focus:ring-0"
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="email"
                    type="text"
                    value={form.email}
                    onChange={onChange}
                    onInvalid={(e) => e.preventDefault()}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                    placeholder="Email"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] border border-[#e0e0e0] bg-white focus:border-[#e0e0e0] h-14 placeholder:text-[#757575] p-[15px] text-base font-normal focus:outline-0 focus:ring-0"
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    onInvalid={(e) => e.preventDefault()}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                    placeholder="Password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] border border-[#e0e0e0] bg-white focus:border-[#e0e0e0] h-14 placeholder:text-[#757575] p-[15px] text-base font-normal focus:outline-0 focus:ring-0"
                  />
                </label>
              </div>

              <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
                <label className="flex flex-col min-w-40 flex-1">
                  <input
                    name="confirm"
                    type="password"
                    value={form.confirm}
                    onChange={onChange}
                    onInvalid={(e) => e.preventDefault()}
                    onInput={(e) => e.currentTarget.setCustomValidity("")}
                    placeholder="Confirm Password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#141414] border border-[#e0e0e0] bg-white focus:border-[#e0e0e0] h-14 placeholder:text-[#757575] p-[15px] text-base font-normal focus:outline-0 focus:ring-0"
                  />
                </label>
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center px-4">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm text-center px-4">{success}</p>
              )}

              <div className="flex px-4 py-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-black text-white text-sm font-bold tracking-[0.015em] disabled:opacity-60"
                >
                  {loading ? "Registering..." : "Register"}
                </button>
              </div>
            {/* End of form replacement */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";

const AccountPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zip: "",
  });

  // Use relative API base in development so Vite proxy forwards /api to backend
  const API_BASE = import.meta.env.MODE === 'development' ? "" : (import.meta.env.VITE_API_URL || "");
  console.log("[Account] API_BASE:", API_BASE, "MODE:", import.meta.env.MODE);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
    const loadProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/auth/profile`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 401) {
          localStorage.removeItem("token");
          navigate("/login", { replace: true });
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || "Failed to load profile");
        setProfile((p) => ({ ...p, ...data }));
      } catch (e) {
        setError(e.message || "Something went wrong loading profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [API_BASE, navigate]);

  // Auto-hide success toast
  useEffect(() => {
    if (!success) return;
    const t = setTimeout(() => setSuccess(""), 2500);
    return () => clearTimeout(t);
  }, [success]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setProfile((p) => ({ ...p, [name]: value }));
  };

  const handleUpdate = async () => {
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login", { replace: true });
    try {
      setLoading(true);
      const url = `${API_BASE}/api/auth/profile`;
      const body = {
        name: profile.name,
        phone: profile.phone,
        dob: profile.dob,
        addressLine1: profile.addressLine1,
        addressLine2: profile.addressLine2,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
      };
      console.log("[Account] PUT", url, body);
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));
      console.log("[Account] PUT response", res.status, data);
      if (!res.ok) throw new Error(data?.message || "Update failed");
      setProfile((p) => ({ ...p, ...data }));
      setSuccess("Profile updated");
    } catch (e) {
      setError(e.message || "Something went wrong updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete your account? This cannot be undone.")) return;
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login", { replace: true });
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || "Delete failed");
      localStorage.removeItem("token");
      navigate("/register", { replace: true });
    } catch (e) {
      setError(e.message || "Something went wrong deleting account");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="relative flex min-h-screen w-full items-center justify-center bg-black text-white">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col bg-black text-white overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      {/* Toasts */}
      {success && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-green-600 text-white px-4 py-2 shadow-lg">
          {success}
        </div>
      )}
      {error && !loading && (
        <div className="fixed top-4 right-4 z-50 rounded-lg bg-red-600 text-white px-4 py-2 shadow-lg">
          {error}
        </div>
      )}
      <div className="layout-container flex h-full grow flex-col">

        <div className="px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
                My Account
              </p>
            </div>

            {/* Tabs */}
            <div className="pb-3">
              <div className="flex border-b border-gray-800 px-4 gap-8">
                {[
                  { label: "Account Details", to: "/account" },
                  { label: "My Orders", to: "/account/orders" },
                  { label: "Payment Methods / Wallet", to: "/account/wallet" },
                  { label: "VIP Offers & Discounts", to: "/account/vip" },
                ].map((tab) => {
                  const active = location.pathname === tab.to;
                  return (
                    <Link
                      key={tab.label}
                      className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 ${
                        active ? "border-b-white text-white" : "border-b-transparent text-gray-400"
                      }`}
                      to={tab.to}
                    >
                      <p className="text-sm font-bold leading-normal tracking-[0.015em]">{tab.label}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Personal Information
            </h2>

            {/* Alerts */}
            {error && (
              <p className="text-red-400 text-sm px-4">{error}</p>
            )}
            {success && (
              <p className="text-green-400 text-sm px-4">{success}</p>
            )}

            {/* Personal Information Fields */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Full Name</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="name"
                  value={profile.name}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Email Address</span>
                <input
                  type="email"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="email"
                  value={profile.email}
                  readOnly
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Phone Number</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="phone"
                  value={profile.phone || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Date of Birth</span>
                <input
                  type="date"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="dob"
                  value={profile.dob || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
              Shipping Address
            </h2>

            {/* Shipping Address Fields */}
            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Address Line 1</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="addressLine1"
                  value={profile.addressLine1 || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Address Line 2</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="addressLine2"
                  value={profile.addressLine2 || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">City</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="city"
                  value={profile.city || ""}
                  onChange={onChange}
                />
              </label>
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">State</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="state"
                  value={profile.state || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
              <label className="flex flex-col min-w-40 flex-1">
                <span className="text-white text-base font-medium leading-normal pb-2">Zip Code</span>
                <input
                  type="text"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white border border-gray-700 bg-[#111] h-14 p-[15px] placeholder-gray-400 focus:outline-0 focus:ring-0"
                  name="zip"
                  value={profile.zip || ""}
                  onChange={onChange}
                />
              </label>
            </div>

            <div className="flex px-4 py-3 gap-3 justify-start">
              <button onClick={handleUpdate} disabled={loading} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#111] border border-gray-700 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#141414] disabled:opacity-60">
                <span className="truncate">{loading ? "Saving..." : "Update Profile"}</span>
              </button>
              <button onClick={handleDelete} disabled={loading} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-red-600 border border-red-700 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-red-700 disabled:opacity-60">
                <span className="truncate">Delete Account</span>
              </button>
              <button onClick={handleSignOut} className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-transparent border border-gray-700 text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#141414]">
                <span className="truncate">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AccountPage;

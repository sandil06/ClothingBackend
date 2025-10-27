import React, { useEffect, useState } from "react";

export default function AdminProfile() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [profile, setProfile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "" });

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const loadProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/profile`, { headers: { ...authHeaders() } });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load profile');
      setProfile(data?.data || data);
      const p = data?.data || data;
      setForm({ name: p.name || "", email: p.email || "", phone: p.phone || "", role: p.role || "" });
    } catch (e) { console.error(e); }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      const res = await fetch(`${API_BASE}/api/auth/profile`, {
        method: 'PUT',
        headers: { ...authHeaders() },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Save failed');
      await loadProfile();
      alert('Profile updated');
    } catch (e) { alert(e.message || 'Failed to save'); } finally { setSaving(false); }
  };

  useEffect(()=>{ loadProfile(); }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <img src="/images/avatar-admin.jpg" onError={(e)=>{e.currentTarget.src='https://i.pravatar.cc/96?img=12'}} alt="avatar" className="h-16 w-16 rounded-full object-cover border"/>
        <div>
          <h2 className="text-xl font-bold">{form.name || 'Admin'}</h2>
          <p className="text-sm text-gray-500">{form.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium">Name</span>
          <input className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Email</span>
          <input className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Phone</span>
          <input className="h-10 px-3 rounded-lg border border-[#dbe0e6]" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})}/>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium">Role</span>
          <input className="h-10 px-3 rounded-lg border border-[#dbe0e6] bg-gray-100" value={form.role} disabled/>
        </label>
      </div>

      {profile && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="text-sm break-all">{profile._id}</p>
          </div>
          <div className="p-3 rounded-lg border">
            <p className="text-xs text-gray-500">Created</p>
            <p className="text-sm">{(profile.createdAt || '').substring(0,10)}</p>
          </div>
          <div className="p-3 rounded-lg border">
            <p className="text-xs text-gray-500">Status</p>
            <p className="text-sm">{profile.isActive === false ? 'Inactive' : 'Active'}</p>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button className="h-10 px-4 rounded-lg bg-black text-white" disabled={saving} onClick={saveProfile}>Save</button>
        <button className="h-10 px-4 rounded-lg border" onClick={loadProfile}>Reload</button>
      </div>
    </div>
  );
}

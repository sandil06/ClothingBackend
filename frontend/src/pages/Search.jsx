import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function SearchPage() {
  const API_BASE = import.meta.env.VITE_API_URL || "";
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const navigate = useNavigate();

  const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    "Content-Type": "application/json",
  });

  const search = async (q) => {
    if (!q) { setResults([]); return; }
    try {
      setLoading(true);
      const [mens, womens, kids, combos] = await Promise.all([
        fetch(`${API_BASE}/api/menswear?q=${encodeURIComponent(q)}`).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/womenswear?q=${encodeURIComponent(q)}`).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/kidswear?q=${encodeURIComponent(q)}`).then(r=>r.json()).catch(()=>({data:[]})),
        fetch(`${API_BASE}/api/style-combos?q=${encodeURIComponent(q)}`).then(r=>r.json()).catch(()=>({data:[]})),
      ]);
      const all = [
        ...(mens?.data || []).map(i=>({...i, category: 'Menswear'})),
        ...(womens?.data || []).map(i=>({...i, category: 'Womenswear'})),
        ...(kids?.data || []).map(i=>({...i, category: 'Kidswear'})),
        ...(combos?.data || []).map(i=>({...i, category: 'Style Combo'})),
      ];
      setResults(all);
    } catch (e) { console.error('Search failed', e); }
    finally { setLoading(false); }
  };

  useEffect(()=>{
    const q = searchParams.get('q') || '';
    setQuery(q);
    search(q);
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ q: query });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8 border-x border-gray-800">
        <h1 className="text-3xl font-bold mb-4">Search</h1>
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            className="flex-1 h-10 px-3 rounded bg-[#111] border border-gray-700"
            placeholder="Search for products..."
            value={query}
            onChange={e=>setQuery(e.target.value)}
          />
          <button type="submit" className="h-10 px-5 rounded bg-white text-black">Search</button>
        </form>

        {loading && <p className="text-gray-400">Searching...</p>}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((item, idx)=>{
            const img = (item.images && item.images[0]) || '/placeholder.png';
            return (
              <div key={idx} className="flex flex-col gap-2">
                <img src={img} alt={item.name} className="w-full h-64 object-cover rounded-lg" onError={(e)=>{e.currentTarget.src='/placeholder.png'}}/>
                <p className="text-sm text-gray-400">{item.category}</p>
                <p className="font-medium">{item.name}</p>
                {item.price !== undefined && (
                  <p className="text-gray-300 text-sm">$ {Number(item.price).toFixed(2)}</p>
                )}
                <div className="flex items-center gap-2">
                  <button className="h-9 px-3 rounded border border-gray-700 text-sm" onClick={async ()=>{
                    try {
                      await fetch(`${API_BASE}/api/cart`, { method: 'POST', headers: { ...authHeaders() }, body: JSON.stringify({ itemId: item._id, quantity: 1 }) });
                      setToast('Added to cart'); setTimeout(()=>setToast(""), 1500);
                    } catch (e) { setToast('Failed to add'); setTimeout(()=>setToast(""), 1500); }
                  }}>Add to Cart</button>
                  <button className="h-9 px-3 rounded border border-gray-700 text-sm" onClick={()=>navigate('/cart')}>Go to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
        {(!loading && results.length === 0 && query) && (
          <p className="text-gray-400 mt-4">No results found for "{query}".</p>
        )}
        {toast && (<div className="fixed bottom-4 right-4 bg-white text-black px-3 py-2 rounded shadow">{toast}</div>)}
      </main>
    </div>
  );
}

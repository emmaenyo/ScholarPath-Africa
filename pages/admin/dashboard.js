// pages/admin/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ scholarships: 0, countries: 0, blog_posts: 0, subscribers: 0 });
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [lastRun, setLastRun] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingScholarship, setEditingScholarship] = useState(null);
  const [form, setForm] = useState({
    title: '', country: '', type: 'scholarship', degree_level: 'Masters',
    funding_type: 'full', amount: '', deadline: '', description: '',
    eligibility: '', benefits: '', subjects: '', host_university: '',
    host_country: '', official_url: '', visa_sponsored: false, is_featured: false,
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [statsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/stats', { credentials: 'include' }),
        fetch('/api/admin/settings', { credentials: 'include' }),
      ]);
      if (statsRes.status === 401) { router.push('/admin'); return; }
      const statsData = await statsRes.json();
      const settingsData = await settingsRes.json();
      setStats(statsData);
      setAutoEnabled(settingsData.auto_scholarships_enabled !== '0');
      setLastRun(settingsData.last_auto_run || null);
    } catch (e) {}
    await loadScholarships();
    setLoading(false);
  }

  async function loadScholarships(q = '') {
    const res = await fetch(`/api/admin/scholarships?search=${q}&limit=50`, { credentials: 'include' });
    const data = await res.json();
    setScholarships(data.scholarships || []);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { credentials: 'include' });
    router.push('/admin');
  }

  async function toggleAuto(val) {
    setAutoEnabled(val);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ key: 'auto_scholarships_enabled', value: val ? '1' : '0' }),
    });
    showMessage(val ? '✅ Auto-generation enabled' : '⏸️ Auto-generation disabled');
  }

  async function triggerNow() {
    setTriggering(true);
    showMessage('⏳ Generating scholarships via OpenAI...');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trigger_now: true }),
      });
      const data = await res.json();
      if (data.success) {
        showMessage(`✅ Added ${data.added} scholarships, skipped ${data.skipped} duplicates`);
        loadData();
      } else {
        showMessage(`ℹ️ ${data.message || data.error}`);
      }
    } catch { showMessage('❌ Error. Check OpenAI API key.'); }
    setTriggering(false);
  }

  function showMessage(msg) {
    setMessage(msg);
    setTimeout(() => setMessage(''), 4000);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this scholarship?')) return;
    await fetch(`/api/admin/scholarships/${id}`, { method: 'DELETE', credentials: 'include' });
    showMessage('✅ Deleted');
    loadScholarships(search);
    loadData();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingScholarship ? 'PUT' : 'POST';
    const url = editingScholarship ? `/api/admin/scholarships/${editingScholarship.id}` : '/api/admin/scholarships';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    if (res.ok) {
      showMessage(editingScholarship ? '✅ Updated!' : '✅ Added!');
      setShowForm(false);
      setEditingScholarship(null);
      resetForm();
      loadScholarships(search);
      loadData();
    }
  }

  function resetForm() {
    setForm({ title: '', country: '', type: 'scholarship', degree_level: 'Masters', funding_type: 'full', amount: '', deadline: '', description: '', eligibility: '', benefits: '', subjects: '', host_university: '', host_country: '', official_url: '', visa_sponsored: false, is_featured: false });
  }

  function startEdit(s) {
    setEditingScholarship(s);
    setForm({ ...s });
    setShowForm(true);
    setActiveTab('scholarships');
    window.scrollTo(0, 0);
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500 text-lg">Loading dashboard...</div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'scholarships', label: '🎓 Scholarships' },
    { id: 'automation', label: '🤖 Automation' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌍</span>
          <div>
            <div className="font-bold text-lg">ScholarPath Africa</div>
            <div className="text-green-200 text-xs">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-green-200 hover:text-white text-sm">View Site ↗</Link>
          <button onClick={handleLogout} className="bg-green-800 hover:bg-green-900 px-4 py-1.5 rounded-lg text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="bg-blue-600 text-white text-sm text-center py-2 px-4">{message}</div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b px-6">
        <div className="flex gap-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="font-bold text-gray-900 text-xl">Overview</h2>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Scholarships', value: stats.scholarships, icon: '🎓', color: 'bg-green-50 text-green-700' },
                { label: 'Countries', value: stats.countries, icon: '🌍', color: 'bg-blue-50 text-blue-700' },
                { label: 'Blog Posts', value: stats.blog_posts, icon: '📝', color: 'bg-purple-50 text-purple-700' },
                { label: 'Subscribers', value: stats.subscribers, icon: '📧', color: 'bg-amber-50 text-amber-700' },
              ].map(stat => (
                <div key={stat.label} className={`rounded-2xl p-5 ${stat.color}`}>
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium opacity-80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => { setActiveTab('scholarships'); setShowForm(true); resetForm(); }}
                className="bg-white border-2 border-green-200 hover:border-green-500 rounded-2xl p-5 text-left transition-colors group">
                <div className="text-2xl mb-2">➕</div>
                <div className="font-semibold text-gray-800 group-hover:text-green-700">Add Scholarship</div>
                <div className="text-sm text-gray-500">Manually add a new opportunity</div>
              </button>
              <button onClick={() => setActiveTab('automation')}
                className="bg-white border-2 border-blue-200 hover:border-blue-500 rounded-2xl p-5 text-left transition-colors group">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-semibold text-gray-800 group-hover:text-blue-700">AI Automation</div>
                <div className="text-sm text-gray-500">{autoEnabled ? 'Currently enabled' : 'Currently disabled'}</div>
              </button>
              <button onClick={() => setActiveTab('scholarships')}
                className="bg-white border-2 border-purple-200 hover:border-purple-500 rounded-2xl p-5 text-left transition-colors group">
                <div className="text-2xl mb-2">📋</div>
                <div className="font-semibold text-gray-800 group-hover:text-purple-700">Manage Scholarships</div>
                <div className="text-sm text-gray-500">Edit, delete, or review listings</div>
              </button>
            </div>
          </div>
        )}

        {/* SCHOLARSHIPS TAB */}
        {activeTab === 'scholarships' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-xl">Scholarships ({scholarships.length})</h2>
              <button onClick={() => { setShowForm(!showForm); setEditingScholarship(null); resetForm(); }}
                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                {showForm ? '✕ Cancel' : '+ Add New'}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-5">{editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship'}</h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { key: 'title', label: 'Title*', full: true },
                    { key: 'country', label: 'Country*' },
                    { key: 'host_university', label: 'Host University' },
                    { key: 'host_country', label: 'Host Country' },
                    { key: 'amount', label: 'Amount' },
                    { key: 'deadline', label: 'Deadline' },
                    { key: 'official_url', label: 'Official URL' },
                    { key: 'subjects', label: 'Subjects' },
                  ].map(({ key, label, full }) => (
                    <div key={key} className={full ? 'md:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}

                  {[
                    { key: 'description', label: 'Description' },
                    { key: 'eligibility', label: 'Eligibility' },
                    { key: 'benefits', label: 'Benefits' },
                  ].map(({ key, label }) => (
                    <div key={key} className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                      <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      <option value="scholarship">Scholarship</option>
                      <option value="fellowship">Fellowship</option>
                      <option value="internship">Internship</option>
                      <option value="research-grant">Research Grant</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Funding Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.funding_type} onChange={e => setForm(f => ({ ...f, funding_type: e.target.value }))}>
                      <option value="full">Fully Funded</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Degree Level</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.degree_level} onChange={e => setForm(f => ({ ...f, degree_level: e.target.value }))}>
                      <option value="Bachelors">Bachelor's</option>
                      <option value="Masters">Master's</option>
                      <option value="PhD">PhD</option>
                      <option value="Non-degree">Non-degree</option>
                    </select>
                  </div>

                  <div className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={form.visa_sponsored} onChange={e => setForm(f => ({ ...f, visa_sponsored: e.target.checked }))} className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-gray-700">Visa Sponsored</span>
                    </label>
                  </div>

                  <div className="md:col-span-2">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">
                      {editingScholarship ? 'Update Scholarship' : 'Add Scholarship'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Search */}
            <div className="flex gap-3">
              <input type="text" placeholder="Search scholarships..." value={search}
                onChange={e => { setSearch(e.target.value); loadScholarships(e.target.value); }}
                className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Country</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Type</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Funding</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Featured</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {scholarships.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-xs truncate">{s.title}</td>
                        <td className="px-4 py-3 text-gray-600">{s.country}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full capitalize">{s.type}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${s.funding_type === 'full' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {s.funding_type === 'full' ? 'Full' : s.funding_type}
                          </span>
                        </td>
                        <td className="px-4 py-3">{s.is_featured ? '⭐' : '—'}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => startEdit(s)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                            <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {scholarships.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-10 text-gray-400">No scholarships found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* AUTOMATION TAB */}
        {activeTab === 'automation' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-bold text-gray-900 text-xl">🤖 AI Automation</h2>

            {/* Toggle card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Monthly Auto-Generation</h3>
                  <p className="text-gray-500 text-sm">Automatically generates 5 new scholarships using OpenAI on the 1st of every month.</p>
                  {lastRun && (
                    <p className="text-gray-400 text-xs mt-2">
                      Last run: {new Date(lastRun).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                  )}
                </div>
                <button onClick={() => toggleAuto(!autoEnabled)}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${autoEnabled ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${autoEnabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                {autoEnabled ? '🟢 Enabled — runs on the 1st of every month' : '⏸️ Disabled — no automatic runs'}
              </div>
            </div>

            {/* Manual trigger */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">Run Now</h3>
              <p className="text-gray-500 text-sm mb-4">Manually generate 5 new scholarships immediately using OpenAI. Duplicates are skipped automatically.</p>
              <button onClick={triggerNow} disabled={triggering}
                className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {triggering ? '⏳ Generating...' : '⚡ Generate 5 Scholarships Now'}
              </button>
            </div>

            {/* Info */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-amber-800">
              <h3 className="font-semibold mb-2">ℹ️ How it works</h3>
              <ul className="space-y-1.5">
                <li>• OpenAI generates 5 real scholarship listings each run</li>
                <li>• Duplicates are automatically skipped</li>
                <li>• All generated scholarships are saved as active and approved</li>
                <li>• You can review and edit them in the Scholarships tab</li>
                <li>• Requires a valid OpenAI API key in your Vercel environment variables</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

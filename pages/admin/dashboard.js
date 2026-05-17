// pages/admin/dashboard.js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const OPPORTUNITY_TYPES = [
  { value: 'scholarship', label: '🎓 Scholarship' },
  { value: 'fellowship', label: '🏅 Fellowship' },
  { value: 'internship', label: '💼 Internship' },
  { value: 'conference', label: '🎤 Conference' },
  { value: 'research-grant', label: '🔬 Research Grant' },
  { value: 'exchange-program', label: '✈️ Exchange Program' },
];

const FUNDING_TYPES = [
  { value: 'full', label: 'Fully Funded' },
  { value: 'partial', label: 'Partial Funding' },
  { value: 'paid', label: 'Paid' },
  { value: 'free', label: 'Free to Attend' },
  { value: 'stipend', label: 'Stipend Only' },
];

const DEGREE_LEVELS = [
  { value: 'Bachelors', label: "Bachelor's" },
  { value: 'Masters', label: "Master's" },
  { value: 'PhD', label: 'PhD' },
  { value: 'Postdoc', label: 'Postdoc' },
  { value: 'Non-degree', label: 'Non-degree / Open' },
  { value: 'All', label: 'All Levels' },
];

const emptyForm = {
  title: '', country: '', type: 'scholarship', degree_level: 'Masters',
  funding_type: 'full', amount: '', deadline: '', description: '',
  eligibility: '', benefits: '', subjects: '', host_university: '',
  host_country: '', official_url: '', visa_sponsored: false,
  is_featured: false, is_active: true,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ scholarships: 0, countries: 0, blog_posts: 0, subscribers: 0 });
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [autoPublish, setAutoPublish] = useState(true);
  const [lastRun, setLastRun] = useState(null);
  const [triggering, setTriggering] = useState(false);
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);

  useEffect(() => { loadData(); }, []);

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
      setAutoPublish(settingsData.auto_publish !== '0');
      setLastRun(settingsData.last_auto_run || null);
    } catch {}
    await loadOpportunities();
    setLoading(false);
  }

  async function loadOpportunities(q = '', type = '') {
    const params = new URLSearchParams({ search: q, limit: 100 });
    if (type) params.append('type', type);
    const res = await fetch(`/api/admin/scholarships?${params}`, { credentials: 'include' });
    const data = await res.json();
    setOpportunities(data.scholarships || []);
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { credentials: 'include' });
    router.push('/admin');
  }

  async function saveSetting(key, value) {
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ key, value }),
    });
  }

  async function toggleAuto(val) {
    setAutoEnabled(val);
    await saveSetting('auto_scholarships_enabled', val ? '1' : '0');
    showMsg(val ? '✅ Auto-generation enabled' : '⏸️ Auto-generation disabled', 'success');
  }

  async function toggleAutoPublish(val) {
    setAutoPublish(val);
    await saveSetting('auto_publish', val ? '1' : '0');
    showMsg(val ? '✅ Auto-publish enabled — AI content goes live immediately' : '⏸️ Auto-publish disabled — AI content saved as draft', val ? 'success' : 'info');
  }

  async function triggerNow() {
    setTriggering(true);
    showMsg('⏳ Generating opportunities via OpenAI...', 'info');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trigger_now: true }),
      });
      const data = await res.json();
      if (data.success) {
        showMsg(`✅ Added ${data.added} opportunities, skipped ${data.skipped} duplicates`, 'success');
        loadData();
      } else {
        showMsg(`ℹ️ ${data.message || data.error}`, 'info');
      }
    } catch { showMsg('❌ Error. Check your OpenAI API key in Vercel env vars.', 'error'); }
    setTriggering(false);
  }

  function showMsg(text, type = 'info') {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'info' }), 5000);
  }

  async function handleDelete(id) {
    if (!confirm('Delete this opportunity? This cannot be undone.')) return;
    await fetch(`/api/admin/scholarships/${id}`, { method: 'DELETE', credentials: 'include' });
    showMsg('✅ Deleted successfully', 'success');
    loadOpportunities(search, filterType);
    loadData();
  }

  async function handleToggleActive(item) {
    await fetch(`/api/admin/scholarships/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...item, is_active: item.is_active ? 0 : 1 }),
    });
    loadOpportunities(search, filterType);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `/api/admin/scholarships/${editingItem.id}` : '/api/admin/scholarships';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(form),
    });
    if (res.ok) {
      showMsg(editingItem ? '✅ Updated successfully!' : '✅ Added successfully!', 'success');
      setShowForm(false);
      setEditingItem(null);
      setForm(emptyForm);
      loadOpportunities(search, filterType);
      loadData();
    } else {
      showMsg('❌ Failed to save. Please try again.', 'error');
    }
  }

  async function handleCSVImport() {
    if (!csvData.trim()) return showMsg('Please paste CSV data first', 'error');
    setImporting(true);
    try {
      const res = await fetch('/api/admin/import-csv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ csvData }),
      });
      const data = await res.json();
      if (data.success) {
        showMsg(`✅ Imported ${data.imported} opportunities, skipped ${data.skipped}`, 'success');
        setCsvData('');
        loadData();
        loadOpportunities(search, filterType);
      } else {
        showMsg('❌ Import failed: ' + data.error, 'error');
      }
    } catch { showMsg('❌ Import failed', 'error'); }
    setImporting(false);
  }

  function startEdit(item) {
    setEditingItem(item);
    setForm({ ...item });
    setShowForm(true);
    setActiveTab('manage');
    window.scrollTo(0, 0);
  }

  const filteredOpportunities = opportunities.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.country.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || o.type === filterType;
    return matchSearch && matchType;
  });

  const msgColors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'manage', label: '🎓 Opportunities' },
    { id: 'import', label: '📥 Import' },
    { id: 'automation', label: '🤖 Automation' },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500 text-lg animate-pulse">Loading dashboard...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-green-700 text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌍</span>
          <div>
            <div className="font-bold text-lg leading-tight">ScholarPath Africa</div>
            <div className="text-green-200 text-xs">Admin Panel</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" target="_blank" className="text-green-200 hover:text-white text-sm hidden md:block">View Site ↗</Link>
          <button onClick={handleLogout} className="bg-green-800 hover:bg-green-900 px-4 py-1.5 rounded-lg text-sm transition-colors">
            Logout
          </button>
        </div>
      </div>

      {/* Message bar */}
      {message.text && (
        <div className={`${msgColors[message.type]} text-white text-sm text-center py-2 px-4 transition-all`}>
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b px-6 sticky top-16 z-40">
        <div className="flex gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-green-600 text-green-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="font-bold text-gray-900 text-xl">Dashboard Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Opportunities', value: stats.scholarships, icon: '🎓', color: 'bg-green-50 text-green-700 border-green-200' },
                { label: 'Countries', value: stats.countries, icon: '🌍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'Blog Posts', value: stats.blog_posts, icon: '📝', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                { label: 'Subscribers', value: stats.subscribers, icon: '📧', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              ].map(stat => (
                <div key={stat.label} className={`rounded-2xl border p-5 ${stat.color}`}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium opacity-80 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Opportunity breakdown */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Opportunities by Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {OPPORTUNITY_TYPES.map(t => {
                  const count = opportunities.filter(o => o.type === t.value).length;
                  return (
                    <div key={t.value} className="bg-gray-50 rounded-xl p-3 flex items-center justify-between">
                      <span className="text-sm text-gray-700">{t.label}</span>
                      <span className="font-bold text-gray-900">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: '➕', title: 'Add Opportunity', desc: 'Manually add any type', tab: 'manage', action: () => { setActiveTab('manage'); setShowForm(true); setEditingItem(null); setForm(emptyForm); } },
                { icon: '📥', title: 'Bulk Import', desc: 'CSV import multiple', tab: 'import', action: () => setActiveTab('import') },
                { icon: '🤖', title: 'AI Generate', desc: autoEnabled ? 'Auto-generation on' : 'Auto-generation off', tab: 'automation', action: () => setActiveTab('automation') },
                { icon: '📋', title: 'Manage All', desc: `${opportunities.length} total listings`, tab: 'manage', action: () => setActiveTab('manage') },
              ].map(a => (
                <button key={a.title} onClick={a.action}
                  className="bg-white border-2 border-gray-200 hover:border-green-400 rounded-2xl p-5 text-left transition-all group">
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <div className="font-semibold text-gray-800 group-hover:text-green-700 text-sm">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── MANAGE TAB ── */}
        {activeTab === 'manage' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-gray-900 text-xl">All Opportunities</h2>
              <button onClick={() => { setShowForm(!showForm); setEditingItem(null); setForm(emptyForm); }}
                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                {showForm && !editingItem ? '✕ Cancel' : '+ Add New'}
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-5 text-lg">
                  {editingItem ? `✏️ Edit: ${editingItem.title}` : '➕ Add New Opportunity'}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. Chevening Scholarship 2026"
                      value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type *</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                      {OPPORTUNITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. United Kingdom"
                      value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Funding Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.funding_type} onChange={e => setForm(f => ({ ...f, funding_type: e.target.value }))}>
                      {FUNDING_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Degree Level</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.degree_level} onChange={e => setForm(f => ({ ...f, degree_level: e.target.value }))}>
                      {DEGREE_LEVELS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Amount / Value</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. Full funding, $5,000, Free registration"
                      value={form.amount} onChange={e => setForm(f => ({ ...f, amount: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Deadline</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. November 2025, Ongoing"
                      value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Host University / Organization</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.host_university} onChange={e => setForm(f => ({ ...f, host_university: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Host Country</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={form.host_country} onChange={e => setForm(f => ({ ...f, host_country: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Official URL</label>
                    <input type="url" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="https://..."
                      value={form.official_url} onChange={e => setForm(f => ({ ...f, official_url: e.target.value }))} />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Subjects / Fields</label>
                    <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. All disciplines, Engineering, Health"
                      value={form.subjects} onChange={e => setForm(f => ({ ...f, subjects: e.target.value }))} />
                  </div>

                  {[
                    { key: 'description', label: 'Description', placeholder: 'Brief overview of the opportunity...' },
                    { key: 'eligibility', label: 'Eligibility Requirements', placeholder: 'Who can apply...' },
                    { key: 'benefits', label: 'Benefits / Coverage', placeholder: 'What is funded or provided...' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key} className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                      <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        placeholder={placeholder}
                        value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}

                  <div className="md:col-span-2 flex flex-wrap gap-6">
                    {[
                      { key: 'is_featured', label: '⭐ Featured' },
                      { key: 'visa_sponsored', label: '✈️ Visa Sponsored' },
                      { key: 'is_active', label: '🟢 Published (Live)' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={!!form[key]}
                          onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                          className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="md:col-span-2 flex gap-3">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">
                      {editingItem ? '✅ Update' : '✅ Add Opportunity'}
                    </button>
                    <button type="button" onClick={() => { setShowForm(false); setEditingItem(null); setForm(emptyForm); }}
                      className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <input type="text" placeholder="🔍 Search by title or country..." value={search}
                onChange={e => { setSearch(e.target.value); }}
                className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
              <select value={filterType} onChange={e => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option value="">All Types</option>
                {OPPORTUNITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

            <p className="text-sm text-gray-500">{filteredOpportunities.length} results</p>

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
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredOpportunities.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-xs">
                          <div className="truncate">{item.title}</div>
                          {item.is_featured ? <span className="text-xs text-amber-600">⭐ Featured</span> : null}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.country}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full capitalize whitespace-nowrap">
                            {OPPORTUNITY_TYPES.find(t => t.value === item.type)?.label || item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${item.funding_type === 'full' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {FUNDING_TYPES.find(t => t.value === item.funding_type)?.label || item.funding_type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleToggleActive(item)}
                            className={`text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors ${item.is_active ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'}`}>
                            {item.is_active ? '🟢 Live' : '⚫ Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => startEdit(item)} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredOpportunities.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-12 text-gray-400">No opportunities found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── IMPORT TAB ── */}
        {activeTab === 'import' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-bold text-gray-900 text-xl">📥 Bulk Import</h2>

            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">CSV Import</h3>
              <p className="text-gray-500 text-sm mb-4">Paste CSV data with a header row. Required columns: <code className="bg-gray-100 px-1 rounded">title</code>, <code className="bg-gray-100 px-1 rounded">country</code>. All other columns are optional.</p>

              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-xs text-gray-600 font-mono overflow-x-auto">
                title,country,type,degree_level,funding_type,amount,deadline,description,official_url<br/>
                "Chevening Scholarship","United Kingdom","scholarship","Masters","full","Full funding","November 2025","UK government scholarship","https://chevening.org"
              </div>

              <textarea rows={8} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-green-500 mb-4"
                placeholder="Paste your CSV data here..."
                value={csvData} onChange={e => setCsvData(e.target.value)} />

              <button onClick={handleCSVImport} disabled={importing || !csvData.trim()}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {importing ? '⏳ Importing...' : '📥 Import CSV'}
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 text-sm text-amber-800">
              <h3 className="font-semibold mb-2">📋 All CSV Columns</h3>
              <div className="grid grid-cols-2 gap-1 font-mono text-xs">
                {['title*', 'country*', 'type', 'degree_level', 'funding_type', 'amount', 'deadline', 'description', 'eligibility', 'benefits', 'subjects', 'host_university', 'host_country', 'official_url', 'visa_sponsored', 'is_featured'].map(col => (
                  <span key={col} className={col.includes('*') ? 'font-bold' : ''}>{col}</span>
                ))}
              </div>
              <p className="mt-2 text-xs">* Required. Columns marked with * must be present.</p>
            </div>
          </div>
        )}

        {/* ── AUTOMATION TAB ── */}
        {activeTab === 'automation' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-bold text-gray-900 text-xl">🤖 AI Automation</h2>

            {/* Auto-generation toggle */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Monthly Auto-Generation</h3>
                  <p className="text-gray-500 text-sm">Automatically generates 5 new opportunities using OpenAI on the 1st of every month.</p>
                  {lastRun && (
                    <p className="text-gray-400 text-xs mt-2">Last run: {new Date(lastRun).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
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

            {/* Auto-publish toggle */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">Auto-Publish AI Content</h3>
                  <p className="text-gray-500 text-sm">When enabled, AI-generated opportunities go live immediately. When disabled, they are saved as drafts for you to review first.</p>
                </div>
                <button onClick={() => toggleAutoPublish(!autoPublish)}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${autoPublish ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoPublish ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
              <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${autoPublish ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {autoPublish ? '🟢 Auto-publish ON — goes live immediately' : '📝 Auto-publish OFF — saved as draft for review'}
              </div>
            </div>

            {/* Manual trigger */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">Generate Now</h3>
              <p className="text-gray-500 text-sm mb-4">
                Manually trigger AI generation of 5 new opportunities right now. 
                {autoPublish ? ' They will be published immediately.' : ' They will be saved as drafts for your review.'}
              </p>
              <button onClick={triggerNow} disabled={triggering}
                className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                {triggering ? '⏳ Generating...' : '⚡ Generate 5 Opportunities Now'}
              </button>
            </div>

            {/* Info */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-800">
              <h3 className="font-semibold mb-2">ℹ️ How it works</h3>
              <ul className="space-y-1.5">
                <li>• OpenAI generates a mix of scholarships, fellowships, internships, and conferences</li>
                <li>• Duplicates (same slug) are automatically skipped</li>
                <li>• Review drafts in the Opportunities tab — toggle Live/Draft per item</li>
                <li>• Requires <code className="bg-blue-100 px-1 rounded">OPENAI_API_KEY</code> and <code className="bg-blue-100 px-1 rounded">CRON_SECRET</code> in Vercel env vars</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

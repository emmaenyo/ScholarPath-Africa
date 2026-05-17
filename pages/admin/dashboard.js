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

const BLOG_CATEGORIES = ['Tips', 'Scholarships', 'Visa', 'Destinations', 'Career', 'Application', 'News'];

const emptyOpportunity = {
  title: '', country: '', type: 'scholarship', degree_level: 'Masters',
  funding_type: 'full', amount: '', deadline: '', description: '',
  eligibility: '', benefits: '', subjects: '', host_university: '',
  host_country: '', official_url: '', visa_sponsored: false,
  is_featured: false, is_active: true,
};

const emptyPost = {
  title: '', slug: '', excerpt: '', content: '',
  category: 'Tips', author: 'ScholarPath Team', is_published: false,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({ scholarships: 0, countries: 0, blog_posts: 0, subscribers: 0 });
  const [opportunities, setOpportunities] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');
  const [activeTab, setActiveTab] = useState('overview');
  const [autoScholarships, setAutoScholarships] = useState(true);
  const [autoPosts, setAutoPosts] = useState(true);
  const [autoPublishScholarships, setAutoPublishScholarships] = useState(true);
  const [autoPublishPosts, setAutoPublishPosts] = useState(false);
  const [lastScholarshipRun, setLastScholarshipRun] = useState(null);
  const [lastPostRun, setLastPostRun] = useState(null);
  const [triggering, setTriggering] = useState('');
  const [message, setMessage] = useState({ text: '', type: 'info' });
  const [showOppForm, setShowOppForm] = useState(false);
  const [showPostForm, setShowPostForm] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [oppForm, setOppForm] = useState(emptyOpportunity);
  const [postForm, setPostForm] = useState(emptyPost);
  const [csvData, setCsvData] = useState('');
  const [importing, setImporting] = useState(false);
  const [generatingPost, setGeneratingPost] = useState(false);
  const [postTopic, setPostTopic] = useState('');

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
      setAutoScholarships(settingsData.auto_scholarships_enabled !== '0');
      setAutoPosts(settingsData.auto_posts_enabled !== '0');
      setAutoPublishScholarships(settingsData.auto_publish_scholarships !== '0');
      setAutoPublishPosts(settingsData.auto_publish_posts === '1');
      setLastScholarshipRun(settingsData.last_auto_run || null);
      setLastPostRun(settingsData.last_post_run || null);
    } catch {}
    await Promise.all([loadOpportunities(), loadPosts()]);
    setLoading(false);
  }

  async function loadOpportunities(q = '', type = '') {
    const params = new URLSearchParams({ search: q, limit: 100 });
    if (type) params.append('type', type);
    const res = await fetch(`/api/admin/scholarships?${params}`, { credentials: 'include' });
    const data = await res.json();
    setOpportunities(data.scholarships || []);
  }

  async function loadPosts() {
    const res = await fetch('/api/admin/posts', { credentials: 'include' });
    const data = await res.json();
    setPosts(data.posts || []);
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

  function showMsg(text, type = 'info') {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: 'info' }), 5000);
  }

  async function triggerScholarships() {
    setTriggering('scholarships');
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
      } else showMsg(`ℹ️ ${data.message || data.error}`, 'info');
    } catch { showMsg('❌ Error. Check your OpenAI API key.', 'error'); }
    setTriggering('');
  }

  async function generatePost(topic = '') {
    setGeneratingPost(true);
    showMsg('⏳ Generating blog post via OpenAI...', 'info');
    try {
      const res = await fetch('/api/admin/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ topic, auto_publish: autoPublishPosts }),
      });
      const data = await res.json();
      if (data.success) {
        showMsg(`✅ Blog post "${data.title}" generated!`, 'success');
        setPostTopic('');
        loadPosts();
        loadData();
      } else showMsg(`❌ ${data.error}`, 'error');
    } catch { showMsg('❌ Generation failed. Check OpenAI API key.', 'error'); }
    setGeneratingPost(false);
  }

  async function handleDeleteOpp(id) {
    if (!confirm('Delete this opportunity?')) return;
    await fetch(`/api/admin/scholarships/${id}`, { method: 'DELETE', credentials: 'include' });
    showMsg('✅ Deleted', 'success');
    loadOpportunities(search, filterType);
    loadData();
  }

  async function handleToggleOppActive(item) {
    await fetch(`/api/admin/scholarships/${item.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...item, is_active: item.is_active ? 0 : 1 }),
    });
    loadOpportunities(search, filterType);
  }

  async function handleTogglePost(post) {
    await fetch(`/api/admin/posts/${post.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...post, is_published: post.is_published ? 0 : 1 }),
    });
    loadPosts();
    loadData();
  }

  async function handleDeletePost(id) {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/admin/posts/${id}`, { method: 'DELETE', credentials: 'include' });
    showMsg('✅ Post deleted', 'success');
    loadPosts();
    loadData();
  }

  async function handleOppSubmit(e) {
    e.preventDefault();
    const method = editingOpp ? 'PUT' : 'POST';
    const url = editingOpp ? `/api/admin/scholarships/${editingOpp.id}` : '/api/admin/scholarships';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(oppForm),
    });
    if (res.ok) {
      showMsg(editingOpp ? '✅ Updated!' : '✅ Added!', 'success');
      setShowOppForm(false);
      setEditingOpp(null);
      setOppForm(emptyOpportunity);
      loadOpportunities(search, filterType);
      loadData();
    } else showMsg('❌ Failed to save.', 'error');
  }

  async function handlePostSubmit(e) {
    e.preventDefault();
    const method = editingPost ? 'PUT' : 'POST';
    const url = editingPost ? `/api/admin/posts/${editingPost.id}` : '/api/admin/posts';
    // Auto-generate slug from title if empty
    const slug = postForm.slug || postForm.title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').trim();
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ ...postForm, slug }),
    });
    if (res.ok) {
      showMsg(editingPost ? '✅ Post updated!' : '✅ Post created!', 'success');
      setShowPostForm(false);
      setEditingPost(null);
      setPostForm(emptyPost);
      loadPosts();
      loadData();
    } else showMsg('❌ Failed to save post.', 'error');
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
        showMsg(`✅ Imported ${data.imported}, skipped ${data.skipped}`, 'success');
        setCsvData('');
        loadData();
        loadOpportunities();
      } else showMsg('❌ Import failed: ' + data.error, 'error');
    } catch { showMsg('❌ Import failed', 'error'); }
    setImporting(false);
  }

  const filteredOpps = opportunities.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.country.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || o.type === filterType;
    return matchSearch && matchType;
  });

  const msgColors = { success: 'bg-green-600', error: 'bg-red-600', info: 'bg-blue-600' };

  const tabs = [
    { id: 'overview', label: '📊 Overview' },
    { id: 'opportunities', label: '🎓 Opportunities' },
    { id: 'blog', label: '📝 Blog' },
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
          <button onClick={handleLogout} className="bg-green-800 hover:bg-green-900 px-4 py-1.5 rounded-lg text-sm transition-colors">Logout</button>
        </div>
      </div>

      {message.text && (
        <div className={`${msgColors[message.type]} text-white text-sm text-center py-2 px-4`}>{message.text}</div>
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

        {/* ── OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="font-bold text-gray-900 text-xl">Dashboard Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Opportunities', value: stats.scholarships, icon: '🎓', color: 'bg-green-50 text-green-700 border-green-200' },
                { label: 'Blog Posts', value: stats.blog_posts, icon: '📝', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                { label: 'Countries', value: stats.countries, icon: '🌍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                { label: 'Subscribers', value: stats.subscribers, icon: '📧', color: 'bg-amber-50 text-amber-700 border-amber-200' },
              ].map(stat => (
                <div key={stat.label} className={`rounded-2xl border p-5 ${stat.color}`}>
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm font-medium opacity-80 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { icon: '➕', title: 'Add Opportunity', desc: 'Manual entry', action: () => { setActiveTab('opportunities'); setShowOppForm(true); setEditingOpp(null); setOppForm(emptyOpportunity); } },
                { icon: '✍️', title: 'Write Blog Post', desc: 'Manual post', action: () => { setActiveTab('blog'); setShowPostForm(true); setEditingPost(null); setPostForm(emptyPost); } },
                { icon: '📥', title: 'CSV Import', desc: 'Bulk upload', action: () => setActiveTab('import') },
                { icon: '🤖', title: 'AI Automation', desc: 'Generate content', action: () => setActiveTab('automation') },
              ].map(a => (
                <button key={a.title} onClick={a.action}
                  className="bg-white border-2 border-gray-200 hover:border-green-400 rounded-2xl p-5 text-left transition-all group">
                  <div className="text-2xl mb-2">{a.icon}</div>
                  <div className="font-semibold text-gray-800 group-hover:text-green-700 text-sm">{a.title}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
                </button>
              ))}
            </div>

            {/* Recent posts */}
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Recent Blog Posts</h3>
                <button onClick={() => setActiveTab('blog')} className="text-sm text-green-600 hover:underline">View all →</button>
              </div>
              <div className="space-y-2">
                {posts.slice(0, 5).map(post => (
                  <div key={post.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <div className="text-sm font-medium text-gray-800 truncate max-w-xs">{post.title}</div>
                      <div className="text-xs text-gray-400">{post.category} · {post.author}</div>
                    </div>
                    <button onClick={() => handleTogglePost(post)}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${post.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {post.is_published ? '🟢 Live' : '⚫ Draft'}
                    </button>
                  </div>
                ))}
                {posts.length === 0 && <p className="text-sm text-gray-400 text-center py-4">No blog posts yet</p>}
              </div>
            </div>
          </div>
        )}

        {/* ── OPPORTUNITIES ── */}
        {activeTab === 'opportunities' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-gray-900 text-xl">Opportunities ({filteredOpps.length})</h2>
              <button onClick={() => { setShowOppForm(!showOppForm); setEditingOpp(null); setOppForm(emptyOpportunity); }}
                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                {showOppForm && !editingOpp ? '✕ Cancel' : '+ Add New'}
              </button>
            </div>

            {showOppForm && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-5 text-lg">{editingOpp ? `✏️ Edit: ${editingOpp.title}` : '➕ Add New Opportunity'}</h3>
                <form onSubmit={handleOppSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={oppForm.title} onChange={e => setOppForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={oppForm.type} onChange={e => setOppForm(f => ({ ...f, type: e.target.value }))}>
                      {OPPORTUNITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Country *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={oppForm.country} onChange={e => setOppForm(f => ({ ...f, country: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Funding Type</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={oppForm.funding_type} onChange={e => setOppForm(f => ({ ...f, funding_type: e.target.value }))}>
                      {FUNDING_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Degree Level</label>
                    <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      value={oppForm.degree_level} onChange={e => setOppForm(f => ({ ...f, degree_level: e.target.value }))}>
                      {DEGREE_LEVELS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                    </select>
                  </div>
                  {[
                    { key: 'amount', label: 'Amount / Value', placeholder: 'e.g. Full funding, $5,000' },
                    { key: 'deadline', label: 'Deadline', placeholder: 'e.g. November 2025' },
                    { key: 'host_university', label: 'Host University / Org' },
                    { key: 'host_country', label: 'Host Country' },
                    { key: 'official_url', label: 'Official URL', placeholder: 'https://' },
                    { key: 'subjects', label: 'Subjects / Fields' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        placeholder={placeholder} value={oppForm[key]} onChange={e => setOppForm(f => ({ ...f, [key]: e.target.value }))} />
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
                        value={oppForm[key]} onChange={e => setOppForm(f => ({ ...f, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div className="md:col-span-2 flex flex-wrap gap-6">
                    {[
                      { key: 'is_featured', label: '⭐ Featured' },
                      { key: 'visa_sponsored', label: '✈️ Visa Sponsored' },
                      { key: 'is_active', label: '🟢 Published (Live)' },
                    ].map(({ key, label }) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={!!oppForm[key]} onChange={e => setOppForm(f => ({ ...f, [key]: e.target.checked }))} className="w-4 h-4 text-green-600 rounded" />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>
                  <div className="md:col-span-2 flex gap-3">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">
                      {editingOpp ? '✅ Update' : '✅ Add Opportunity'}
                    </button>
                    <button type="button" onClick={() => { setShowOppForm(false); setEditingOpp(null); }}
                      className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <input type="text" placeholder="🔍 Search..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="flex-1 min-w-48 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500" />
              <select value={filterType} onChange={e => setFilterType(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500">
                <option value="">All Types</option>
                {OPPORTUNITY_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>

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
                    {filteredOpps.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-xs">
                          <div className="truncate">{item.title}</div>
                          {item.is_featured ? <span className="text-xs text-amber-600">⭐ Featured</span> : null}
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{item.country}</td>
                        <td className="px-4 py-3">
                          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full capitalize">
                            {OPPORTUNITY_TYPES.find(t => t.value === item.type)?.label || item.type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${item.funding_type === 'full' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {FUNDING_TYPES.find(t => t.value === item.funding_type)?.label || item.funding_type}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleToggleOppActive(item)}
                            className={`text-xs px-2 py-0.5 rounded-full cursor-pointer transition-colors ${item.is_active ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'}`}>
                            {item.is_active ? '🟢 Live' : '⚫ Draft'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => { setEditingOpp(item); setOppForm({ ...item }); setShowOppForm(true); window.scrollTo(0, 0); }} className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                            <button onClick={() => handleDeleteOpp(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredOpps.length === 0 && (
                      <tr><td colSpan={6} className="text-center py-12 text-gray-400">No opportunities found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── BLOG ── */}
        {activeTab === 'blog' && (
          <div className="space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-bold text-gray-900 text-xl">Blog Posts ({posts.length})</h2>
              <button onClick={() => { setShowPostForm(!showPostForm); setEditingPost(null); setPostForm(emptyPost); }}
                className="bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-green-700 transition-colors">
                {showPostForm && !editingPost ? '✕ Cancel' : '✍️ Write New Post'}
              </button>
            </div>

            {/* Write/Edit Post Form */}
            {showPostForm && (
              <div className="bg-white rounded-2xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-5 text-lg">{editingPost ? `✏️ Edit Post` : '✍️ Write New Blog Post'}</h3>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Title *</label>
                    <input required type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="e.g. How to Write a Winning Chevening Essay"
                      value={postForm.title} onChange={e => setPostForm(f => ({ ...f, title: e.target.value }))} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Category</label>
                      <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        value={postForm.category} onChange={e => setPostForm(f => ({ ...f, category: e.target.value }))}>
                        {BLOG_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Author</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        value={postForm.author} onChange={e => setPostForm(f => ({ ...f, author: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Slug (auto-generated if empty)</label>
                      <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                        placeholder="url-friendly-slug"
                        value={postForm.slug} onChange={e => setPostForm(f => ({ ...f, slug: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Excerpt / Summary</label>
                    <textarea rows={2} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                      placeholder="Brief description shown on blog listing page..."
                      value={postForm.excerpt} onChange={e => setPostForm(f => ({ ...f, excerpt: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">Content *</label>
                    <textarea required rows={12} className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 font-mono"
                      placeholder="Write your blog post here. You can use ## for headings, **bold**, *italic*, and - for bullet points."
                      value={postForm.content} onChange={e => setPostForm(f => ({ ...f, content: e.target.value }))} />
                    <p className="text-xs text-gray-400 mt-1">Supports basic markdown: ## Heading, **bold**, *italic*, - bullet</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!postForm.is_published} onChange={e => setPostForm(f => ({ ...f, is_published: e.target.checked }))} className="w-4 h-4 text-green-600 rounded" />
                      <span className="text-sm text-gray-700">🟢 Publish immediately (live on site)</span>
                    </label>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 transition-colors">
                      {editingPost ? '✅ Update Post' : postForm.is_published ? '🟢 Publish Post' : '💾 Save as Draft'}
                    </button>
                    <button type="button" onClick={() => { setShowPostForm(false); setEditingPost(null); }}
                      className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 transition-colors">Cancel</button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Title</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Category</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Author</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {posts.map(post => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-xs">
                          <div className="truncate">{post.title}</div>
                          <div className="text-xs text-gray-400 truncate">{post.excerpt}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{post.category}</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 text-xs">{post.author}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => handleTogglePost(post)}
                            className={`text-xs px-3 py-1 rounded-full cursor-pointer font-medium transition-colors ${post.is_published ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-600' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'}`}>
                            {post.is_published ? '🟢 Live — click to unpublish' : '⚫ Draft — click to publish'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => { setEditingPost(post); setPostForm({ ...post }); setShowPostForm(true); window.scrollTo(0, 0); }}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium">Edit</button>
                            <Link href={`/blog/${post.slug}`} target="_blank" className="text-green-600 hover:text-green-800 text-xs font-medium">View</Link>
                            <button onClick={() => handleDeletePost(post.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {posts.length === 0 && (
                      <tr><td colSpan={5} className="text-center py-12 text-gray-400">No blog posts yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── IMPORT ── */}
        {activeTab === 'import' && (
          <div className="space-y-6 max-w-3xl">
            <h2 className="font-bold text-gray-900 text-xl">📥 Bulk Import</h2>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-2">CSV Import</h3>
              <p className="text-gray-500 text-sm mb-4">Paste CSV with a header row. Required: <code className="bg-gray-100 px-1 rounded">title</code>, <code className="bg-gray-100 px-1 rounded">country</code>.</p>
              <div className="bg-gray-50 rounded-xl p-4 mb-4 text-xs text-gray-600 font-mono overflow-x-auto">
                title,country,type,degree_level,funding_type,amount,deadline,description,official_url<br/>
                "Chevening Scholarship","United Kingdom","scholarship","Masters","full","Full funding","November 2025","UK govt scholarship","https://chevening.org"
              </div>
              <textarea rows={8} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-green-500 mb-4"
                placeholder="Paste CSV data here..." value={csvData} onChange={e => setCsvData(e.target.value)} />
              <button onClick={handleCSVImport} disabled={importing || !csvData.trim()}
                className="bg-green-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-green-700 disabled:opacity-50 transition-colors">
                {importing ? '⏳ Importing...' : '📥 Import CSV'}
              </button>
            </div>
          </div>
        )}

        {/* ── AUTOMATION ── */}
        {activeTab === 'automation' && (
          <div className="space-y-6 max-w-2xl">
            <h2 className="font-bold text-gray-900 text-xl">🤖 AI Automation</h2>

            {/* Opportunities automation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">🎓 Opportunity Generation</h3>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-800">Monthly Auto-Generation</div>
                  <div className="text-sm text-gray-500">Generate 5 new opportunities on the 1st of every month</div>
                  {lastScholarshipRun && <div className="text-xs text-gray-400 mt-1">Last run: {new Date(lastScholarshipRun).toLocaleDateString()}</div>}
                </div>
                <button onClick={() => { setAutoScholarships(!autoScholarships); saveSetting('auto_scholarships_enabled', !autoScholarships ? '1' : '0'); }}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${autoScholarships ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoScholarships ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-800">Auto-Publish Opportunities</div>
                  <div className="text-sm text-gray-500">Go live immediately, or save as draft for review</div>
                </div>
                <button onClick={() => { setAutoPublishScholarships(!autoPublishScholarships); saveSetting('auto_publish_scholarships', !autoPublishScholarships ? '1' : '0'); }}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${autoPublishScholarships ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoPublishScholarships ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <button onClick={triggerScholarships} disabled={triggering === 'scholarships'}
                className="bg-green-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 transition-colors text-sm">
                {triggering === 'scholarships' ? '⏳ Generating...' : '⚡ Generate 5 Opportunities Now'}
              </button>
            </div>

            {/* Blog automation */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
              <h3 className="font-semibold text-gray-900 text-lg border-b border-gray-100 pb-3">📝 Blog Post Generation</h3>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-800">Monthly Auto-Posts</div>
                  <div className="text-sm text-gray-500">Generate 1 SEO-optimised blog post on the 1st of every month</div>
                  {lastPostRun && <div className="text-xs text-gray-400 mt-1">Last run: {new Date(lastPostRun).toLocaleDateString()}</div>}
                </div>
                <button onClick={() => { setAutoPosts(!autoPosts); saveSetting('auto_posts_enabled', !autoPosts ? '1' : '0'); }}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${autoPosts ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoPosts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-medium text-gray-800">Auto-Publish Blog Posts</div>
                  <div className="text-sm text-gray-500 text-amber-600 font-medium">⚠️ Recommended OFF — review AI posts before publishing</div>
                </div>
                <button onClick={() => { setAutoPublishPosts(!autoPublishPosts); saveSetting('auto_publish_posts', !autoPublishPosts ? '1' : '0'); }}
                  className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${autoPublishPosts ? 'bg-green-600' : 'bg-gray-300'}`}>
                  <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ${autoPublishPosts ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Generate post with optional topic */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="font-medium text-gray-800 text-sm">Generate a Blog Post Now</div>
                <input type="text" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500"
                  placeholder="Optional topic e.g. 'How to get a Chevening scholarship' (leave blank for AI to choose a high-traffic topic)"
                  value={postTopic} onChange={e => setPostTopic(e.target.value)} />
                <div className="flex gap-3">
                  <button onClick={() => generatePost(postTopic)} disabled={generatingPost}
                    className="bg-purple-600 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-purple-700 disabled:opacity-50 transition-colors text-sm">
                    {generatingPost ? '⏳ Writing post...' : '✍️ Generate Post Now'}
                  </button>
                  {postTopic && (
                    <button onClick={() => setPostTopic('')} className="text-gray-500 text-sm hover:text-gray-700">Clear topic</button>
                  )}
                </div>
                <p className="text-xs text-gray-400">
                  {autoPublishPosts ? 'Post will go live immediately' : 'Post will be saved as draft — review it in the Blog tab before publishing'}
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-800">
              <h3 className="font-semibold mb-2">ℹ️ About AI Blog Posts</h3>
              <ul className="space-y-1.5">
                <li>• Posts focus on high-search topics: scholarship tips, visa guides, country guides, application advice</li>
                <li>• Each post is 600-900 words, SEO-optimised with relevant keywords</li>
                <li>• You can edit any generated post in the Blog tab before publishing</li>
                <li>• Requires <code className="bg-blue-100 px-1 rounded">OPENAI_API_KEY</code> in Vercel environment variables</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

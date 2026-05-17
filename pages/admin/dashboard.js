// pages/admin/dashboard.js
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState(null)
  const [scholarships, setScholarships] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('scholarships')
  const [editingId, setEditingId] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)

  const emptyForm = {
    title: '', country: '', country_code: '', host_university: '', degree_level: 'masters',
    type: 'scholarship', funding_type: 'fully_funded', deadline: '', deadline_date: '',
    description: '', eligibility: '', benefits: '', subjects: '', apply_link: '',
    official_website: '', visa_sponsored: 0, open_to_africans: 1, is_featured: 0,
  }
  const [form, setForm] = useState(emptyForm)
  const [formMsg, setFormMsg] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [statsRes, scholRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${getCookie('admin_token')}` } }),
        fetch('/api/admin/scholarships', { headers: { Authorization: `Bearer ${getCookie('admin_token')}` } }),
      ])
      if (statsRes.status === 401 || scholRes.status === 401) {
        router.push('/admin')
        return
      }
      const [statsData, scholData] = await Promise.all([statsRes.json(), scholRes.json()])
      setStats(statsData)
      setScholarships(scholData.items || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }

  function getCookie(name) {
    if (typeof document === 'undefined') return ''
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
    return match ? match[2] : ''
  }

  function logout() {
    document.cookie = 'admin_token=; path=/; max-age=0'
    router.push('/admin')
  }

  function handle(e) {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 1 : 0) : value }))
  }

  async function saveScholarship(e) {
    e.preventDefault()
    setFormMsg('')
    const method = editingId ? 'PUT' : 'POST'
    const url = editingId ? `/api/admin/scholarships/${editingId}` : '/api/admin/scholarships'
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getCookie('admin_token')}` },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      setFormMsg('✅ Saved successfully!')
      setForm(emptyForm)
      setEditingId(null)
      setShowAddForm(false)
      fetchData()
    } else {
      const d = await res.json()
      setFormMsg('❌ Error: ' + (d.error || 'Save failed'))
    }
  }

  async function deleteScholarship(id) {
    if (!confirm('Delete this scholarship?')) return
    await fetch(`/api/admin/scholarships/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getCookie('admin_token')}` },
    })
    fetchData()
  }

  function startEdit(s) {
    setForm({ ...s })
    setEditingId(s.id)
    setShowAddForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-gray-500">Loading admin panel...</p>
      </div>
    </div>
  )

  return (
    <>
      <Head><title>Admin Dashboard | ScholarPath Africa</title></Head>
      <div className="min-h-screen bg-gray-50">
        {/* Admin header */}
        <header className="bg-dark-900 text-white px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-white">S</div>
            <span className="font-heading font-bold">ScholarPath Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-gray-300 hover:text-white text-sm">View Site →</Link>
            <button onClick={logout} className="text-gray-300 hover:text-white text-sm">Sign Out</button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Scholarships', value: stats.scholarships, icon: '🎓' },
                { label: 'Countries', value: stats.countries, icon: '🌍' },
                { label: 'Blog Posts', value: stats.blogPosts, icon: '📝' },
                { label: 'Subscribers', value: stats.subscribers, icon: '📬' },
              ].map(s => (
                <div key={s.label} className="card p-4 text-center">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                  <div className="text-xs text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Add/Edit form */}
          {showAddForm && (
            <div className="card p-6 mb-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-bold text-gray-900">
                  {editingId ? '✏️ Edit Scholarship' : '➕ Add Scholarship'}
                </h2>
                <button onClick={() => { setShowAddForm(false); setEditingId(null); setForm(emptyForm) }}
                  className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
              </div>

              {formMsg && (
                <div className={`rounded-xl px-4 py-3 text-sm mb-4 ${formMsg.startsWith('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {formMsg}
                </div>
              )}

              <form onSubmit={saveScholarship} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input name="title" value={form.title} onChange={handle} required className="input" placeholder="Scholarship title" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country *</label>
                    <input name="country" value={form.country} onChange={handle} required className="input" placeholder="e.g. Canada" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Host University</label>
                    <input name="host_university" value={form.host_university} onChange={handle} className="input" placeholder="e.g. University of Toronto" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                    <select name="type" value={form.type} onChange={handle} className="select">
                      <option value="scholarship">Scholarship</option>
                      <option value="fellowship">Fellowship</option>
                      <option value="internship">Internship</option>
                      <option value="exchange-program">Exchange Program</option>
                      <option value="research-grant">Research Grant</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Degree Level *</label>
                    <select name="degree_level" value={form.degree_level} onChange={handle} className="select">
                      <option value="bachelors">Bachelor's</option>
                      <option value="masters">Master's</option>
                      <option value="phd">PhD</option>
                      <option value="postdoc">Postdoc</option>
                      <option value="all">All Levels</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Funding Type *</label>
                    <select name="funding_type" value={form.funding_type} onChange={handle} className="select">
                      <option value="fully_funded">Fully Funded</option>
                      <option value="partial">Partial</option>
                      <option value="paid">Paid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline (text)</label>
                    <input name="deadline" value={form.deadline} onChange={handle} className="input" placeholder="e.g. November each year" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Apply Link *</label>
                    <input name="apply_link" value={form.apply_link} onChange={handle} required type="url" className="input" placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea name="description" value={form.description} onChange={handle} required rows={4} className="input" placeholder="Full description of the scholarship..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
                    <textarea name="eligibility" value={form.eligibility} onChange={handle} rows={3} className="input" placeholder="Who can apply?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                    <textarea name="benefits" value={form.benefits} onChange={handle} rows={3} className="input" placeholder="What does it cover?" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjects</label>
                    <input name="subjects" value={form.subjects} onChange={handle} className="input" placeholder="e.g. Engineering, Medicine, Law" />
                  </div>
                  <div className="flex gap-6 items-center">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="visa_sponsored" checked={form.visa_sponsored === 1} onChange={handle} className="w-4 h-4 rounded text-brand-600" />
                      <span className="text-sm font-medium text-gray-700">Visa Sponsored</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" name="is_featured" checked={form.is_featured === 1} onChange={handle} className="w-4 h-4 rounded text-brand-600" />
                      <span className="text-sm font-medium text-gray-700">Featured</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="btn-primary">
                    {editingId ? '💾 Update Scholarship' : '➕ Add Scholarship'}
                  </button>
                  <button type="button" onClick={() => { setShowAddForm(false); setEditingId(null); setForm(emptyForm) }} className="btn-outline">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Scholarships table */}
          <div className="card">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-heading font-semibold text-lg text-gray-900">Scholarships ({scholarships.length})</h2>
              <button onClick={() => { setShowAddForm(true); setEditingId(null); setForm(emptyForm) }}
                className="btn-primary text-sm py-2">
                + Add Scholarship
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    {['Title', 'Country', 'Type', 'Funding', 'Deadline', 'Featured', 'Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-medium text-gray-600 text-xs uppercase tracking-wide">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {scholarships.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900 max-w-xs truncate">{s.title}</div>
                        <div className="text-xs text-gray-400">{s.host_university}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{s.country}</td>
                      <td className="px-4 py-3">
                        <span className="badge-blue capitalize">{s.type}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={s.funding_type === 'fully_funded' ? 'badge-green' : 'badge-gold'}>
                          {s.funding_type === 'fully_funded' ? 'Full' : 'Partial'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{s.deadline || '—'}</td>
                      <td className="px-4 py-3">{s.is_featured === 1 ? '⭐' : '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(s)} className="text-brand-600 hover:underline text-xs font-medium">Edit</button>
                          <button onClick={() => deleteScholarship(s.id)} className="text-red-500 hover:underline text-xs font-medium">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CSV Import */}
          <div className="card p-6 mt-6">
            <h2 className="font-heading font-semibold text-lg text-gray-900 mb-3">📤 CSV Import</h2>
            <p className="text-sm text-gray-500 mb-4">Import scholarships in bulk via CSV. Download template first.</p>
            <CSVImport token={typeof document !== 'undefined' ? getCookie('admin_token') : ''} onSuccess={fetchData} />
          </div>
        </div>
      </div>
    </>
  )
}

function CSVImport({ token, onSuccess }) {
  const [file, setFile] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  function downloadTemplate() {
    const headers = ['title', 'country', 'country_code', 'host_university', 'degree_level', 'type', 'funding_type', 'deadline', 'description', 'eligibility', 'benefits', 'apply_link', 'visa_sponsored', 'is_featured']
    const example = ['DAAD Scholarship', 'Germany', 'DE', 'Various', 'masters', 'scholarship', 'fully_funded', 'October each year', 'Full description here', 'Eligibility criteria', 'Benefits covered', 'https://daad.de', '1', '0']
    const csv = [headers.join(','), example.join(',')].join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'scholarships_template.csv'
    a.click()
  }

  async function handleUpload() {
    if (!file) return
    setLoading(true)
    const data = new FormData()
    data.append('file', file)
    const res = await fetch('/api/admin/import-csv', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: data,
    })
    const result = await res.json()
    if (res.ok) {
      setMsg(`✅ Imported ${result.imported} scholarships`)
      onSuccess()
    } else {
      setMsg('❌ Import failed: ' + (result.error || 'Unknown error'))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button onClick={downloadTemplate} className="btn-outline text-sm">📥 Download Template</button>
      <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} className="text-sm text-gray-600" />
      {file && (
        <button onClick={handleUpload} disabled={loading} className="btn-primary text-sm py-2">
          {loading ? 'Importing...' : '📤 Import CSV'}
        </button>
      )}
      {msg && <span className="text-sm text-gray-600">{msg}</span>}
    </div>
  )
}

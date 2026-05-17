// pages/admin/automation.js
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminAutomation() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [triggering, setTriggering] = useState(false);
  const [message, setMessage] = useState('');
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    fetch('/api/admin/settings', { credentials: 'include' })
      .then(r => r.json())
      .then(data => {
        setSettings(data);
        setEnabled(data.auto_scholarships_enabled !== '0');
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function toggleAutoScholarships(val) {
    setEnabled(val);
    await fetch('/api/admin/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ key: 'auto_scholarships_enabled', value: val ? '1' : '0' }),
    });
    setMessage(val ? '✅ Auto-generation enabled' : '⏸️ Auto-generation disabled');
    setTimeout(() => setMessage(''), 3000);
  }

  async function triggerNow() {
    setTriggering(true);
    setMessage('⏳ Generating scholarships via OpenAI...');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ trigger_now: true }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage(`✅ Done! Added ${data.added} scholarships, skipped ${data.skipped} duplicates.`);
      } else {
        setMessage(`ℹ️ ${data.message || data.error}`);
      }
    } catch (e) {
      setMessage('❌ Error triggering generation. Check your OpenAI API key.');
    }
    setTriggering(false);
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">Loading...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-bold text-gray-900 text-lg">🤖 Automation Settings</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-10 space-y-6">

        {message && (
          <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-xl px-5 py-3 text-sm">
            {message}
          </div>
        )}

        {/* Auto-generation toggle */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg mb-1">Monthly Auto-Generation</h2>
              <p className="text-gray-500 text-sm">
                Automatically generates 5 new scholarships using OpenAI on the 1st of every month.
              </p>
              <p className="text-gray-400 text-xs mt-2">
                Last run: {settings.last_auto_run ? new Date(settings.last_auto_run).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Never'}
              </p>
            </div>
            <button
              onClick={() => toggleAutoScholarships(!enabled)}
              className={`relative inline-flex h-7 w-12 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${enabled ? 'bg-green-600' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow transition duration-200 ease-in-out ${enabled ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
          </div>

          <div className={`mt-4 px-4 py-2 rounded-lg text-sm font-medium inline-flex items-center gap-2 ${enabled ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
            {enabled ? '🟢 Enabled — runs on the 1st of every month' : '⏸️ Disabled — no automatic runs'}
          </div>
        </div>

        {/* Manual trigger */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 text-lg mb-1">Run Now</h2>
          <p className="text-gray-500 text-sm mb-4">
            Manually trigger the AI scholarship generator. This will add up to 5 new scholarships immediately regardless of the toggle above.
          </p>
          <button
            onClick={triggerNow}
            disabled={triggering}
            className="bg-green-600 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
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
            <li>• You can review and edit them from the Dashboard</li>
            <li>• Requires a valid OpenAI API key in your environment variables</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

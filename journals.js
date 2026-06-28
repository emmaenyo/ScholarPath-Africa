// pages/journals.js
import { useState } from 'react'
import Layout from '../components/layout/Layout'
import Link from 'next/link'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarpathafrica.com'

const journals = {
  open_access: [
    { name: 'African Journal of Science, Technology, Innovation and Development', abbr: 'AJSTID', publisher: 'Taylor & Francis', url: 'https://www.tandfonline.com/journals/rajs20', subjects: 'STEM, Innovation', impact: 'Q2', description: 'Peer-reviewed journal covering science, technology and development in Africa.' },
    { name: 'PLOS ONE', abbr: 'PLOS ONE', publisher: 'Public Library of Science', url: 'https://journals.plos.org/plosone', subjects: 'All disciplines', impact: 'Q1', description: 'Multidisciplinary open-access journal with no subject barriers.' },
    { name: 'African Development Review', abbr: 'ADR', publisher: 'Wiley / AfDB', url: 'https://onlinelibrary.wiley.com/journal/14678268', subjects: 'Economics, Development', impact: 'Q2', description: 'Publication of the African Development Bank on economic development.' },
    { name: 'Journal of African Studies', abbr: 'JAS', publisher: 'Cambridge University Press', url: 'https://www.cambridge.org/core/journals/journal-of-african-studies', subjects: 'Social Sciences, Humanities', impact: 'Q2', description: 'Covers contemporary African politics, society, and culture.' },
    { name: 'BMC Public Health', abbr: 'BMC', publisher: 'BioMed Central', url: 'https://bmcpublichealth.biomedcentral.com', subjects: 'Public Health, Medicine', impact: 'Q1', description: 'Open access journal covering all aspects of public health research.' },
    { name: 'African Journal of Ecology', abbr: 'AJE', publisher: 'Wiley', url: 'https://onlinelibrary.wiley.com/journal/13652028', subjects: 'Ecology, Environment', impact: 'Q2', description: 'Research on African ecosystems, wildlife and environmental conservation.' },
    { name: 'Cogent Education', abbr: 'CE', publisher: 'Taylor & Francis', url: 'https://www.tandfonline.com/journals/oaed20', subjects: 'Education', impact: 'Q3', description: 'Open access education research across all disciplines and levels.' },
    { name: 'AOSIS Journals', abbr: 'AOSIS', publisher: 'AOSIS', url: 'https://aosis.co.za/journals', subjects: 'All disciplines (Africa focus)', impact: 'Various', description: 'Africa-based open access publisher with 30+ peer-reviewed journals.' },
  ],
  paid: [
    { name: 'Nature', abbr: 'Nature', publisher: 'Springer Nature', url: 'https://nature.com', subjects: 'Multidisciplinary', impact: 'Q1 — IF: 69.5', description: 'World\'s most prestigious multidisciplinary science journal.' },
    { name: 'The Lancet', abbr: 'Lancet', publisher: 'Elsevier', url: 'https://thelancet.com', subjects: 'Medicine, Global Health', impact: 'Q1 — IF: 168.9', description: 'Leading global medical journal with strong Africa coverage.' },
    { name: 'World Development', abbr: 'WD', publisher: 'Elsevier', url: 'https://journals.elsevier.com/world-development', subjects: 'Development Economics', impact: 'Q1', description: 'Interdisciplinary research on economic and social development.' },
    { name: 'Journal of African Economies', abbr: 'JAE', publisher: 'Oxford University Press', url: 'https://academic.oup.com/jae', subjects: 'Economics, Africa', impact: 'Q2', description: 'Dedicated to the study of African economic challenges and policies.' },
    { name: 'African Affairs', abbr: 'AA', publisher: 'Oxford University Press', url: 'https://academic.oup.com/afraf', subjects: 'Politics, International Relations', impact: 'Q1', description: 'Journal of the Royal African Society on African politics and society.' },
    { name: 'Lancet Global Health', abbr: 'LGH', publisher: 'Elsevier', url: 'https://thelancet.com/journals/langlo/home', subjects: 'Global Health', impact: 'Q1 — IF: 34.3', description: 'Leading journal on global health equity and practice.' },
    { name: 'Energy for Sustainable Development', abbr: 'ESD', publisher: 'Elsevier', url: 'https://journals.elsevier.com/energy-for-sustainable-development', subjects: 'Energy, Sustainability', impact: 'Q1', description: 'Research on energy access and sustainable development in Africa and globally.' },
  ],
  preprint: [
    { name: 'AfricArXiv', abbr: 'AfricArXiv', publisher: 'Center for Open Science', url: 'https://africarxiv.org', subjects: 'All disciplines (Africa focus)', impact: 'Preprint', description: 'Free preprint server specifically for African researchers to share early findings.' },
    { name: 'medRxiv', abbr: 'medRxiv', publisher: 'Cold Spring Harbor Laboratory', url: 'https://medrxiv.org', subjects: 'Medicine, Health Sciences', impact: 'Preprint', description: 'Preprint server for health sciences research — free to submit and read.' },
    { name: 'arXiv', abbr: 'arXiv', publisher: 'Cornell University', url: 'https://arxiv.org', subjects: 'Physics, Maths, CS, Economics', impact: 'Preprint', description: 'The world\'s most popular open preprint server for STEM disciplines.' },
    { name: 'SSRN', abbr: 'SSRN', publisher: 'Elsevier', url: 'https://ssrn.com', subjects: 'Social Sciences, Law, Economics', impact: 'Preprint', description: 'Leading preprint repository for social sciences and humanities research.' },
    { name: 'bioRxiv', abbr: 'bioRxiv', publisher: 'Cold Spring Harbor Laboratory', url: 'https://biorxiv.org', subjects: 'Biology, Life Sciences', impact: 'Preprint', description: 'Free preprint server for biological sciences research.' },
  ],
}

const conferences = {
  upcoming: [
    { name: 'African Union Science, Technology and Innovation Summit', location: 'Addis Ababa, Ethiopia', date: 'Quarterly', funded: true, url: 'https://au.int', subjects: 'Science, Technology, Innovation', description: 'AU summit bringing together African scientists, policymakers, and innovators.', deadline: 'Check website' },
    { name: 'IEEE AFRICON', location: 'Rotating African Cities', date: 'Biennial', funded: true, url: 'https://ieee.org/africon', subjects: 'Engineering, Technology', description: 'Premier IEEE conference for engineers and technologists across Africa.', deadline: 'Check website' },
    { name: 'African Studies Association Annual Meeting', location: 'USA (rotating)', date: 'November annually', funded: true, url: 'https://africanstudies.org/annual-meeting', subjects: 'African Studies, Social Sciences', description: 'Largest gathering of African studies scholars worldwide with travel grants available.', deadline: 'April annually' },
    { name: 'International Conference on African Development', location: 'Various', date: 'Annually', funded: true, url: 'https://icad-africa.org', subjects: 'Development, Economics, Policy', description: 'Conference on sustainable development and policy in Africa with funded participation.', deadline: 'Check website' },
    { name: 'TWAS General Conference', location: 'Rotating globally', date: 'Biennial', funded: true, url: 'https://twas.org', subjects: 'Science, Technology', description: 'World Academy of Sciences conference with fellowships for African scientists.', deadline: 'Check website' },
    { name: 'African Conference on Computational Biology', location: 'Rotating African Cities', date: 'Annually', funded: true, url: 'https://asbcb.org', subjects: 'Bioinformatics, Computational Biology', description: 'Leading computational biology conference in Africa with full travel grants.', deadline: 'March annually' },
    { name: 'International Conference on Emerging Economies', location: 'Nairobi, Kenya', date: 'Annually', funded: false, url: 'https://icee-conference.org', subjects: 'Economics, Business, Finance', description: 'Conference on economic growth and development in emerging economies.', deadline: 'Check website' },
    { name: 'Global Health Security Conference', location: 'Various', date: 'Annually', funded: true, url: 'https://ghsconference.org', subjects: 'Public Health, Global Health', description: 'International conference on health security with African participation grants.', deadline: 'Check website' },
  ],
  funded: [
    { name: 'NextEinstein Forum', location: 'Kigali, Rwanda', date: 'Biennial', url: 'https://nef.org', subjects: 'Science, Technology, Innovation', description: 'Africa\'s premier science conference, fully funded for selected African scientists.', grant: 'Full travel + accommodation' },
    { name: 'African Leadership Conference', location: 'London / Nairobi', date: 'Annually', url: 'https://africaleadershipconference.com', subjects: 'Leadership, Business, Policy', description: 'Fully funded for selected African leaders across sectors.', grant: 'Full travel grant available' },
    { name: 'YALI Regional Leadership Center Summit', location: 'Accra / Nairobi / Dakar / Johannesburg', date: 'Quarterly', url: 'https://yali.state.gov', subjects: 'Leadership, Entrepreneurship, Civic Engagement', description: 'YALI summits across Africa fully fund selected young leaders.', grant: 'Full funding for fellows' },
    { name: 'World Economic Forum on Africa', location: 'Cape Town / Durban', date: 'Annually', url: 'https://weforum.org/events/africa', subjects: 'Economics, Policy, Business', description: 'WEF Africa event with scholarships for young African leaders.', grant: 'Scholarship grants available' },
    { name: 'African Science Week', location: 'Various African Cities', date: 'Annually', url: 'https://africanscienceweek.org', subjects: 'All Sciences', description: 'Pan-African science festival with funded participation for students and researchers.', grant: 'Travel grants available' },
    { name: 'International AIDS Conference', location: 'Rotating globally', date: 'Biennial', url: 'https://aids2024.org', subjects: 'HIV/AIDS, Public Health', description: 'World\'s largest HIV conference with scholarship programme for African participants.', grant: 'Full scholarship programme' },
    { name: 'COP Climate Conference', location: 'Rotating globally', date: 'Annually', url: 'https://unfccc.int/cop', subjects: 'Climate Change, Environment', description: 'UN climate conference with observer accreditation and grant opportunities for African researchers.', grant: 'Travel grants via UNFCCC' },
  ],
}

const resources = [
  { category: 'Research Databases', icon: '📚', items: [
    { name: 'Google Scholar', url: 'https://scholar.google.com', desc: 'Free academic search engine covering most disciplines' },
    { name: 'JSTOR', url: 'https://jstor.org', desc: 'Digital library of academic journals — free access for developing countries via JSTOR Global Plants' },
    { name: 'Research4Life', url: 'https://www.research4life.org', desc: 'Free access to 21,000+ journals for institutions in low-income countries' },
    { name: 'Unpaywall', url: 'https://unpaywall.org', desc: 'Browser extension to find free legal versions of paywalled papers' },
    { name: 'Sci-Hub alternative — Open Access Button', url: 'https://openaccessbutton.org', desc: 'Legally find free versions of research papers' },
    { name: 'African Journals Online (AJOL)', url: 'https://ajol.info', desc: 'Largest online library of peer-reviewed African-published journals' },
  ]},
  { category: 'Writing & Publishing Tools', icon: '✍️', items: [
    { name: 'Mendeley', url: 'https://mendeley.com', desc: 'Free reference manager and academic social network' },
    { name: 'Zotero', url: 'https://zotero.org', desc: 'Free, open-source reference management software' },
    { name: 'Grammarly', url: 'https://grammarly.com', desc: 'AI writing assistant for grammar and clarity' },
    { name: 'Scimago Journal Rankings', url: 'https://scimagojr.com', desc: 'Check journal impact factor and quartile ranking before submitting' },
    { name: 'Think Check Submit', url: 'https://thinkchecksubmit.org', desc: 'Checklist to identify legitimate journals and avoid predatory publishers' },
    { name: 'Predatory Journal Checker', url: 'https://beallslist.net', desc: 'List of potentially predatory journals to avoid' },
  ]},
  { category: 'Funding & Grants', icon: '💰', items: [
    { name: 'Grants.gov', url: 'https://grants.gov', desc: 'US government grants database — open to international applicants' },
    { name: 'TWAS Fellowships', url: 'https://twas.org/opportunities', desc: 'Research fellowships for scientists from developing countries' },
    { name: 'NIH Fogarty International', url: 'https://fic.nih.gov/Grants', desc: 'US NIH funding for global health research in Africa' },
    { name: 'Wellcome Trust Grants', url: 'https://wellcome.org/grant-funding', desc: 'Major funder of biomedical research in Africa' },
    { name: 'Bill & Melinda Gates Foundation Grants', url: 'https://gatesfoundation.org/about/how-we-work/grants', desc: 'Health and development funding with strong Africa focus' },
    { name: 'NRF South Africa Grants', url: 'https://nrf.ac.za/funding', desc: 'South African national research foundation funding opportunities' },
  ]},
  { category: 'Career & Networking', icon: '🌐', items: [
    { name: 'Academia.edu', url: 'https://academia.edu', desc: 'Platform to share research papers and connect with academics' },
    { name: 'ResearchGate', url: 'https://researchgate.net', desc: 'Professional network for scientists and researchers' },
    { name: 'ORCID', url: 'https://orcid.org', desc: 'Create your unique researcher identifier — essential for publications' },
    { name: 'LinkedIn for Academics', url: 'https://linkedin.com', desc: 'Professional networking including academic and research communities' },
    { name: 'African Science community', url: 'https://africansciencecommunity.org', desc: 'Network for African scientists across the diaspora and continent' },
    { name: 'GlobeSt Research Network', url: 'https://globest.com', desc: 'International research collaboration platform' },
  ]},
]

const JOURNAL_TABS = [
  { id: 'open_access', label: '🔓 Open Access', desc: 'Free to read and publish' },
  { id: 'paid', label: '🔒 Subscription', desc: 'High-impact paid journals' },
  { id: 'preprint', label: '📄 Preprint Servers', desc: 'Share before peer review' },
]

const CONF_TABS = [
  { id: 'funded', label: '💰 Fully Funded', desc: 'Travel grants available' },
  { id: 'upcoming', label: '📅 All Conferences', desc: 'Upcoming events' },
]

export default function Journals() {
  const [journalTab, setJournalTab] = useState('open_access')
  const [confTab, setConfTab] = useState('funded')

  return (
    <Layout
      title="Academic Journals & Conferences for African Researchers"
      description="Discover open access journals, international conferences with travel grants, and essential research resources for African students and researchers."
      keywords="academic journals Africa, open access journals African students, conferences for African researchers, research resources Africa, academic publishing Africa"
      canonical={`${SITE_URL}/journals`}
    >
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-block bg-green-800 text-green-200 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">Research Hub</div>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Journals & Conferences</h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Open access journals, funded international conferences, and essential research resources for African students and academics.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {[
              { label: 'Open Access Journals', count: journals.open_access.length },
              { label: 'Funded Conferences', count: conferences.funded.length },
              { label: 'Research Resources', count: resources.reduce((a, r) => a + r.items.length, 0) },
            ].map(s => (
              <div key={s.label} className="bg-green-800 bg-opacity-50 rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-white">{s.count}+</div>
                <div className="text-green-200 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">

        {/* ── JOURNALS SECTION ── */}
        <section>
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900">Academic Journals</h2>
              <p className="text-gray-500 text-sm mt-1">Find the right journal to read or publish your research</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-800 font-medium">
              ⚠️ Avoid predatory journals — always verify at <a href="https://thinkchecksubmit.org" target="_blank" rel="noopener noreferrer" className="underline">thinkchecksubmit.org</a>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {JOURNAL_TABS.map(tab => (
              <button key={tab.id} onClick={() => setJournalTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${journalTab === tab.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                {tab.label}
                <span className="ml-2 text-xs opacity-70">{tab.desc}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {journals[journalTab].map(journal => (
              <a key={journal.name} href={journal.url} target="_blank" rel="noopener noreferrer"
                className="card p-5 hover:shadow-md transition-shadow group block">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-gray-500 text-xs bg-gray-100 px-2 py-0.5 rounded">{journal.abbr}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        journalTab === 'open_access' ? 'bg-green-100 text-green-700' :
                        journalTab === 'paid' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {journalTab === 'open_access' ? '🔓 Open Access' : journalTab === 'paid' ? '🔒 Subscription' : '📄 Preprint'}
                      </span>
                      {journal.impact && <span className="text-xs text-gray-400">{journal.impact}</span>}
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-green-700 transition-colors leading-snug">{journal.name}</h3>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-green-500 flex-shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <p className="text-xs text-gray-500 mb-2">{journal.description}</p>
                <div className="text-xs text-green-600 font-medium">{journal.subjects}</div>
                <div className="text-xs text-gray-400 mt-1">Publisher: {journal.publisher}</div>
              </a>
            ))}
          </div>
        </section>

        {/* ── CONFERENCES SECTION ── */}
        <section>
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900">International Conferences</h2>
            <p className="text-gray-500 text-sm mt-1">Build your network and present your research globally</p>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            {CONF_TABS.map(tab => (
              <button key={tab.id} onClick={() => setConfTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${confTab === tab.id ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                {tab.label}
                <span className="ml-2 text-xs opacity-70">{tab.desc}</span>
              </button>
            ))}
          </div>

          {confTab === 'funded' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conferences.funded.map(conf => (
                <a key={conf.name} href={conf.url} target="_blank" rel="noopener noreferrer"
                  className="card p-5 hover:shadow-md transition-shadow group block border-l-4 border-green-500">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm group-hover:text-green-700 transition-colors leading-snug flex-1">{conf.name}</h3>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-green-500 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">{conf.description}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">💰 {conf.grant}</span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">📍 {conf.location}</span>
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">📅 {conf.date}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">{conf.subjects}</div>
                </a>
              ))}
            </div>
          )}

          {confTab === 'upcoming' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {conferences.upcoming.map(conf => (
                <a key={conf.name} href={conf.url} target="_blank" rel="noopener noreferrer"
                  className="card p-5 hover:shadow-md transition-shadow group block">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1">
                      <div className="flex gap-2 mb-1">
                        {conf.funded && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">💰 Funded</span>}
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">📅 {conf.date}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-green-700 transition-colors leading-snug">{conf.name}</h3>
                    </div>
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-green-500 flex-shrink-0 mt-1 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{conf.description}</p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-400">📍 {conf.location}</span>
                    {conf.deadline !== 'Check website' && <span className="text-red-500 font-medium">⏰ Deadline: {conf.deadline}</span>}
                  </div>
                  <div className="text-xs text-green-600 mt-1">{conf.subjects}</div>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ── RESOURCES SECTION ── */}
        <section>
          <div className="mb-6">
            <h2 className="font-display text-2xl font-bold text-gray-900">Research Resources</h2>
            <p className="text-gray-500 text-sm mt-1">Essential tools and databases for African researchers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {resources.map(category => (
              <div key={category.category}>
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-xl">{category.icon}</span>
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.items.map(item => (
                    <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors group">
                      <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <div>
                        <div className="text-sm font-medium text-gray-800 group-hover:text-green-700">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">Looking for Funding to Attend Conferences?</h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">Browse our database of conference grants, travel fellowships, and research funding opportunities for African students and researchers.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/scholarships?type=conference" className="btn-primary">Browse Conference Grants</Link>
            <Link href="/scholarships?type=research-grant" className="btn-secondary">Research Grants</Link>
            <Link href="/scholarships?type=fellowship" className="btn-secondary">Fellowships</Link>
          </div>
        </section>

      </div>
    </Layout>
  )
}

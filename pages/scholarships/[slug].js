export async function getServerSideProps({ params }) {
  try {
    const { getScholarshipBySlug, getFeaturedScholarships, incrementViews } = require('../../lib/db')
    const scholarship = await getScholarshipBySlug(params.slug)
    if (!scholarship) return { props: { scholarship: null, related: [] } }
    await incrementViews('scholarships', params.slug)
    const featured = await getFeaturedScholarships(4)
    const related = featured.filter(s => s.id !== scholarship.id)
    return { props: { scholarship, related } }
  } catch (e) {
    console.error(e)
    return { props: { scholarship: null, related: [] } }
  }
}

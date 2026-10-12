import BlogFeatured from '../../components/sections/BlogFeatured.jsx'
import BlogFilter from '../../components/sections/BlogFilter.jsx'

// /resources/blog-and-news (fluid root, legacy "green" theme).
export default function BlogPage() {
  return (
    <div>
      <BlogFeatured />
      <BlogFilter />
    </div>
  )
}

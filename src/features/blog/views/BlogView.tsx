import BlogList from '../components/BlogList'
import { BlogPost } from '../../../shared/constants/blog'

interface BlogViewProps {
  initialPosts?: BlogPost[]
}

export default function BlogView({ initialPosts }: BlogViewProps) {
  return <BlogList initialPosts={initialPosts} />
}

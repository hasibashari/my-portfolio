import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostDetailView } from '../../../features/blog'
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '../../../shared/constants/blog'
import Navbar from '../../../shared/components/Navbar'
import Footer from '../../../shared/components/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Article Not Found | Hasib Ashari',
    }
  }

  return {
    title: `${post.title} | Hasib Ashari`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(slug)

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <BlogPostDetailView post={post} relatedPosts={relatedPosts} />
      <Footer />
    </main>
  )
}

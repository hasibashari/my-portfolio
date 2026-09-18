import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogPostDetailView } from '@/features/blog'
import {
  getAllBlogSlugs,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from '@/shared/db/articles.service'
import Navbar from '@/shared/components/Navbar'
import Footer from '@/shared/components/Footer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs()
    return slugs.map((slug) => ({ slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug)

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
  const post = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(slug)

  return (
    <main style={{ backgroundColor: 'var(--color-canvas)', minHeight: '100vh' }}>
      <Navbar />
      <BlogPostDetailView post={post} relatedPosts={relatedPosts} />
      <Footer />
    </main>
  )
}

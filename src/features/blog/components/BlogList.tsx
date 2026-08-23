'use client'

import { useState, useMemo } from 'react'
import { Box, Container, Typography, Button } from '@mui/material'
import { motion, AnimatePresence } from 'motion/react'
import { BookOpen } from 'lucide-react'
import BlogHero from './BlogHero'
import BlogFilter from './BlogFilter'
import BlogCard from './BlogCard'
import Pagination from '../../../shared/components/Pagination'
import {
  blog as defaultBlog,
  BlogPost,
  BlogCategory,
  BLOG_CATEGORIES,
} from '../../../shared/constants/blog'

const ITEMS_PER_PAGE = 4

interface BlogListProps {
  initialPosts?: BlogPost[]
}

export default function BlogList({ initialPosts }: BlogListProps) {
  const allBlogPosts = initialPosts || defaultBlog
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const handleCategoryChange = (category: BlogCategory) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<BlogCategory, number> = {
      All: allBlogPosts.length,
      PERFORMANCE: 0,
      ARCHITECTURE: 0,
      'REACT & TS': 0,
    }

    BLOG_CATEGORIES.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = allBlogPosts.filter((p) => p.category === cat).length
      }
    })

    return counts
  }, [allBlogPosts])

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    return allBlogPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory

      const matchesSearch =
        searchQuery.trim() === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      return matchesCategory && matchesSearch
    })
  }, [allBlogPosts, selectedCategory, searchQuery])

  // Pagination calculation
  const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE)
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredPosts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredPosts, currentPage])

  return (
    <Box sx={{ minHeight: '85vh', pb: { xs: 10, md: 14 }, bgcolor: 'var(--color-canvas)' }}>
      {/* Editorial Hero Banner */}
      <BlogHero />

      {/* Category Filter & Search Bar */}
      <BlogFilter
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryCounts={categoryCounts}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />

      <Container id="blog-content-list" maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, sm: 5 } }}>
        {/* Results Counter & Active Filter feedback */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
          <Typography
            variant="body2"
            sx={{ color: 'var(--color-muted)', fontWeight: 500, fontSize: '0.875rem' }}
          >
            Showing{' '}
            <Box component="span" sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
              {filteredPosts.length}
            </Box>{' '}
            {filteredPosts.length === 1 ? 'article' : 'articles'}
            {selectedCategory !== 'All' && ` in ${selectedCategory}`}
            {searchQuery && ` matching "${searchQuery}"`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </Typography>

          {(selectedCategory !== 'All' || searchQuery !== '') && (
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
                setCurrentPage(1)
              }}
              sx={{
                color: 'var(--color-primary)',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8125rem',
                p: 0,
                '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
              }}
            >
              Reset filters
            </Button>
          )}
        </Box>

        {/* Articles Grid */}
        <AnimatePresence mode="popLayout">
          {paginatedPosts.length > 0 ? (
            <Box
              component={motion.div}
              layout
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: { xs: 3, md: 4 },
              }}
            >
              {paginatedPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  style={{ height: '100%' }}
                >
                  <BlogCard post={post} featured={currentPage === 1 && idx === 0 && selectedCategory === 'All' && !searchQuery} />
                </motion.div>
              ))}
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Box
                sx={{
                  py: 10,
                  px: 3,
                  textAlign: 'center',
                  bgcolor: 'var(--color-surface-soft)',
                  borderRadius: '12px',
                  border: '1px dashed var(--color-hairline)',
                }}
              >
                <BookOpen size={40} color="var(--color-muted)" style={{ marginBottom: 16 }} />
                <Typography variant="h6" className="font-serif-display" sx={{ color: 'var(--color-ink)', mb: 1 }}>
                  No articles found
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-muted)', mb: 3 }}>
                  No published essays matched your current filter criteria.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedCategory('All')
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  sx={{
                    textTransform: 'none',
                    borderColor: 'var(--color-hairline)',
                    color: 'var(--color-ink)',
                    '&:hover': {
                      borderColor: 'var(--color-primary)',
                      bgcolor: 'var(--color-canvas)',
                    },
                  }}
                >
                  Clear search & filters
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          scrollTargetId="blog-content-list"
        />
      </Container>
    </Box>
  )
}

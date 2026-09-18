'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Box, Container, Typography, Button } from '@mui/material';
import { AnimatePresence, motion } from 'motion/react';
import { FolderGit2 } from 'lucide-react';
import ProjectsHero from './ProjectsHero';
import FilterBar from '@/shared/components/FilterBar';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import Pagination from '@/shared/components/Pagination';
import { ProjectItem, ProjectCategory, PROJECT_CATEGORIES } from '@/shared/types/projects';

const ITEMS_PER_PAGE = 6;

interface ProjectListProps {
  initialProjects?: ProjectItem[];
}

export default function ProjectList({ initialProjects = [] }: ProjectListProps) {
  const searchParams = useSearchParams();
  const allProjects = initialProjects;

  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-open modal if URL query param `?project=<slug|id>` is present
  useEffect(() => {
    const projectIdFromUrl = searchParams.get('project');
    if (projectIdFromUrl) {
      const match = allProjects.find(
        p => (p.slug && p.slug === projectIdFromUrl) || p.id === projectIdFromUrl,
      );
      if (match) {
        setActiveModalProject(match);
      }
    }
  }, [searchParams, allProjects]);

  const handleOpenModal = (project: ProjectItem) => {
    setActiveModalProject(project);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', `/projects?project=${project.slug || project.id}`);
    }
  };

  const handleCloseModal = () => {
    setActiveModalProject(null);
    if (typeof window !== 'undefined') {
      window.history.pushState(null, '', '/projects');
    }
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  // Compute total counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<ProjectCategory, number> = {
      All: allProjects.length,
      'AI & Backend': 0,
      'Cloud & Data': 0,
      Microservices: 0,
      Fullstack: 0,
    };

    PROJECT_CATEGORIES.forEach(cat => {
      if (cat !== 'All') {
        counts[cat] = allProjects.filter(p => p.category === cat).length;
      }
    });

    return counts;
  }, [allProjects]);

  // Filter projects strictly by category AND search query, featured first
  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return allProjects
      .filter(project => {
        // Category filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }
        // Search query filter (matches title, description, badge, or tech stack)
        if (query) {
          const matchTitle = project.title.toLowerCase().includes(query);
          const matchDesc = project.description.toLowerCase().includes(query);
          const matchBadge = project.badge.toLowerCase().includes(query);
          const matchTech = project.techStack.some(tech => tech.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchBadge && !matchTech) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [allProjects, selectedCategory, searchQuery]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  return (
    <Box sx={{ minHeight: '80vh', pb: { xs: 10, md: 14 }, bgcolor: 'var(--color-canvas)' }}>
      {/* Editorial Hero Header */}
      <ProjectsHero />

      {/* Shared Modular Category Filter & Search Component */}
      <FilterBar<ProjectCategory>
        categories={PROJECT_CATEGORIES}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        categoryCounts={categoryCounts}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Search projects or tech..."
      />

      <Container
        id='projects-content-list'
        maxWidth='lg'
        sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 3, sm: 4 } }}
      >
        {/* Results Counter */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, md: 3.5 },
          }}
        >
          <Typography variant='body2' sx={{ color: 'var(--color-muted)', fontWeight: 500 }}>
            Showing{' '}
            <Box component='span' sx={{ color: 'var(--color-ink)', fontWeight: 600 }}>
              {filteredProjects.length}
            </Box>{' '}
            {filteredProjects.length === 1 ? 'project' : 'projects'}
            {selectedCategory !== 'All' && ` in "${selectedCategory}"`}
            {searchQuery && ` matching "${searchQuery}"`}
            {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
          </Typography>

          {(selectedCategory !== 'All' || searchQuery) && (
            <Button
              size='small'
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setCurrentPage(1);
              }}
              sx={{
                color: 'var(--color-primary)',
                textTransform: 'none',
                fontSize: '0.8125rem',
                fontWeight: 500,
                p: 0,
                '&:hover': { bgcolor: 'transparent', color: 'var(--color-primary-active)' },
              }}
            >
              Reset filters
            </Button>
          )}
        </Box>

        {/* Symmetrical 3-Column Project Grid */}
        {paginatedProjects.length > 0 ? (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
              },
              gap: { xs: 2.5, sm: 3, lg: 3.5 },
              alignItems: 'stretch',
            }}
          >
            <AnimatePresence mode='popLayout'>
              {paginatedProjects.map(project => (
                <ProjectCard key={project.id} project={project} onOpenModal={handleOpenModal} />
              ))}
            </AnimatePresence>
          </Box>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Box
              sx={{
                textAlign: 'center',
                py: { xs: 8, sm: 10 },
                px: 2,
                borderRadius: '16px',
                bgcolor: 'var(--color-surface-soft)',
                border: '1px dashed var(--color-hairline)',
                width: '100%',
              }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  bgcolor: 'var(--color-surface-card)',
                  color: 'var(--color-muted)',
                  mb: 2,
                }}
              >
                <FolderGit2 size={32} />
              </Box>
              <Typography
                variant='h6'
                className='font-serif-display'
                sx={{ color: 'var(--color-ink)', mb: 1 }}
              >
                No projects matched your criteria
              </Typography>
              <Typography variant='body2' sx={{ color: 'var(--color-muted)', mb: 3 }}>
                Try adjusting your search keyword or switching category tabs.
              </Typography>
              <Button
                variant='outlined'
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                sx={{
                  color: 'var(--color-ink)',
                  borderColor: 'var(--color-hairline)',
                  bgcolor: 'var(--color-canvas)',
                  textTransform: 'none',
                  borderRadius: '8px',
                  px: 2.5,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'var(--color-surface-card)',
                    borderColor: 'var(--color-primary)',
                  },
                }}
              >
                Clear all filters
              </Button>
            </Box>
          </motion.div>
        )}

        {/* Global Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          scrollTargetId='projects-content-list'
        />
      </Container>

      {/* Project Details Modal with Deep Link & Markdown */}
      <ProjectModal
        project={activeModalProject}
        open={Boolean(activeModalProject)}
        onClose={handleCloseModal}
      />
    </Box>
  );
}

'use client';

import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import AdminNav from '../components/AdminNav';
import ArticleForm, { ArticleFormData } from '../components/ArticleForm';
import { BlogPost } from '@/shared/types/blog';

interface AdminArticleFormViewProps {
  article?: BlogPost;
  isEdit?: boolean;
}

export default function AdminArticleFormView({
  article,
  isEdit = false,
}: AdminArticleFormViewProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload: ArticleFormData) => {
    setLoading(true);
    try {
      const url = isEdit ? `/api/admin/articles/${article?.id}` : '/api/admin/articles';
      const method = isEdit ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save article');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--color-canvas)', pb: 10 }}>
      <AdminNav />

      <Container maxWidth='lg' sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: { xs: 4, md: 6 } }}>
        <Box sx={{ mb: 4 }}>
          <Typography
            variant='h4'
            className='font-serif-display'
            sx={{ color: 'var(--color-ink)', fontWeight: 700, mb: 0.5 }}
          >
            {isEdit ? `Edit Article: ${article?.title}` : 'Create New Article'}
          </Typography>
          <Typography variant='body2' sx={{ color: 'var(--color-muted)' }}>
            {isEdit
              ? 'Update technical writeup details, markdown body, code snippets, or tags.'
              : 'Write and publish a new engineering article with live Markdown formatting and syntax preview.'}
          </Typography>
        </Box>

        <ArticleForm
          initialData={article}
          isEdit={isEdit}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </Container>
    </Box>
  );
}

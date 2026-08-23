# Agent Development Guidelines

Always refer to and adhere to the architecture standards documented in [docs/architecture.md](file:///home/azure/dev/projects/frontend/my-portfolio/docs/architecture.md):
- **Feature-Driven Modularity**: Structure code under `src/features/<feature-name>/`.
- **Three-Tier Architecture**:
  - **Page Orchestrator Layer (`src/pages/`)**: Manages routing, data hooks, SEO, and layout wrapping.
  - **View Presentation Layer (`src/features/<feature>/views/`)**: Pure presentational assembly that receives props.
  - **Component Layer (`src/features/<feature>/components/`)**: Local sub-components with pure UI and localized animations.
- **Public API Barrier**: Expose modules strictly through each feature's `index.ts` barrel file.
- **Vite & React SPA Standard**: Use lazy loading (`React.lazy`), type safety, and centralized design tokens.

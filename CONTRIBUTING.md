# Contributing to Eight

Thanks for your interest in contributing!

### Setup

To get started with the Eight project, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this page to create your own copy of the repository.

2. **Clone your fork**: Use the following command to clone your fork to your local:

   ```bash
   git clone https://github.com/<your-username>/eight.git
   ```

3. **Navigate to the project directory**:

   ```bash
   cd eight
   ```

4. **Install dependencies**: Use Bun to install the project dependencies:

   ```bash
   pnpm install
   ```

5. **Run the development server**: Start the development server with:
   ```bash
   pnpm run dev
   ```

### Making Changes

- Create a new branch for your changes:

  ```bash
  git checkout -b feature/your-feature-name
  ```

- Make your changes and commit them:

  ```bash
  git add .
  git commit -m "Add your commit message here"
  ```

- Push your changes to your fork:

  ```bash
  git push origin feature/your-feature-name
  ```

- Open a pull request against the `main` branch of the original repository.

### Code Style

We follow a consistent code style to maintain readability. Please ensure your code adheres to the following:

- Use 2 spaces for indentation.
- Use single quotes for strings, except when the string contains a single quote.
- Use semicolons at the end of statements.
- Use arrow functions for anonymous functions.
- Keep lines under 80 characters.


### Issues

If you find a bug or have a feature request, please open an issue in the repository. Provide as much detail as possible, including:

- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots if applicable

## Development Guidelines

### Pull Requests

- Ensure your pull request is against the `main` or the current `development` / `staging` branch.
- Provide a clear description of the changes you made.
- Reference any related issues by using `#issue-number`.
- Keep your pull request focused on a single feature or bug fix.
- Ensure your code passes all tests and adheres to the project's coding standards.
- If your pull request is large, consider breaking it into smaller, more manageable pieces.

### Branch Naming

- Use descriptive names for your branches, such as `feature/add-search-functionality` or `bugfix/fix-login-issue`.
- Avoid using generic names like `feature1` or `bugfix1`.

### Commit Messages

- Write clear and concise commit messages.
- Use the present tense ("frontend: Add search bar" not "Added search bar").
- Include a brief description of the changes made.

### Communication

- Use GitHub issues for tracking bugs and feature requests.
- Use pull requests for code reviews and discussions about changes.
- Use the project's [Discord server](https://discord.gg/eightphotos) for discussions and questions.
- For larger changes, consider discussing them in an issue before starting work to ensure alignment with the project's goals.

### License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

---

## Roadmap & Contribution Opportunities

We want everyone to be able to contribute something to Eight. Below is a list of areas where you can make meaningful contributions to help build the future of AI-powered photo search. You can also check out our [GitHub Issues](https://github.com/your-org/eight/issues) for specific tasks. This roadmap will be updated as the project evolves.

### 1. AI/ML Features

If you have experience with computer vision, machine learning, or AI APIs, we would love your help building Eight's core intelligent features:

**Photo Analysis & Tagging**
- Implement object detection for automatic photo tagging
- Add scene recognition (indoor/outdoor, event types, etc.)
- Build content-based similarity search
- Add photo quality assessment (blur detection, exposure analysis)
- Implement color palette extraction and analysis

**Search Intelligence**
- Natural language photo search ("photos of dogs in the park")
- Semantic search improvements and query understanding
- Search result ranking and relevance scoring
- Add search filters and advanced query syntax
- Implement search suggestions and autocomplete

**Face Recognition & People**
- Face detection and clustering for people identification
- Privacy-respecting face recognition with local processing
- People tagging and relationship mapping
- Group photo analysis and identification

### 2. Photo Import & Export

Help users bring their existing photo libraries into Eight and manage data portability:

**Import Sources**
- Google Photos import with full metadata preservation
- iCloud Photos integration and sync
- Local folder import with watch functionality
- Dropbox, OneDrive, and other cloud storage imports
- Social media photo imports (Instagram, Facebook, etc.)

**Export & Backup**
- Bulk export with original metadata
- Selective export by albums, tags, or date ranges
- Integration with backup services
- Photo format conversion and optimization
- Metadata preservation during import/export

**Sync & Organization**
- Real-time folder watching and auto-import
- Duplicate detection and handling
- Photo versioning and edit history
- Cross-device synchronization

### 3. UI/UX Improvements

Make Eight beautiful, intuitive, and accessible for all users:

**Core Interface**
- Photo grid views with responsive layouts
- Timeline and calendar views for browsing by date
- Full-screen photo viewer with navigation
- Lightbox gallery with keyboard shortcuts
- Mobile-first responsive design improvements

**Search & Discovery**
- Advanced search interface with visual filters
- Search history and saved searches
- Photo comparison and side-by-side viewing
- Map view for location-based browsing
- Trending and suggested content discovery

**Organization & Management**
- Drag-and-drop album creation and management
- Batch photo operations (delete, move, tag)
- Smart album creation based on criteria
- Photo editing tools integration
- Metadata editor with bulk operations

**User Experience**
- Onboarding flow for new users
- Keyboard shortcuts and power user features
- Accessibility improvements (screen readers, keyboard navigation)
- Dark mode and theme customization
- Loading states and skeleton screens

### 4. Backend Improvements

Strengthen Eight's server infrastructure and API capabilities:

**API Development**
- RESTful API endpoints for photo management
- GraphQL API implementation
- Real-time updates with WebSocket support
- API rate limiting and security improvements
- OpenAPI/Swagger documentation

**Performance & Scalability**
- Database query optimization for large photo libraries
- Caching strategies for frequently accessed data
- Background job processing for imports and analysis
- CDN integration for fast photo delivery
- Horizontal scaling capabilities

**Security & Privacy**
- End-to-end encryption for photo storage
- User authentication and authorization improvements
- Privacy controls and data anonymization
- GDPR compliance features
- Audit logging and security monitoring

**Storage & Processing**
- Multiple storage backend support (S3, local, etc.)
- Image processing pipeline optimization
- Thumbnail generation and caching
- Video support and processing
- RAW photo format support

### 5. Database & Storage

Optimize data management and storage efficiency:

**Database Optimization**
- Database migrations for new features
- Query performance improvements
- Full-text search implementation
- Database backup and recovery procedures
- Multi-database support (PostgreSQL, MySQL, SQLite)

**Metadata Management**
- EXIF data extraction and indexing
- Custom metadata fields and schemas
- Metadata search and filtering
- Geographic data handling (GPS coordinates)
- Date/time handling across timezones

**Storage Efficiency**
- Photo compression and format optimization
- Duplicate detection algorithms
- Storage usage analytics and reporting
- Archive and cold storage integration
- Storage quota management

### 6. General Improvements

Help improve the overall developer and user experience:

**Developer Experience**
- Comprehensive test suite with Vitest and Playwright
- CI/CD pipeline improvements
- Development environment automation
- Code quality tools and linting improvements
- Performance monitoring and profiling

**Documentation & Community**
- API documentation and examples
- User guides and tutorials
- Video walkthroughs and demos
- Translation and internationalization
- Community forum and support resources

**Quality Assurance**
- Error handling and user feedback improvements
- Performance testing and optimization
- Cross-browser compatibility testing
- Mobile app development (React Native)
- Desktop app development (Electron)

**Deployment & Operations**
- Docker containerization improvements
- Kubernetes deployment manifests
- Monitoring and alerting setup
- Automated backup solutions
- One-click deployment options

---

**Getting Started**: Pick any area that interests you and check our [Issues](https://github.com/your-org/eight/issues) for specific tasks. Many of these features can start with UI mockups and dummy data before connecting to real functionality. Don't hesitate to ask questions in our [Discord](https://discord.gg/eightphotos) or open a discussion on GitHub!

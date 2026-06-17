# Contributing to Grey

Thank you for your interest in contributing to the Grey project! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) to understand the standards we expect from all contributors.

## Getting Started

### Prerequisites
- Node.js 20+ (26.x recommended)
- npm 11+
- Git

### Setup Development Environment

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/grey.git
   cd grey
   ```

2. **Install Dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your local configuration
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   # Server runs on http://localhost:3000
   ```

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/bug-description
```

### 2. Make Your Changes
- Write clean, readable code
- Follow the existing code style
- Add comments for complex logic
- Remove console.log statements before commit

### 3. Test Your Changes
```bash
# Type checking
npx tsc --noEmit

# Linting
npm run lint

# Build
npm run build

# Run tests
npm test
```

### 4. Commit with Clear Messages
```bash
git commit -m "feat: add new feature"
git commit -m "fix: resolve issue with X"
git commit -m "docs: update README"
git commit -m "refactor: improve code clarity"
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring (no feature/bug changes)
- `perf:` Performance improvements
- `test:` Test additions/changes
- `chore:` Build/config/dependency changes

### 5. Push and Create Pull Request
```bash
git push origin feature/your-feature-name
```

Then open a PR on GitHub with:
- Clear title and description
- Link to related issues
- Screenshots (if UI changes)
- List of changes made

## Code Style Guidelines

### TypeScript
- Use strict typing; avoid `any`
- Use interfaces for object shapes
- Use enums for fixed sets of values
- Comment non-obvious logic

### React Components
- Functional components with hooks
- Use descriptive component names
- Keep components focused (single responsibility)
- Memoize expensive components when needed

### Naming Conventions
- **Files/Directories:** kebab-case (e.g., `user-profile.tsx`)
- **Components:** PascalCase (e.g., `UserProfile.tsx`)
- **Variables/Functions:** camelCase (e.g., `getUserData()`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

### CSS/Tailwind
- Use Tailwind classes primarily
- Keep custom CSS in component files
- Avoid inline styles

## Project Structure

```
grey/
├── components/       # React components
├── screens/          # Full-page components
├── lib/              # Utility functions
├── Admin/            # Backend/Express code
│   ├── routes/
│   ├── middleware/
│   ├── db/
│   └── data/
├── public/           # Static assets
├── styles/           # Global styles
├── tests/            # Test files
├── .github/          # GitHub Actions/Dependabot config
└── package.json
```

## Testing Guidelines

- Write tests for new features
- Maintain >70% code coverage
- Test edge cases and error scenarios
- Include both unit and integration tests
- Use descriptive test names

Example:
```typescript
describe('getUserData', () => {
  it('should return user data when ID is valid', async () => {
    const user = await getUserData('123');
    expect(user.id).toBe('123');
  });

  it('should throw error when ID is invalid', async () => {
    expect(() => getUserData('')).toThrow();
  });
});
```

## Documentation

- Update README.md if changing user-facing features
- Add inline comments for complex logic
- Update API docs if changing endpoints
- Include examples for new utilities

## Performance Considerations

- Minimize bundle size
- Use code splitting for large features
- Optimize images and assets
- Profile before and after changes
- Avoid unnecessary re-renders

## Security

- Don't commit secrets (.env files)
- Validate all user inputs
- Use parameterized queries for databases
- Keep dependencies updated
- Report security issues privately to maintainers

## Review Process

1. **Automated Checks**
   - GitHub Actions runs CI/CD
   - TypeScript, linting, and tests must pass
   - Code coverage should not decrease

2. **Code Review**
   - Wait for maintainer review
   - Respond to feedback constructively
   - Make requested changes in new commits

3. **Approval & Merge**
   - At least 1 maintainer approval required
   - All feedback must be addressed
   - Branch must be up-to-date with main

## Common Tasks

### Adding a New Page
```bash
# Create page file
touch screens/my-page.tsx

# Add route in app router (next.js 13+)
# Pages auto-route based on file structure
```

### Adding a New API Endpoint
```bash
# Create endpoint file
touch Admin/routes/my-endpoint.ts

# Import in main server.ts
```

### Adding Dependencies
```bash
npm install package-name

# Commit both package.json and package-lock.json
git add package.json package-lock.json
git commit -m "chore(deps): add package-name"
```

## Getting Help

- **Questions:** Open a GitHub Discussion
- **Bugs:** Open a GitHub Issue
- **Security:** Email maintainers privately
- **Chat:** Contact maintainers on GitHub

## Recognition

Contributors will be recognized in:
- GitHub contributions graph
- Release notes
- CONTRIBUTORS.md (coming soon)

Thank you for making Grey better! 🚀

---

**Questions?** Feel free to ask in GitHub Issues or contact the maintainers.

# Test Suite

This directory contains unit and integration tests for the grey project.

## Structure

```
tests/
├── unit/           # Unit tests for individual functions/components
├── integration/    # Integration tests for API endpoints and workflows
├── fixtures/       # Test data and mock implementations
└── README.md       # This file
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- tests/unit/example.test.ts

# Run with coverage
npm test -- --coverage
```

## Setting Up Tests

Currently, no test framework is configured. To add tests:

### Option 1: Vitest (Recommended for Next.js)
```bash
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom jsdom
```

### Option 2: Jest
```bash
npm install -D jest @testing-library/react @testing-library/jest-dom ts-jest
```

## Test Examples

### Unit Test Example
```typescript
// tests/unit/helpers.test.ts
import { describe, it, expect } from 'vitest';
import { formatPrice } from '../../lib/helpers';

describe('formatPrice', () => {
  it('formats price correctly', () => {
    expect(formatPrice(9999)).toBe('₦9,999.00');
  });
});
```

### Component Test Example
```typescript
// tests/unit/Button.test.tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Button from '../../components/Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### API Test Example
```typescript
// tests/integration/api.test.ts
import { describe, it, expect } from 'vitest';

describe('API Endpoints', () => {
  it('GET /api/health returns 200', async () => {
    const res = await fetch('http://localhost:3000/api/health');
    expect(res.status).toBe(200);
  });
});
```

## Coverage Goals

- **Statements:** 70%+
- **Branches:** 65%+
- **Functions:** 70%+
- **Lines:** 70%+

## Contributing Tests

When adding new features:
1. Write tests first (TDD) or immediately after (BDD)
2. Ensure tests pass locally
3. Include tests in your PR
4. Maintain or improve code coverage

## Continuous Integration

Tests run automatically on:
- Every push to `main` and `develop`
- Every pull request
- Results are reported in GitHub Actions

See `.github/workflows/ci.yml` for CI configuration.

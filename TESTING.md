# Testing Setup

This project has been configured with Jest and React Testing Library for comprehensive testing.

## What's Included

### Dependencies
- **Jest**: JavaScript testing framework
- **@testing-library/react**: Simple and complete testing utilities for React components
- **@testing-library/jest-dom**: Custom Jest matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation
- **@testing-library/dom**: DOM testing utilities
- **jest-environment-jsdom**: JSDOM environment for Jest

### Configuration Files
- `jest.config.js` - Jest configuration with Next.js integration
- `jest.setup.js` - Global test setup and mocks

### Test Scripts
```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage

# Run tests in CI mode
pnpm test:ci
```

## Features

### Next.js Integration
- Automatic handling of Next.js components and features
- Built-in support for CSS modules and styled-jsx
- Mocked Next.js router and navigation hooks
- Image and Link component mocks

### Global Mocks
- `ResizeObserver` and `IntersectionObserver`
- `window.matchMedia`
- `window.scrollTo`
- Next.js `Image` and `Link` components
- Next.js router and navigation hooks

### Coverage Configuration
- Collects coverage from `components/`, `lib/`, and `app/` directories
- Excludes test files, type definitions, and build artifacts
- Generates HTML, LCOV, and text coverage reports

## Example Tests

The setup includes sample tests for:
- **Price Component** (`components/__tests__/price.test.tsx`)
  - Currency formatting
  - Custom styling
  - Edge cases (zero amounts, large numbers)

- **Label Component** (`components/__tests__/label.test.tsx`)
  - Rendering with different props
  - Position styling
  - CSS class application

- **Utils Functions** (`lib/__tests__/utils.test.ts`)
  - URL creation with parameters
  - String manipulation utilities
  - Environment variable validation

## Writing Tests

### Basic Component Test
```typescript
import { render, screen } from '@testing-library/react'
import MyComponent from '../MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />)
    expect(screen.getByText('Test')).toBeInTheDocument()
  })
})
```

### Testing User Interactions
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../Button'

describe('Button', () => {
  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = jest.fn()
    
    render(<Button onClick={handleClick}>Click me</Button>)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### Testing Async Operations
```typescript
import { render, screen, waitFor } from '@testing-library/react'
import AsyncComponent from '../AsyncComponent'

describe('AsyncComponent', () => {
  it('displays data after loading', async () => {
    render(<AsyncComponent />)
    
    await waitFor(() => {
      expect(screen.getByText('Loaded data')).toBeInTheDocument()
    })
  })
})
```

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText`, etc. over `getByTestId`
2. **Test behavior, not implementation**: Focus on what users can see and do
3. **Use user-event for interactions**: More realistic than `fireEvent`
4. **Keep tests simple and focused**: One assertion per test when possible
5. **Use descriptive test names**: Clearly state what is being tested
6. **Mock external dependencies**: Keep tests isolated and fast

## Folder Structure

```
project/
├── components/
│   ├── __tests__/
│   │   ├── component1.test.tsx
│   │   └── component2.test.tsx
│   └── component1.tsx
├── lib/
│   ├── __tests__/
│   │   └── utils.test.ts
│   └── utils.ts
├── jest.config.js
├── jest.setup.js
└── TESTING.md
```

Place test files in `__tests__` directories alongside the code they test, or use `.test.tsx` / `.spec.tsx` suffixes.

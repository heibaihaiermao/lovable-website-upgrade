import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'

// Mocks
vi.mock('../components/Navbar', () => ({
  default: () => <div>Mock Navbar</div>,
}))
vi.mock('../components/HeroSection', () => ({
  default: () => <div>Mock Hero</div>,
}))
vi.mock('../components/Features', () => ({
  default: () => <div>Mock Features</div>,
}))
vi.mock('../components/AnimatedBackground', () => ({
  default: () => <div>Mock Background</div>,
}))

// Shared navigate mock
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Wrapper function to mock useAuth dynamically using doMock
function mockUseAuth(value) {
  vi.doMock('../contexts/AuthContext', () => ({
    useAuth: () => value,
  }))
}

describe('Landing Page', () => {
  beforeEach(() => {
    vi.resetModules()
    mockNavigate.mockClear()
  })

  test('shows loading spinner when loading is true', async () => {
    mockUseAuth({ user: null, loading: true })

    const { default: Landing } = await import('../pages/Landing')
    render(<Landing />, { wrapper: MemoryRouter })

    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('redirects to /dashboard if user is authenticated', async () => {
    mockUseAuth({ user: { name: 'Test' }, loading: false })

    const { default: Landing } = await import('../pages/Landing')
    render(<Landing />, { wrapper: MemoryRouter })

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
  })

  test('renders components if not logged in', async () => {
    mockUseAuth({ user: null, loading: false })

    const { default: Landing } = await import('../pages/Landing')
    render(<Landing />, { wrapper: MemoryRouter })

    expect(screen.getByText('Mock Navbar')).toBeInTheDocument()
    expect(screen.getByText('Mock Hero')).toBeInTheDocument()
    expect(screen.getByText('Mock Features')).toBeInTheDocument()
    expect(screen.getByText('Mock Background')).toBeInTheDocument()
  })
})

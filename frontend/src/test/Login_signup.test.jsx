import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login_signup from '../pages/Login_signup'
import { vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'

// Mock navigation
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

// Mock AuthContext
vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    signUp: vi.fn(() => Promise.resolve({ error: null })),
    signIn: vi.fn(() => Promise.resolve({ error: null })),
  }),
}))

// Mock Supabase OAuth
vi.mock('../client', () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(() => Promise.resolve({ error: null })),
    },
  },
}))

function renderPage() {
  return render(
    <BrowserRouter>
      <Login_signup />
    </BrowserRouter>
  )
}

describe('Login_signup Page', () => {
  beforeEach(() => {
    mockNavigate.mockClear()
  })

  it('renders login form by default', () => {
    renderPage()
    expect(screen.getAllByRole('button', { name: 'Login' })).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login with Google' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Login with Microsoft' })).toBeInTheDocument()
  })

  it('toggles to signup form and renders additional fields', () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }))
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Create Account/i })).toBeInTheDocument()
  })

  it('submits login form and navigates to dashboard', async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } })
    fireEvent.click(screen.getByRole('button', { name: /Login/i }))

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard')
    })
  })

  it('submits signup form and shows verification message', async () => {
    renderPage()
    fireEvent.click(screen.getByRole('button', { name: /Signup/i }))

    fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } })
    fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } })
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john@example.com' } })
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } })

    fireEvent.click(screen.getByRole('button', { name: /Create Account/i }))

    await waitFor(() => {
      expect(screen.getByText(/Dashboard/i)).toBeInTheDocument()
    })
  })
})

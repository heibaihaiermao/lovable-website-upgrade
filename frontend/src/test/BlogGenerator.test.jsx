import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogGenerator from '../pages/BlogGenerator'
import { vi } from 'vitest'

// Suppress console logs for cleaner test output
vi.spyOn(console, 'log').mockImplementation(() => {})

// Mock Header and NavigationTabs
vi.mock('../components/Header.jsx', () => ({
  Header: () => <div data-testid="mock-header">Header</div>,
}))
vi.mock('../components/NavigationTabs.jsx', () => ({
  NavigationTabs: () => <div data-testid="mock-tabs">Tabs</div>,
}))

describe('BlogGenerator Page', () => {
  it('renders all main sections', () => {
    render(<BlogGenerator />)

    expect(screen.getByText('Generate SEO Blog Articles')).toBeInTheDocument()
    expect(screen.getByLabelText(/Focus Keyword/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Generate Blog/i })).toBeInTheDocument()
  })

  it('calls console.log with keyword when generating blog', () => {
    render(<BlogGenerator />)

    const input = screen.getByLabelText(/Focus Keyword/i)
    const button = screen.getByRole('button', { name: /Generate Blog/i })

    fireEvent.change(input, { target: { value: 'test keyword' } })
    fireEvent.click(button)

    expect(console.log).toHaveBeenCalledWith('Generating blog for keyword:', 'test keyword')
  })

  it('does not generate blog if keyword is empty', () => {
    render(<BlogGenerator />)

    const button = screen.getByRole('button', { name: /Generate Blog/i })

    fireEvent.click(button)

    expect(console.log).not.toHaveBeenCalledWith('Generating blog for keyword:')
  })
})

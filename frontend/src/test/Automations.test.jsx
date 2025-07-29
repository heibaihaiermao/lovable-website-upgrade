import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import Automations from '../pages/Automations'

// Mock Header and NavigationTabs
vi.mock('../components/Header', () => ({
  default: () => <div>Mock Header</div>,
}))
vi.mock('../components/NavigationTabs', () => ({
  default: () => <div>Mock NavTabs</div>,
}))

describe('Automations Page', () => {
  test('renders main sections and headers', () => {
    render(<Automations />, { wrapper: MemoryRouter })

    expect(screen.getByText('Mock Header')).toBeInTheDocument()
    expect(screen.getByText('Mock NavTabs')).toBeInTheDocument()
    expect(screen.getByText('Automations')).toBeInTheDocument()
    expect(screen.getByText('CMS Integrations')).toBeInTheDocument()
    expect(screen.getByText('Social Media Sharing')).toBeInTheDocument()
    expect(screen.getByText('Newsletter Platforms')).toBeInTheDocument()
  })

  test('all toggles are rendered correctly', () => {
    const toggleLabels = [
      'Auto-post to WordPress',
      'Auto-post to Netlify',
      'Auto-post to Wix',
      'Auto-post to Webflow',
      'Auto-share to Facebook',
      'Auto-share to Instagram',
      'Auto-share to Pinterest',
      'Substack',
      'Medium',
      'LinkedIn',
    ]

    render(<Automations />, { wrapper: MemoryRouter })

    toggleLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })

    // Count checkboxes (should match number of toggles)
    const toggles = screen.getAllByRole('checkbox')
    expect(toggles.length).toBe(toggleLabels.length)
  })

  test('toggles change state on click', () => {
    render(<Automations />, { wrapper: MemoryRouter })

    const facebookToggle = screen.getByLabelText((_, el) => {
      return el?.parentElement?.textContent?.includes('Facebook')
    })

    expect(facebookToggle.checked).toBe(true)

    fireEvent.click(facebookToggle)

    expect(facebookToggle.checked).toBe(false)
  })

  test('renders all "Add" buttons', () => {
    render(<Automations />, { wrapper: MemoryRouter })

    const addButtons = screen.getAllByText('Add')
    expect(addButtons.length).toBe(3) // One per section
  })
})

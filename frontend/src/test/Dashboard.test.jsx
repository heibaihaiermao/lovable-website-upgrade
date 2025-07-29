import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import React from 'react'

// Mock child components
vi.mock('../components/Header.jsx', () => ({
  Header: () => <div>Mock Header</div>,
}))

vi.mock('../components/NavigationTabs.jsx', () => ({
  NavigationTabs: () => <div>Mock NavigationTabs</div>,
}))

vi.mock('../components/Dashboard/WelcomeSection.jsx', () => ({
  WelcomeSection: ({ onStartResearch }) => (
    <div>
      Mock WelcomeSection
      <button onClick={() => onStartResearch('seo test')}>Start Research</button>
    </div>
  ),
}))

vi.mock('../components/Dashboard/ContentSection.jsx', () => ({
  ContentSection: ({ onSearchBlogs, onBlogClick }) => (
    <div>
      Mock ContentSection
      <button onClick={() => onSearchBlogs('query')}>Search Blogs</button>
      <button onClick={() => onBlogClick({ id: 1, title: 'Sample Blog' })}>Click Blog</button>
    </div>
  ),
}))

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(console, 'log').mockImplementation(() => {}) // silence console output
  })

  afterAll(() => {
    vi.restoreAllMocks()
  })

  test('renders all main dashboard sections', async () => {
    const { default: Dashboard } = await import('../pages/Dashboard.jsx')

    render(<Dashboard />)

    expect(screen.getByText('Mock Header')).toBeInTheDocument()
    expect(screen.getByText('Mock NavigationTabs')).toBeInTheDocument()
    expect(screen.getByText('Mock WelcomeSection')).toBeInTheDocument()
    expect(screen.getByText('Mock ContentSection')).toBeInTheDocument()
  })

  test('triggers onStartResearch when clicked', async () => {
    const { default: Dashboard } = await import('../pages/Dashboard.jsx')

    render(<Dashboard />)

    screen.getByText('Start Research').click()

    expect(console.log).toHaveBeenCalledWith('Starting SEO research for:', 'seo test')
  })

  test('triggers onSearchBlogs and onBlogClick', async () => {
    const { default: Dashboard } = await import('../pages/Dashboard.jsx')

    render(<Dashboard />)

    screen.getByText('Search Blogs').click()
    expect(console.log).toHaveBeenCalledWith('Searching blogs for:', 'query')

    screen.getByText('Click Blog').click()
    expect(console.log).toHaveBeenCalledWith('Blog clicked:', { id: 1, title: 'Sample Blog' })
  })
})

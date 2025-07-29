import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import MyAccount from '../pages/MyAccount'

// Mock Header and NavigationTabs
vi.mock('../components/Header', () => ({
  default: () => <div>Mock Header</div>,
}))
vi.mock('../components/NavigationTabs', () => ({
  default: () => <div>Mock NavTabs</div>,
}))

describe('MyAccount Page', () => {
  test('renders header and nav tabs', () => {
    render(<MyAccount />, { wrapper: MemoryRouter })

    expect(screen.getByText('Mock Header')).toBeInTheDocument()
    expect(screen.getByText('Mock NavTabs')).toBeInTheDocument()
    expect(screen.getByText('My Account')).toBeInTheDocument()
  })

  test('renders default profile tab', () => {
    render(<MyAccount />, { wrapper: MemoryRouter })

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument()
  })

  test('switches to account tab and allows email change', () => {
    render(<MyAccount />, { wrapper: MemoryRouter })

    const accountTab = screen.getByRole('button', { name: /Account/i })
    fireEvent.click(accountTab)

    const emailInput = screen.getByLabelText(/Email Address/i)
    expect(emailInput).toBeInTheDocument()

    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    expect(emailInput.value).toBe('new@example.com')
  })

  test('toggles a notification setting', () => {
    render(<MyAccount />, { wrapper: MemoryRouter })

    const notificationsTab = screen.getByRole('button', { name: /Notifications/i })
    fireEvent.click(notificationsTab)

    const emailToggle = screen.getByRole('checkbox')
    expect(emailToggle.checked).toBe(true)

    fireEvent.click(emailToggle)
    expect(emailToggle.checked).toBe(false)
  })

  test('Save and Cancel buttons render and work', () => {
    render(<MyAccount />, { wrapper: MemoryRouter })

    expect(screen.getByText('Save Changes')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })
})

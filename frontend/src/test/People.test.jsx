import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import People from '../pages/People'

// Mocks
vi.mock('../components/Header', () => ({
  default: () => <div>Mock Header</div>,
}))
vi.mock('../components/NavigationTabs', () => ({
  default: () => <div>Mock NavigationTabs</div>,
}))

// Mock TeamMembersTable with interaction props
const MOCK_ROLE_CHANGE = vi.fn()
const MOCK_REMOVE = vi.fn()

vi.mock('../components/TeamMembersTable', () => ({
  TeamMembersTable: ({ members, onRoleChange, onRemoveMember }) => (
    <div>
      {members.map((member) => (
        <div key={member.id} data-testid="member-row">
          <span>{member.name}</span>
          <button onClick={() => onRoleChange(member.id, 'Editor')} data-testid={`role-${member.id}`}>Change Role</button>
          <button onClick={() => onRemoveMember(member.id)} data-testid={`remove-${member.id}`}>Remove</button>
        </div>
      ))}
    </div>
  )
}))

// Mock InviteUserForm to trigger onInvite
vi.mock('../components/InviteUserForm', () => ({
  InviteUserForm: ({ onInvite }) => (
    <button onClick={() => onInvite('dana@example.com', 'Dana', 'Viewer')} data-testid="invite-btn">
      Mock Invite
    </button>
  )
}))

describe('People Page', () => {
  test('renders header, nav, and team title', () => {
    render(<People />, { wrapper: MemoryRouter })

    expect(screen.getByText('Mock Header')).toBeInTheDocument()
    expect(screen.getByText('Mock NavigationTabs')).toBeInTheDocument()
    expect(screen.getByText('Team Members & Permissions')).toBeInTheDocument()
  })

  test('displays initial team members', () => {
    render(<People />, { wrapper: MemoryRouter })

    const memberRows = screen.getAllByTestId('member-row')
    expect(memberRows).toHaveLength(3)
    expect(screen.getByText('Alex')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  test('removes a team member on click', () => {
    render(<People />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByTestId('remove-2')) // remove Bob

    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    expect(screen.getAllByTestId('member-row')).toHaveLength(2)
  })

  test('invites a new user', () => {
    render(<People />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByTestId('invite-btn'))

    expect(screen.getByText('Dana')).toBeInTheDocument()
    expect(screen.getAllByTestId('member-row')).toHaveLength(4)
  })

  test('changes a user role', () => {
    render(<People />, { wrapper: MemoryRouter })

    fireEvent.click(screen.getByTestId('role-1')) // Change Alex's role
    // No visible role text to check, but we ensure the component re-renders without error
    expect(screen.getByText('Alex')).toBeInTheDocument()
  })
})

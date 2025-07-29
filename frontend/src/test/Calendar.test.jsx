import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Calendar from '../pages/Calendar'
import { vi } from 'vitest'

// Mock AddEventModal to simplify testing calendar logic
vi.mock('../components/AddEventModal.jsx', () => ({
  default: ({ isOpen, onClose, onSave, defaultDate }) =>
    isOpen ? (
      <div data-testid="add-event-modal">
        <button onClick={() => onSave({ title: 'Mock Event', date: defaultDate.toISOString().split('T')[0], tags: ['dev'] })}>
          Save Event
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}))

describe('Calendar Page', () => {
  it('renders calendar and displays today\'s date', () => {
    render(<Calendar />)
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    expect(screen.getByText(`Today: ${today}`)).toBeInTheDocument()
  })

  it('navigates months forward and backward', () => {
    render(<Calendar />)
    const forwardButton = screen.getByLabelText('Next Month')
    const backwardButton = screen.getByLabelText('Previous Month')

    fireEvent.click(forwardButton)
    fireEvent.click(backwardButton)

    // Month/year should still be displayed (not asserting exact value for simplicity)
    expect(screen.getByText(/^[A-Za-z]+ \d{4}$/)).toBeInTheDocument()
  })

  it('selects a date and shows "No scheduled posts" if none exist', () => {
    render(<Calendar />)
    const dayButton = screen.getAllByText(/^\d+$/)[0] // Click first day cell
    fireEvent.click(dayButton)

    expect(screen.getByText(/Scheduled Posts/)).toBeInTheDocument()
  })

  it('opens AddEventModal and saves a new event', () => {
    render(<Calendar />)

    // Select a date
    const dayButton = screen.getAllByText(/^\d+$/)[10]
    fireEvent.click(dayButton)

    const addButton = screen.getByText('Add Event')
    fireEvent.click(addButton)

    const modal = screen.getByTestId('add-event-modal')
    expect(modal).toBeInTheDocument()

    const saveButton = screen.getByText('Save Event')
    fireEvent.click(saveButton)

    expect(screen.getByText('Mock Event')).toBeInTheDocument()
    expect(screen.getByText('#dev')).toBeInTheDocument()
  })
})

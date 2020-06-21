import React from 'react'
import { render, fireEvent, getByTestId } from '@testing-library/react'
import { Signup } from './signup'

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe('Signup', () => {

  it('Disables submit button correctly', () => {
    const { container } = render(<Signup/>)
    const submitButton = container.querySelector('.submitButton')
    const firstNameInput = getByTestId(container, 's-firstName')
    const lastNameInput = getByTestId(container, 's-lastName')
    const passwordInput = getByTestId(container, 's-password')
    const emailInput = getByTestId(container, 's-email')
    const confirmPasswordInput = getByTestId(container, 's-confirmPassword')

    expect(submitButton).toBeDisabled()

    fireEvent.change(firstNameInput, { target: { value: 'TestUser' } })
    fireEvent.blur(firstNameInput)
    fireEvent.change(lastNameInput, { target: { value: 'TestUserLast' } })
    fireEvent.blur(lastNameInput)
    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.blur(passwordInput)
    fireEvent.change(emailInput, { target: { value: 'testUserJest@test.com' } })
    fireEvent.blur(emailInput)
    fireEvent.change(confirmPasswordInput, { target: { value: '12345678' } })
    fireEvent.blur(confirmPasswordInput)

    expect(submitButton).not.toBeDisabled()
  })

})
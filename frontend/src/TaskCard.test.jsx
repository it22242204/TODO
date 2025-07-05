import React from 'react';import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './components/TaskCard';

describe('TaskCard', () => {
  const mockTask = {
    id: 1,
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
  };
  const mockOnDone = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders task title and description', () => {
    render(<TaskCard task={mockTask} onDone={mockOnDone} onDelete={mockOnDelete} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('disables done button when task is completed', () => {
    render(<TaskCard task={{ ...mockTask, completed: true }} onDone={mockOnDone} onDelete={mockOnDelete} />);
    expect(screen.getByTestId('done-button-1')).toBeDisabled();
  });

  it('calls onDelete when delete button is clicked', () => {
    render(<TaskCard task={mockTask} onDone={mockOnDone} onDelete={mockOnDelete} />);
    fireEvent.click(screen.getByTestId('delete-button-1'));
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
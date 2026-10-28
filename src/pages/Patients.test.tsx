import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import Patients from './Patients';

// 1. Mock the GraphQL Client
vi.mock('../lib/graphqlClient', () => ({
  graphqlClient: {
    request: vi.fn().mockResolvedValue({
      posts: {
        data: [
          { id: '1', title: 'Mocked Patient Data', body: 'Test body' }
        ]
      }
    })
  }
}));

describe('Patients Page', () => {
  it('renders the table headers and the "Add Patient" button', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Patients />
        </MemoryRouter>
      </Provider>
    );

    // Check if the UI elements are on the screen using native Vitest assertions
    expect(screen.getByText('Patients')).toBeTruthy();
    expect(screen.getByText('+ Add Patient')).toBeTruthy();
    
    // Check if the table headers are rendered
    expect(screen.getByText('Patient ID')).toBeTruthy();
    expect(screen.getByText('Status')).toBeTruthy();

    // Wait for the mocked GraphQL data to load and appear in the document
    const apiPatient = await screen.findByText(/Mocked Patient Data/i);
    expect(apiPatient).toBeTruthy();
  });
});
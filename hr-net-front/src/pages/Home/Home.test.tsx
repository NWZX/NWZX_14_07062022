import { fireEvent, render, screen, configure } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Employee } from 'util/Interface';
import Home from './Home';

configure({ testIdAttribute: 'id' });

const testEmployee: Omit<Employee, 'id'> = {
    firstName: 'John',
    lastName: 'Doe',
    startDate: '2020-01-01',
    birthDate: '2020-01-01',
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
    },
    department: 'IT',
};

test('Then open a success modal', () => {
    render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>,
    );

    const inputFirstName = screen.getByTestId('first-name') as HTMLInputElement;
    fireEvent.change(inputFirstName, { target: { value: testEmployee.firstName } });
    expect(inputFirstName.value).toBe(testEmployee.firstName);

    const inputLastName = screen.getByTestId('last-name') as HTMLInputElement;
    fireEvent.change(inputLastName, { target: { value: testEmployee.lastName } });
    expect(inputLastName.value).toBe(testEmployee.lastName);

    const inputStartDate = screen.getByTestId('start-date') as HTMLInputElement;
    fireEvent.change(inputStartDate, { target: { value: testEmployee.startDate } });
    expect(inputStartDate.value).toBe(testEmployee.startDate);

    const inputBirthDate = screen.getByTestId('date-of-birth') as HTMLInputElement;
    fireEvent.change(inputBirthDate, { target: { value: testEmployee.birthDate } });
    expect(inputBirthDate.value).toBe(testEmployee.birthDate);

    const inputStreet = screen.getByTestId('street') as HTMLInputElement;
    fireEvent.change(inputStreet, { target: { value: testEmployee.address.street } });
    expect(inputStreet.value).toBe(testEmployee.address.street);

    const inputCity = screen.getByTestId('city') as HTMLInputElement;
    fireEvent.change(inputCity, { target: { value: testEmployee.address.city } });
    expect(inputCity.value).toBe(testEmployee.address.city);

    const inputState = screen.getByTestId('state') as HTMLInputElement;
    fireEvent.change(inputState, { target: { value: testEmployee.address.state } });
    expect(inputState.value).toBe(testEmployee.address.state);

    const inputZipCode = screen.getByTestId('zip-code') as HTMLInputElement;
    fireEvent.change(inputZipCode, { target: { value: testEmployee.address.zipCode } });
    expect(inputZipCode.value).toBe(testEmployee.address.zipCode);

    const inputDepartment = screen.getByTestId('department') as HTMLInputElement;
    fireEvent.change(inputDepartment, { target: { value: testEmployee.department } });
    expect(inputDepartment.value).toBe(testEmployee.department);

    const submitButton = screen.getByTestId('submit-button') as HTMLButtonElement;
    fireEvent.click(submitButton);

    const element = screen.getByText('Employee Created');
    expect(element).toBeInTheDocument();
});

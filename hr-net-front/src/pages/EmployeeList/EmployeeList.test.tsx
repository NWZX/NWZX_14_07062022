import { render, screen, configure } from '@testing-library/react';
import { useEffect } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DataContextProvider, useEmployeeContext } from 'util/DataContext';
import { Employee } from 'util/Interface';
import EmployeeList from './EmployeeList';

configure({ testIdAttribute: 'id' });

const testEmployee: Omit<Employee, 'id'> = {
    firstName: 'John',
    lastName: 'Doe',
    startDate: '2020-01-01',
    birthDate: '1995-01-01',
    address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
    },
    department: 'IT',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const customRender = (ui: JSX.Element, { ...renderOptions }) => {
    return render(<DataContextProvider>{ui}</DataContextProvider>, renderOptions);
};

test('Then show no records in the table', () => {
    customRender(
        <MemoryRouter>
            <EmployeeList />
        </MemoryRouter>,
        {},
    );

    const element = screen.getByText('There are no records to display');
    expect(element).toBeInTheDocument();
});

test('Then show a new records in the table', () => {
    const ContextHelper = (): JSX.Element | null => {
        const { addEmployee } = useEmployeeContext();
        useEffect(() => {
            addEmployee(testEmployee);
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            return () => {};
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return null;
    };

    customRender(
        <MemoryRouter>
            <ContextHelper />
            <EmployeeList />
        </MemoryRouter>,
        {},
    );

    const fistName = screen.getByText(testEmployee.firstName);
    const lastName = screen.getByText(testEmployee.lastName);
    const startDate = screen.getByText(testEmployee.startDate);
    const birthDate = screen.getByText(testEmployee.birthDate);
    const street = screen.getByText(testEmployee.address.street);
    const city = screen.getByText(testEmployee.address.city);
    const state = screen.getByText(testEmployee.address.state);
    const zipCode = screen.getByText(testEmployee.address.zipCode);
    const department = screen.getByText(testEmployee.department);

    expect(fistName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(birthDate).toBeInTheDocument();
    expect(street).toBeInTheDocument();
    expect(city).toBeInTheDocument();
    expect(state).toBeInTheDocument();
    expect(zipCode).toBeInTheDocument();
    expect(department).toBeInTheDocument();
});

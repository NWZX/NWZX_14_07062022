import { Modal } from '@nwzx/hr-net-front-modal';
import Header from 'components/Header/Header';
import InputLabel from 'components/InputLabel/InputLabel';
import { mockedStates } from 'data/mockedData';
import React, { useState } from 'react';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import 'react-multi-date-picker/styles/layouts/mobile.css';
import Select from 'react-select';
import { useEmployeeContext } from 'util/DataContext';
import { Employee, Leaves } from 'util/Interface';
import './Home.scss';

interface Props {}

const departementsList = ['Sales', 'Marketing', 'Engineering', 'Human Resources', 'Legal'];

type keyOfEmployee = Leaves<Employee, 2>;

const Home: React.FC<Props> = () => {
    const { addEmployee } = useEmployeeContext();
    const [openModal, setOpenModal] = useState(false);
    const [formState, setFormState] = useState<Omit<Employee, 'id'>>({
        firstName: '',
        lastName: '',
        birthDate: new Date().toISOString(), //Current date minus 18 years
        startDate: new Date().toISOString(),
        address: {
            street: '',
            city: '',
            zipCode: '',
            state: '',
        },
        department: '',
    });
    const setObjectState = (key: keyOfEmployee, value: unknown): void => {
        const nestedObject = key.split('.');
        if (nestedObject.length > 1) {
            setFormState({
                ...formState,
                [nestedObject[0]]: {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    ...formState[nestedObject[0]],
                    [nestedObject[1]]: value,
                },
            });
        } else {
            setFormState({ ...formState, [key]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addEmployee(formState);
        setOpenModal(true);
    };
    const customStyles = {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        valueContainer: (provided: any) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
        }),
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        input: (provided: any) => ({
            ...provided,
            margin: 0,
        }),
    };

    return (
        <div>
            <Header title="Create Employee" />
            <div className="home-container">
                <form action="#" id="create-employee" onSubmit={handleSubmit}>
                    <InputLabel
                        required
                        type="text"
                        id="first-name"
                        label="First Name"
                        value={formState.firstName}
                        onChange={(e) => setObjectState('firstName', e.target.value)}
                    />
                    <InputLabel
                        required
                        type="text"
                        id="last-name"
                        label="Last Name"
                        value={formState.lastName}
                        onChange={(e) => setObjectState('lastName', e.target.value)}
                    />
                    <label htmlFor="date-of-birth">Date of Birth</label>
                    <DatePicker
                        required
                        id="date-of-birth"
                        className="rmdp-mobile"
                        inputClass="rmdp-mobile-input"
                        value={new Date(formState.birthDate)}
                        onChange={(date) =>
                            date && setObjectState('birthDate', (date as DateObject).toDate().toISOString())
                        }
                    />
                    <label htmlFor="start-date">Start Date</label>
                    <DatePicker
                        required
                        id="start-date"
                        className="rmdp-mobile"
                        inputClass="rmdp-mobile-input"
                        value={new Date(formState.startDate)}
                        onChange={(date) =>
                            date && setObjectState('startDate', (date as DateObject).toDate().toISOString())
                        }
                    />
                    <fieldset className="address">
                        <legend>Address</legend>
                        <InputLabel
                            required
                            type="text"
                            id="street"
                            label="Street"
                            value={formState.address.street}
                            onChange={(e) => setObjectState('address.street', e.target.value)}
                        />
                        <InputLabel
                            required
                            type="text"
                            id="city"
                            label="City"
                            value={formState.address.city}
                            onChange={(e) => setObjectState('address.city', e.target.value)}
                        />
                        <label htmlFor="state">State</label>
                        <Select
                            name="state"
                            inputId="state"
                            styles={customStyles}
                            onChange={(e) => setObjectState('address.state', e?.value)}
                            options={mockedStates.map((state) => {
                                return { value: state.abbreviation, label: state.name };
                            })}
                        />
                        <InputLabel
                            required
                            type="number"
                            id="zip-code"
                            label="Zip Code"
                            value={formState.address.zipCode}
                            onChange={(e) => setObjectState('address.zipCode', e.target.value)}
                        />
                    </fieldset>
                    <label htmlFor="department">Department</label>
                    <Select
                        name="department"
                        inputId="department"
                        styles={customStyles}
                        onChange={(e) => setObjectState('department', e?.value.toString())}
                        options={departementsList.map((department) => {
                            return { value: department, label: department };
                        })}
                    />
                    <button type="submit" id="submit-button">
                        Save
                    </button>
                </form>
            </div>
            <Modal onClose={() => setOpenModal(false)} open={openModal} title="Employee Created"></Modal>
        </div>
    );
};

export default Home;

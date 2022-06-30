import Header from 'components/Header/Header';
import { useMemo, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { useEmployeeContext } from 'util/DataContext';
import { Employee } from 'util/Interface';
import './EmployeeList.scss';

interface Props {}

createTheme(
    'default',
    {
        text: {
            primary: '#333333',
            secondary: '#333333',
        },
        background: {
            default: '#f8f7fa',
        },
        context: {
            background: '#333333',
            text: '#333333',
        },
        divider: {
            default: 'transparent',
        },
        button: {
            default: '#333333',
            focus: '#595959',
            hover: '#7f7f7f',
            disabled: '#cbcbcb',
        },
        sortFocus: {
            default: '#333333',
        },
    },
    'dark',
);

const columns = [
    {
        name: 'First Name',
        selector: (row: Employee) => row.firstName,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: (row: Employee) => row.lastName,
        sortable: true,
    },
    {
        name: 'Start Date',
        selector: (row: Employee) => row.startDate,
        sortable: true,
    },
    {
        name: 'Departement',
        selector: (row: Employee) => row.department,
        sortable: true,
    },
    {
        name: 'Birth Date',
        selector: (row: Employee) => row.birthDate,
        sortable: true,
    },
    {
        name: 'Street',
        selector: (row: Employee) => row.address.street,
        sortable: true,
    },
    {
        name: 'City',
        selector: (row: Employee) => row.address.city,
        sortable: true,
    },
    {
        name: 'State',
        selector: (row: Employee) => row.address.state,
        sortable: true,
    },
    {
        name: 'Zip Code',
        selector: (row: Employee) => row.address.zipCode,
        sortable: true,
    },
];

const EmployeeList: React.FC<Props> = () => {
    const { employee } = useEmployeeContext();
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filteredItems = employee?.filter((item) => {
        return (
            item.firstName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.lastName.toLowerCase().includes(filterText.toLowerCase()) ||
            item.startDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.department.toLowerCase().includes(filterText.toLowerCase()) ||
            item.birthDate.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.street.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.city.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.state.toLowerCase().includes(filterText.toLowerCase()) ||
            item.address.zipCode.toLowerCase().includes(filterText.toLowerCase())
        );
    });
    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = (): void => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <input
                id="search"
                type="text"
                className="search-input"
                placeholder="Search"
                aria-label="Search Input"
                value={filterText}
                onChange={(e) => {
                    if (e.target.value.length > 0) {
                        setFilterText(e.target.value);
                    } else {
                        handleClear();
                    }
                }}
            />
        );
    }, [filterText, resetPaginationToggle]);

    return (
        <div>
            <Header title="Current Employees" />
            <div id="employee-div" className="list-e-container">
                <div>
                    <DataTable
                        columns={columns}
                        data={filteredItems || []}
                        pagination
                        paginationResetDefaultPage={resetPaginationToggle}
                        subHeader
                        subHeaderComponent={subHeaderComponentMemo}
                        theme="default"
                    />
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;

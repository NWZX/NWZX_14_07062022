import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/Home';
import EmployeeList from 'pages/EmployeeList/EmployeeList';
import { DataContextProvider } from 'util/DataContext';

const App = (): JSX.Element => {
    return (
        <div className="App">
            <DataContextProvider>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list-employee" element={<EmployeeList />} />
                </Routes>
            </DataContextProvider>
        </div>
    );
};

export default App;

import AddUserIcon from 'icons/AddUserIcon';
import ViewListIcon from 'icons/ViewListIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import './Header.scss';

interface Props {
    title: string;
}

const Header: React.FC<Props> = ({ title }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isLocation = (path: string): boolean => location.pathname === path;
    return (
        <header className="header">
            <div className="header-left">
                <h1>HRnet</h1>
                <div className="header-separator" />
                <h2>{title}</h2>
            </div>
            <div className="header-center"></div>
            <div className="header-right">
                <button className="header-button" disabled={isLocation('/')} onClick={() => navigate('/')}>
                    <AddUserIcon color="#333333" style={{ width: '23px', height: '23px' }} />
                    <span>Add User</span>
                </button>
                <button
                    className="header-button"
                    disabled={isLocation('/list-employee')}
                    onClick={() => navigate('/list-employee')}
                >
                    <ViewListIcon color="#333333" style={{ width: '23px', height: '23px' }} />
                    <span>View List</span>
                </button>
            </div>
        </header>
    );
};

export default Header;

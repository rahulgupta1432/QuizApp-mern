import '../../styles/Header.css'; // Import your CSS styles
import React from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';

const Header = () => {
    const handleLogout=async()=>{
        toast.success('Logout Successfully')
        localStorage.removeItem('token');
        localStorage.removeItem('auth');
        localStorage.clear();
    }
    return (
        <header className="header">
            <div className="logo">
            <NavLink to="/quiz/maths" className="logo-name">
                    <h2 style={{ color: '#2D2D2D', fontFamily: 'cursive' }}>Quiz Quick</h2>
                </NavLink>

            </div>
            <div className="search-container">
                <input type="text" placeholder="Search..." className="search-input" />
            </div>
            <nav className="nav-links">
                <ul>
                    <li>
                        <NavLink to="#" activeClassName="active">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" activeClassName="active">Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/leaderboard" activeClassName="active">Quizzes</NavLink>
                    </li>
                    <li>
                        <NavLink to="#" activeClassName="active">Settings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeClassName="active" onClick={handleLogout}>Logout</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

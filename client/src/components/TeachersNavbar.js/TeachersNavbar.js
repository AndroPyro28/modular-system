import React, { useEffect } from 'react'
import './nav.css'
import { useSelector } from 'react-redux';
import Cookie from 'js-cookie'
function TeachersNavbar() {
    const { currentUser } = useSelector(state => state.authReducer);
    const handleDropDown = () => {
        let dropdownBox = document.querySelector(".hidden__box");
        dropdownBox.classList.toggle("dropdown__active")
    }

    const handleLogout = () => {
        Cookie.remove("userToken");
        window.localStorage.clear();
        window.location.reload();
    }
    
    const currentUrl = window.location.pathname;

    return (
        <nav className="protectedNav">
            <div className="teachers__portal" onClick={() => window.location.href="/teacher/dashboard"}> Teachers Portal</div>
            <ul>
                {
                    currentUrl === "/teacher/dashboard" ? (<>
                    <a href='/teacher/dashboard' className="navActive">
                        <li><i className="fas fa-chalkboard-teacher "></i> Dashboard</li>
                    </a>
                    </>):

                    (<>
                    <a href='/teacher/dashboard'>
                        <li><i className="fas fa-chalkboard-teacher "></i> Dashboard</li>
                    </a>
                    </>)
                }
                
                <a onClick={handleDropDown} className="user">
                    <li><i className="fas fa-user"></i> {currentUser.firstname} <i className="fas fa-caret-down"></i>
                        <div className="hidden__box">                            
                            <a onClick = {handleLogout} ><i class="fas fa-sign-out-alt"></i> &nbsp; logout</a>
                        </div>
                    </li>
                </a>
            </ul>
        </nav>
    )
}

export default TeachersNavbar

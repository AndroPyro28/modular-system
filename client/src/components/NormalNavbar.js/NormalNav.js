import React from 'react'
import './normalnav.css'
import { NavLink } from 'react-router-dom';
function NormalNav() {
    const currentUrl = window.location.pathname;
    return (
        <nav className="normal__navbar">
            <ul>
                {/* <NavLink className="navButton" to="/login/teacher" activeClassName="btn">asdasd</NavLink> */}
                {
                    currentUrl === "/" ? (<>
                        <a className="navButton navActive" href="/"><li> <i class="fas fa-home"></i> Home</li></a>
                    </>) 
                    :
                        (<>
                            <a className="navButton" href="/"><li> <i class="fas fa-home"></i> Home</li></a>

                        </>)

                }

                {
                    currentUrl === "/login/teacher" ?

                        (<>
                            <a className="navButton navActive" href="/login/teacher"><li> <i class="fas fa-chalkboard-teacher"></i> Teachers portal</li></a>
                        </>) :

                        (<>
                            <a className="navButton " href="/login/teacher"><li> <i class="fas fa-chalkboard-teacher"></i> Teachers portal</li></a>
                        </>)
                }

                {
                    currentUrl === "/login/student" ?

                        (<>
                <a className="navButton navActive" href="/login/student"><li> <i class="fas fa-user-graduate"></i> Students portal</li></a>
                            
                        </>) :

                        (<>
                <a className="navButton" href="/login/student"><li> <i class="fas fa-user-graduate"></i> Students portal</li></a>
                        </>)
                }
            </ul>
        </nav>
    )
}

export default NormalNav

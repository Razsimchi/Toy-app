
import { NavLink } from 'react-router-dom'

export function AppHeader() {

    return (
        <header className="app-header">
            <nav className="nav-container">
                <NavLink className="nav-link" to="/">Home</NavLink> 
                <NavLink className="nav-link" to="/toy">Toys</NavLink> 
                <NavLink className="nav-link" to="/about">About</NavLink> 
            </nav>
        </header>
    )
}


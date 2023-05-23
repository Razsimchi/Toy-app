
import { useDispatch, useSelector } from 'react-redux'

import { UserMsg } from './user-msg.jsx'

export function AppFooter() {

    return (
        <footer className="app-footer">
            <div className="footer-content">
            <p className="footer-text">
                Coffeerights to all 
            </p>
            <UserMsg />
            </div>
        </footer>
    )
}

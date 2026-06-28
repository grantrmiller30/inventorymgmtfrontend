import { useEffect } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const Header = () => {
    const { username, userId} = useAuth()

    const navigate = useNavigate()
    const {pathname} = useLocation()

    const[sendLogout, {isLoading, isSuccess, isError, error}] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewItemClicked = () => navigate('/new')
    const onItemsClicked = () => navigate('/inv')
    const onLoginClicked = () => navigate('/login')

    let dashClass = null
//    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
//        dashClass = "dash-header__container--small"
//    }

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    let newItemButton = userId ? (
            <button className="icon-button" title="New Note" onClick={onNewItemClicked}>
                Add an Item
            </button>
        ) : null

    let itemButton = (
            <button className="icon-button" title="Notes" onClick={onItemsClicked}>
                To Inventory     
            </button>
        )

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            Logout
        </button>
    )

    const errClass = isError ? "errmsg" : "offscreen"

    let buttonContent
    if(isLoading) {
        buttonContent = <p>Logging Out...</p>
    } else {
        buttonContent = (
            <>
                {newItemButton}
                {itemButton}
                {userId ? logoutButton : null}
            </>
        )
    }

    const content = (
        <>
        <p className={errClass}>{error?.data?.message}</p>
        
        <header className="dash-header">
            {userId ? <section className="dash-header__user">Current User: {username}</section> : <section className="dash-header__user">Guest</section>}
            <div className={`dash-header__container`}>
                <nav className="dash-header__nav">
                    {buttonContent}
                    {userId ? <></> : <button className="icon-button" title="Login" onClick={onLoginClicked}>Login</button>}
                </nav>
            </div>
        </header>
        </>
    )
    return content
}
export default Header
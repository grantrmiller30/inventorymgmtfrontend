import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'

const Header = () => {
    const { username, userId} = useAuth()

    const navigate = useNavigate()

    const[sendLogout, {isLoading, isSuccess, isError, error}] = useSendLogoutMutation()

    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    const onNewItemClicked = () => navigate('/items/new')
    const onItemsClicked = () => navigate('/inv')
    const onLoginClicked = () => navigate('/login')
    const onNewUserClicked = () => navigate('/users/new')

    const onLogoutClicked = () => {
        sendLogout()
        navigate('/')
    }

    const newItemButton = userId ? (
            <button className="dash-button" title="New Note" onClick={onNewItemClicked}>
                Add Item
            </button>
        ) : null

    const newUserButton = userId ? null : (
        <button className="dash-button" title="New User" onClick={onNewUserClicked}>
            Create Account
        </button>
    )

    const itemButton = (
            <button className="dash-button" title="Notes" onClick={onItemsClicked}>
                Inventory     
            </button>
        )

    const logoutButton = userId ? (
        <button
            className="dash-button"
            title="Logout"
            onClick={onLogoutClicked}
        >
            Logout
        </button>
    ) : null

    const loginButton = userId ? null : (
        <button className="dash-button" title="Login" onClick={onLoginClicked}>
            Login
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
                {logoutButton}
                {newUserButton}
                {loginButton}
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
                </nav>
            </div>
        </header>
        </>
    )
    return content
}
export default Header
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

import { useAddNewUserMutation } from "./usersApiSlice"
import useTitle from '../../hooks/useTitle'

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,32}$/

const NewUser = () => {
    const [addNewUser, { isLoading, isSuccess, isError, error }] = useAddNewUserMutation()

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')

    useEffect(() => {setValidUsername(USER_REGEX.test(username))}, [username])
    useEffect(() => {setValidPassword(PWD_REGEX.test(password))}, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setFirst('')
            setLast('')
            navigate('/inv')
        }
    }, [isSuccess, navigate])

    useTitle("New User")

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)
    const onFirstChanged = e => setFirst(e.target.value)
    const onLastChanged = e => setLast(e.target.value)

    const canSave = [validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if(canSave) {
            await addNewUser({ username, password, firstname: first, lastname: last })
        }
    }

    const errClass = isError ? "errmsg" :"offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' :''
    const validPwdClass = !validPassword ? 'form__input--incomplete' :''

    const content =  (
        <>
        <p className={errClass}>{error?.data?.message}</p>
        <form className="form" onSubmit={onSaveUserClicked}>
            <div className="form__title-row">
                <h2>New User</h2>
                <div className="form__action-buttons">
                    <button className="icon-button" title="Save" disabled={!canSave}>
                        <FontAwesomeIcon icon={faSave}/>
                    </button>
                </div>
            </div>
            <label className="form__label" htmlFor="username">Username: <span className="nowrap">[3-20 letters]</span></label>
            <input className={`form__input ${validUserClass}`} id="username" name="username" type="text" autoComplete="off" value={username} onChange={onUsernameChanged}/>

            <label className="form__label" htmlFor="password">Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
            <input className={`form__input ${validPwdClass}`} id="password" name="password" type="text" value={password} onChange={onPasswordChanged}/>

            <label className="form__label" htmlFor="firstname">First Name:</label>
            <input className={`form__input`} id="first" name="first" value={first} onChange={onFirstChanged}/>

            <label className="form__label" htmlFor="lastname">Last Name:</label>
            <input className={`form__input`} id="last" name="last" value={last} onChange={onLastChanged}/>

        </form>
        </>
    )

    return content
}

export default NewUser
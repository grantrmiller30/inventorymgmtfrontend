import { Outlet, Link } from "react-router-dom"
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from 'react-redux'
import { selectCurrentToken } from "./authSlice"
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh().unwrap()
                setTrueSuccess(true)
            }
            catch (err) {
                console.error(err)
            }
        }

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            if (!token && persist) verifyRefreshToken()
        }

        return () => {
            effectRan.current = true
        }
    }, [])


    let content
    if (!persist) {
        // Guest, or user never checked "remember me" — never attempted refresh
        content = <Outlet />
    } else if (isLoading) {
        // Actively refreshing — show spinner
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) {
        // Refresh failed (expired/invalid/missing token) — treat as logged out, move on
        console.log(error)
        content = <Outlet />
    } else if (isSuccess) {
        // Refresh succeeded — token is in store, proceed
        content = <Outlet />
    } else if (token && isUninitialized) {
        // Already had a token (e.g. came from login redirect within same session), never needed to refresh
        content = <Outlet />
    } else {
        // isUninitialized and no token — effect hasn't kicked in yet (first tick) or persist is true but effect skipped
        content = <PulseLoader color={"#FFF"} />
    }

    return <Outlet />
}
export default PersistLogin
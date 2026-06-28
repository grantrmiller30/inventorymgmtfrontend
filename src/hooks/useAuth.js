import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { selectCurrentToken } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    console.log("Using useAuth hook")
    
    if (token) {
        const decoded = jwtDecode(token)
        console.log(decoded)
        const { username, userId } = decoded.UserInfo
        console.log("UserID: " + userId)
        return { username, userId }
    }
    console.log("Empty token")
    return { username: 'none', userId : null }
}
export default useAuth
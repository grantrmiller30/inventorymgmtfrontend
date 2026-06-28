import { useSelector } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import { selectCurrentToken } from "../features/auth/authSlice"

const useAuth = () => {
    const token = useSelector(selectCurrentToken)

    if (token) {
        const decoded = jwtDecode(token)
        const { username, userId } = decoded.UserInfo
        return { username, userId }
    }
    return { username: 'none', userId : null }
}
export default useAuth
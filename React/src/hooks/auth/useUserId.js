import { useEffect, useState } from 'react'
import * as Keychain from 'react-native-keychain'

const useUserId = () => {
    const [ userId, setUserId ] = useState()

    useEffect(() => {
        const getId = async () => {
            const creds = await Keychain.getGenericPassword()
            if (creds && creds.username === 'auth') {
                const parsed = JSON.parse(creds.password)
                setUserId(parsed.userId)
            }
        }

        getId()
    }, [])

    return (userId)
}

export default useUserId
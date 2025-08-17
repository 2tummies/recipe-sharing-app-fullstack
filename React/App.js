import React, { useEffect } from 'react'
import { AuthProvider, AuthContext } from './src/authentication/AuthContext'
import MainNav from './src/MainNav'
import { useAuthToken } from './src/hooks/auth/useAuthToken'
import { setupInterceptor } from './src/api/api'

function App() {
  const tokenGetter = useAuthToken()
  useEffect(() => {
    setupInterceptor(tokenGetter)
  }, [tokenGetter])

  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>
  )
}

export default App
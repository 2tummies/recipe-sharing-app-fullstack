import React from 'react'
import { AuthProvider, AuthContext } from './src/authentication/AuthContext'
import MainNav from './src/MainNav'

function App() {
  return (
    <AuthProvider>
      <MainNav />
    </AuthProvider>
  )
}

export default App
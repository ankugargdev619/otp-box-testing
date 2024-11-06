import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { OtpPage } from './components/OtpPage'

function App() {

  return (
    <div className='flex bg-[#002B5A] align-middle justify-center w-screen h-screen text-center'>
      <OtpPage />
    </div>
  )
}

export default App

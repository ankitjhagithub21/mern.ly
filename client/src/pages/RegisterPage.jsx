import React from 'react'
import AuthForm from '../components/AuthForm'
import { Link } from 'react-router-dom'

const RegisterPage = () => {
  return (
    <div className='h-screen w-full flex flex-col gap-5 items-center justify-center p-5'>
        <AuthForm title="Create Your Account" type={"register"}/>
         <p className="text-sm">Already have an account ? <Link to={"/login"} className="underline">Login</Link> </p>
    </div>
  )
}

export default RegisterPage
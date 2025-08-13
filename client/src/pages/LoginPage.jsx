import AuthForm from "../components/AuthForm"
import {Link} from "react-router-dom"

const LoginPage = () => {
  return (
    <div className='h-screen w-full flex flex-col gap-5 items-center justify-center p-5'>
        <AuthForm title="Login to your account"/>
         <p className="text-sm">Don't have an account ? <Link to={"/register"} className="underline">Register here</Link> </p>
    </div>
  )
}

export default LoginPage
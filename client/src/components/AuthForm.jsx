import { useState } from "react"
import {  useNavigate } from "react-router-dom"
import {  useDispatch } from "react-redux"
import Loader from "./Loader";
import toast from "react-hot-toast";
import { setUser } from "../redux/authSlice";


const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

const AuthForm = ({title,type}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [isLoading,setIsLoading] = useState(false)
   
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true)
        try{
            const res = await fetch(`${baseUrl}/${type}`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify({email,password})
            })
            const data = await res.json();
           
            if(data.success){
                toast.success(data.message)
                setEmail('')
                setPassword('')
                dispatch(setUser(data.data))
                navigate("/")

            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
            toast.error("Something went wrong !")
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <form className='max-w-md p-5  w-full flex flex-col space-y-4' onSubmit={handleSubmit}>
            <h1 className="text-center text-2xl mb-5">{title}</h1>
            <div>
                <label className="input input-primary validator w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </g>
                    </svg>
                    <input type="email" placeholder="mail@site.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                </label>

                <div className="validator-hint hidden">Enter valid email address</div>
            </div>
            <div>
                <label className="input input-primary validator w-full">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <path
                                d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                            ></path>
                            <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                        </g>
                    </svg>
                    <input
                        type="password"
                        required
                        placeholder="Password"
                        minLength="6"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be atleast 6 characters"
                        
                    />
                </label>
                <p className="validator-hint hidden">
                    Must be atleast 6 characters
                   
                </p>
            </div>
            <button className='btn btn-primary' type="submit" disabled={isLoading}>
                {
                    isLoading ? <Loader/> :'Submit'
                }
            </button>
           
        </form>


    )
}

export default AuthForm
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../redux/authSlice"
import toast from "react-hot-toast"


const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
                    method: "GET",
                    credentials: 'include'
                })
                const data = await res.json();
                if (data.success) {
                    dispatch(setUser(data.data))
                } else {
                    dispatch(setUser(null))
                }
            } catch (error) {
                dispatch(setUser(null))
            }
        }
        fetchUser()
    }, [])

    const handleLogout = async () => {
        try {
            await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`, {
                method: "POST",
                credentials: 'include'
            })

        } catch (error) {
            console.log("Logout error:", error)
        } finally {
            dispatch(setUser(null))
            toast.success("Logout successfully.")
        }
    }
    return (
        <header className="sticky w-full top-0 z-50">
            <div className="navbar bg-base-100 shadow-sm ">
                <div className="flex-1">
                    <Link to={"/"} className="btn btn-ghost text-xl">Mern<span className="text-success">Ly</span></Link>
                </div>
                <div className="flex gap-2">
                    {/* <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" /> */}
                    {
                        user && user?.email ? <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User Profile"
                                        src="https://cdn-icons-png.flaticon.com/512/219/219983.png" />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                <li className="p-2">
                                    {user.email}
                                </li>
                                <li><Link to={"/user/links"}>Your Links</Link></li>
                                <li onClick={handleLogout}><a>Logout</a></li>
                            </ul>
                        </div> : <div className="flex gap-2 items-center">
                            <Link className="btn btn-primary" to={"/login"}>
                                Login
                            </Link>
                            <Link className="btn btn-primary btn-outline" to={"/register"}>
                                Signup
                            </Link>
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Navbar
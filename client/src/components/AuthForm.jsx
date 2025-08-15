import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { setUser } from "../redux/authSlice";
// Optional icons (install: npm i lucide-react)
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/auth`;

const AuthForm = ({ title = "Login to your account", type = "login" }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setIsLoading(true);
    try {
      const res = await fetch(`${baseUrl}/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message || "Logged in");
        setEmail("");
        setPassword("");
        dispatch(setUser(data.data));
        navigate("/");
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="w-full mt-4 space-y-4" onSubmit={handleSubmit} >
      {/* Email */}
      <div className="form-control">
        <label className="label mb-2" htmlFor="email">
          <span className="label-text">Email</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 text-white z-10 -translate-y-1/2 ">
            <Mail className="w-4 h-4"  />
          </span>
          <input
            id="email"
            type="email"
            required
            placeholder="you@domain.com"
            className="input input-bordered w-full pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            autoFocus
          />
        </div>
      </div>

      {/* Password */}
      <div className="form-control">
        <label className="label mb-2" htmlFor="password">
          <span className="label-text">Password</span>
          <span className="label-text-alt">min 6 characters</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Lock className="w-4 h-4"  />
          </span>
          <input
            id="password"
            type={showPw ? "text" : "password"}
            required
            minLength={6}
            placeholder="••••••••"
            className="input input-bordered w-full pl-10 pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete={type === "login" ? "current-password" : "new-password"}
            title="Must be at least 6 characters"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
            onClick={() => setShowPw((s) => !s)}
            
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="checkbox checkbox-sm rounded-lg" />
            <span className="text-base-content/70">Remember me</span>
          </label>
          <span className="link link-hover">
            Forgot password?
          </span>
        </div>
      </div>

      <button className="btn btn-primary w-full" type="submit" disabled={isLoading}>
        {isLoading ? <Loader /> : 'Submit'}
      </button>

      

    </form>
  );
};

export default AuthForm;
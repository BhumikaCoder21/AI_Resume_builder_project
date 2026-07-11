import React from "react";
import { Lock, Mail, User2Icon } from "lucide-react";
import api from "../configs/api";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { login } from "../app/features/authSlice";

const Login = () => {
  const dispatch = useDispatch()
  const query = new URLSearchParams(window.location.search)
  const urlState = query.get('state');
  const [state, setState] = React.useState(urlState || "login");

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/users/${state}`, formData)
      dispatch(login(data))
      localStorage.setItem('token', data.token)
      toast.success(data.message)
    }
    
    catch (error) {
      toast(error?.response?.data?.message || error.message) 
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F172A] px-4">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-20 h-[450px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-700/30 to-transparent blur-3xl" />
        <div className="absolute bottom-10 right-10 h-[250px] w-[350px] rounded-full bg-gradient-to-bl from-purple-600/30 to-transparent blur-3xl" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 px-8 py-10 backdrop-blur-md"
      >
        <h1 className="text-center text-3xl font-semibold text-white">
          {state === "login" ? "Login" : "Sign Up"}
        </h1>

        <p className="mt-2 text-center text-sm text-gray-400">
          Please {state === "login" ? "login" : "sign up"} to continue
        </p>

        {state !== "login" && (
          <div className="mt-6 flex h-12 items-center rounded-full bg-white/10 px-5 ring-1 ring-white/20 focus-within:ring-indigo-500">
            <User2Icon className="mr-3 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
            />
          </div>
        )}

        <div className="mt-4 flex h-12 items-center rounded-full bg-white/10 px-5 ring-1 ring-white/20 focus-within:ring-indigo-500">
          <Mail className="mr-3 text-gray-400" size={18} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
          />
        </div>

        <div className="mt-4 flex h-12 items-center rounded-full bg-white/10 px-5 ring-1 ring-white/20 focus-within:ring-indigo-500">
          <Lock className="mr-3 text-gray-400" size={18} />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full bg-transparent text-white placeholder:text-gray-400 outline-none"
          />
        </div>

        <div className="mt-4 text-left">
          <button
            type="button"
            className="text-sm text-indigo-400 hover:text-indigo-300"
          >
            Forgot password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-5 h-12 w-full rounded-full bg-indigo-600 font-medium text-white transition hover:bg-indigo-500"
        >
          {state === "login" ? "Login" : "Sign Up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="mt-6 cursor-pointer text-center text-sm text-gray-400"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="ml-1 text-indigo-400 hover:underline">
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;

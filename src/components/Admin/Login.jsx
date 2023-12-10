import React, { useState } from 'react'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import adminAxios from '../../Axios/adminAxios.js';
const Login = () => {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const small = false;
  const outline = false;




  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(email, password, "ddddddddddddddddddddd")
    try {

      const data = { email, password }
      const res = await adminAxios.post('/adminlogin', data)
      const token = res.data.adminResult.token
      localStorage.setItem('admintoken', token)
      console.log(res, "sssssssssssssss")
      if (res.data.adminResult.message === 'You are logged') {
        navigate("/dashboard");
        toast.success(res.data.adminResult.message)

      }
      else {

        toast.error(res.message)

      }
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("An error occurred while logging in");
    }

  }
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-10 w-auto" src="./images/logo.png" alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to Admin</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
            <div>

              <label className="
        block 
        text-sm 
        font-medium 
        leading-6 
        text-gray-90">
                Email address</label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"

                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                peer
                w-full
                p-2
                pt-5
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                focus:border-black" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label


                  className="
          block 
          text-sm 
          font-medium 
          leading-6
           text-gray-900
           ">
                  Password</label>

              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"

                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
               peer
                w-full
                p-2
                pt-5
                font-light
                bg-white
                border-2
                rounded-md
                outline-none
                transition
                disabled:opacity-70
                disabled:cursor-not-allowed
                focus:border-black"/>
              </div>
            </div>

            <div>

              <button type="submit" className=
                {`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-rose-500'}
        ${outline ? 'border-black' : 'border-rose-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `} >
                Sign in
              </button>
            </div>
          </form>


        </div>
      </div>
    </>
  )
}

export default Login
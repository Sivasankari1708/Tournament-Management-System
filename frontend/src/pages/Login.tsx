import { useState } from "react"
import { useNavigate } from "react-router-dom"

import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "firebase/auth"

import { auth } from "../firebase"

function Login() {

  const [name, setName] = useState("")
  const [mobile, setMobile] = useState("")

  const navigate = useNavigate()

  const sendOTP = async () => {

    try {

      if (mobile.length !== 10) {

        alert("Enter valid mobile number")
        return

      }

      localStorage.setItem("name", name)
      localStorage.setItem("mobile", mobile)

      const verifier =
        new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          {
            size: "normal"
          }
        )

      const confirmationResult =
        await signInWithPhoneNumber(
          auth,
          `+91${mobile}`,
          verifier
        )

      ;(window as any).confirmationResult =
        confirmationResult

      alert("OTP Sent Successfully")

      navigate("/otp")

    }

    catch (error) {

      console.log(error)

      alert("Failed To Send OTP")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-gray-900 mb-3">

          Welcome Back

        </h1>

        <p className="text-gray-500 mb-8">

          Login to continue to TournamentHub

        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-5 outline-none focus:ring-2 focus:ring-black"
        />

        <input
          type="text"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-6 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={sendOTP}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >

          Continue

        </button>

        <div
          id="recaptcha-container"
          className="mt-6 flex justify-center"
        ></div>

      </div>

    </div>

  )

}

export default Login
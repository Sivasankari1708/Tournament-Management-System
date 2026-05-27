import { useState } from "react"
import { useNavigate } from "react-router-dom"

function OTP() {

  const [otp, setOTP] = useState("")

  const navigate = useNavigate()

  const verifyOTP = async () => {

    try {

      const confirmationResult =
        (window as any).confirmationResult

      if (!confirmationResult) {

        alert("Please send OTP first")
        return

      }

      await confirmationResult.confirm(otp)

      localStorage.setItem("token", "loggedin")

      alert("Login Successful")

      navigate("/home")

    }

    catch (error) {

      console.log(error)

      alert("Invalid OTP")

    }

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">

      <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-xl">

        <h1 className="text-4xl font-bold text-gray-900 mb-3">

          OTP Verification

        </h1>

        <p className="text-gray-500 mb-8">

          Enter the verification code sent to your mobile number.

        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e)=>setOTP(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-4 mb-6 outline-none focus:ring-2 focus:ring-black"
        />

        <button
          onClick={verifyOTP}
          className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition"
        >

          Verify OTP

        </button>

      </div>

    </div>

  )

}

export default OTP
import { useEffect,useState } from "react"

import { useParams } from "react-router-dom"

import NavBar from "../components/NavBar"

import api from "../services/api"

function Register(){

  const {id}=useParams()

  const [tournament,setTournament]=useState<any>(null)

  const [teamName,setTeamName]=useState("")

  const [captain,setCaptain]=useState("")

  const [email,setEmail]=useState("")

  const [phone,setPhone]=useState("")

  const [members,setMembers]=useState("")

  useEffect(()=>{

    fetchTournament()

  },[])

  const fetchTournament=async()=>{

    try{

      const response=await api.get(

        `/tournament/${id}`

      )

      setTournament(response.data)

    }

    catch(error){

      console.log(error)

    }

  }

  const getTeamSize=()=>{

    if(
      tournament?.name.includes("Cricket")
    ){

      return "11 Players"

    }

    if(
      tournament?.name.includes("Football")
    ){

      return "5 Players"

    }

    if(
      tournament?.name.includes("Chess")
    ){

      return "1 Player"

    }

    return "Not Specified"

  }

  const getFee=()=>{

    if(
      tournament?.name.includes("Cricket")
    ){

      return "₹1500"

    }

    if(
      tournament?.name.includes("Football")
    ){

      return "₹2000"

    }

    if(
      tournament?.name.includes("Chess")
    ){

      return "₹500"

    }

    return "₹1000"

  }

  const registerTeam=async()=>{

    try{

      const response=await api.post(

        "/register",

        {

          user_id:1,

          tournament_id:id,

          team_name:teamName

        }

      )

      alert(

        `Registration Successful\nRegistration No: ${response.data.registration_no}`

      )

    }

    catch(error){

      console.log(error)

      alert("Registration Failed")

    }

  }

  if(!tournament){

    return(

      <div className="min-h-screen flex justify-center items-center text-3xl font-bold">

        Loading...

      </div>

    )

  }

  return(

    <div className="min-h-screen bg-[#f5f7fb]">

      <NavBar/>

      <div className="max-w-7xl mx-auto px-8 py-14 grid lg:grid-cols-2 gap-12">

        {/* LEFT */}

        <div>

          <img
            src={tournament.image}
            className="w-full h-[420px] object-cover rounded-[32px] shadow-lg"
          />

          <h1 className="text-6xl font-bold text-[#0f172a] mt-8">

            {tournament.name}

          </h1>

          <p className="text-gray-600 text-xl mt-4 leading-9">

            {tournament.details}

          </p>

          {/* INFO */}

          <div className="bg-white rounded-[30px] shadow-sm p-8 mt-10">

            <h2 className="text-3xl font-bold text-[#0f172a] mb-8">

              Tournament Information

            </h2>

            <div className="space-y-6">

              <div className="flex justify-between items-center border-b pb-4">

                <span className="text-gray-500 text-lg">

                  Team Size

                </span>

                <span className="font-semibold text-xl">

                  {getTeamSize()}

                </span>

              </div>

              <div className="flex justify-between items-center border-b pb-4">

                <span className="text-gray-500 text-lg">

                  Registration Fee

                </span>

                <span className="font-semibold text-xl">

                  {getFee()}

                </span>

              </div>

              <div className="flex justify-between items-center">

                <span className="text-gray-500 text-lg">

                  Tournament Status

                </span>

                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">

                  Open

                </span>

              </div>

            </div>

          </div>

          {/* RULES */}

          <div className="bg-white rounded-[30px] shadow-sm p-8 mt-8">

            <details open>

              <summary className="text-3xl font-bold text-[#0f172a] cursor-pointer">

                Tournament Rules

              </summary>

              <div className="mt-8 space-y-4">

                {

                  Object.values(
                    tournament.rules
                  ).map(

                    (rule:any,index:number)=>(

                      <div
                        key={index}
                        className="bg-[#f8fafc] border border-gray-200 rounded-2xl px-5 py-4 text-lg text-gray-700"
                      >

                        {rule}

                      </div>

                    )

                  )

                }

              </div>

            </details>

          </div>

        </div>

        {/* RIGHT */}

        <div className="bg-white rounded-[35px] shadow-lg p-10 h-fit sticky top-10">

          <h1 className="text-5xl font-bold text-[#0f172a]">

            Team Registration

          </h1>

          <p className="text-gray-500 text-xl mt-4 leading-8">

            Complete the form below to confirm your slot.

          </p>

          <div className="mt-10 space-y-7">

            <div>

              <label className="block text-lg font-semibold mb-3">

                Team Name

              </label>

              <input
                type="text"
                value={teamName}
                onChange={(e)=>
                setTeamName(e.target.value)
                }
                placeholder="Enter team name"
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-3">

                Captain Name

              </label>

              <input
                type="text"
                value={captain}
                onChange={(e)=>
                setCaptain(e.target.value)
                }
                placeholder="Enter captain name"
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-3">

                Email Address

              </label>

              <input
                type="email"
                value={email}
                onChange={(e)=>
                setEmail(e.target.value)
                }
                placeholder="Enter email"
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-3">

                Contact Number

              </label>

              <input
                type="text"
                value={phone}
                onChange={(e)=>
                setPhone(e.target.value)
                }
                placeholder="Enter mobile number"
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            <div>

              <label className="block text-lg font-semibold mb-3">

                Number Of Players

              </label>

              <input
                type="text"
                value={members}
                onChange={(e)=>
                setMembers(e.target.value)
                }
                placeholder="Enter player count"
                className="w-full border border-gray-300 rounded-2xl p-5 text-lg outline-none focus:ring-2 focus:ring-black"
              />

            </div>

            <button
              onClick={registerTeam}
              className="w-full bg-black hover:bg-gray-800 text-white py-5 rounded-2xl text-xl font-semibold transition-all duration-300 mt-4"
            >

              Complete Registration

            </button>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Register
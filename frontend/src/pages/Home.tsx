import { useEffect,useState } from "react"

import NavBar from "../components/NavBar"
import TournamentCard from "../components/TournamentCard"

import api from "../services/api"

function Home(){

  const [tournaments,setTournaments]=useState([])

  useEffect(()=>{

    fetchTournament()

  },[])

  const fetchTournament=async()=>{

    try{

      const response=await api.get(
        "/tournament"
      )

      setTournaments(
        response.data
      )

    }

    catch(error){

      console.log(error)

    }

  }

  return(

    <div className="min-h-screen bg-[#f5f7fb]">

      <NavBar/>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="mb-14">

          <p className="text-blue-600 font-semibold uppercase tracking-widest mb-3">

            Explore

          </p>

          <h1 className="text-6xl font-bold text-[#0f172a] leading-tight">

            Popular Tournaments

          </h1>

          <p className="text-gray-600 text-xl mt-5 max-w-3xl leading-9">

            Join professional cricket, football, and chess competitions happening across India.

          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">

          {

            tournaments.map((t:any)=>(

              <TournamentCard

                key={t.id}

                id={t.id}

                name={t.name}

                details={t.details}

                image={t.image}

                entry_fee={t.entry_fee}

              />

            ))

          }

        </div>

      </div>

    </div>

  )

}

export default Home
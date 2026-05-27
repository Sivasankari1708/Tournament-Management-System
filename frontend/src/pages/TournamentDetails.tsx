import {useEffect,useState} from "react"
import {useParams,useNavigate} from "react-router-dom"

import api from "../services/api"
import NavBar from "../components/NavBar"

function TournamentDetails(){

const {id}=useParams()

const navigate=useNavigate()

const [tournament,setTournament]=useState<any>(null)

useEffect(()=>{

fetchTournament()

},[])

const fetchTournament=async()=>{

try{

const response=await api.get(`/tournament/${id}`)

setTournament(response.data)

}

catch(error){

console.log(error)

}

}

if(!tournament){

return <div>Loading...</div>

}

return(

<div className="min-h-screen bg-[#f7f8fc]">

<NavBar/>

<div className="max-w-7xl mx-auto px-8 py-16">

<div className="grid lg:grid-cols-3 gap-12">

<div className="lg:col-span-2">

<img
src={tournament.image}
className="w-full h-[450px] object-cover rounded-3xl"
/>

<h1 className="text-5xl font-bold text-gray-900 mt-8">

{tournament.name}

</h1>

<p className="text-gray-600 leading-8 mt-6 text-lg">

{tournament.details}

</p>

<button
onClick={()=>
navigate(`/register/${id}`)
}
className="mt-10 bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition"
>

Register Tournament

</button>

</div>

<div>

<div className="bg-white border border-gray-200 rounded-3xl p-8 sticky top-28">

<h2 className="text-2xl font-bold text-gray-900 mb-6">

Tournament Rules

</h2>

<div className="space-y-4">

{
Object.entries(tournament.rules).map(

([key,value]:any)=>(

<details
key={key}
className="border border-gray-200 rounded-xl p-4"
>

<summary className="cursor-pointer font-semibold text-gray-800 capitalize">

{key.replaceAll("_"," ")}

</summary>

<p className="mt-3 text-gray-600 leading-7">

{String(value)}

</p>

</details>

)

)
}

</div>

</div>

</div>

</div>

</div>

</div>

)

}

export default TournamentDetails
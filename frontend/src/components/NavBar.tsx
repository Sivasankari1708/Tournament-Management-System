import { useNavigate } from "react-router-dom"

function NavBar(){

  const navigate = useNavigate()

  const logout=()=>{

    localStorage.removeItem("token")

    localStorage.removeItem("mobile")

    navigate("/")

  }

  return(

    <nav className="bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">

        <h1
          onClick={()=>navigate("/home")}
          className="text-4xl font-bold text-[#0f172a] cursor-pointer"
        >

          TournamentHub

        </h1>

        <div className="flex gap-5 items-center">

          <button
            onClick={()=>navigate("/profile")}
            className="text-gray-600 hover:text-black text-lg font-medium transition"
          >

            Profile

          </button>

          <button
            onClick={logout}
            className="bg-black hover:bg-gray-800 px-7 py-3 rounded-2xl text-white font-semibold transition"
          >

            Logout

          </button>

        </div>

      </div>

    </nav>

  )

}
export default NavBar
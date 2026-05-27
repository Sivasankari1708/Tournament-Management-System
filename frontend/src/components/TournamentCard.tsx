import { useNavigate } from "react-router-dom"

type Props = {

  id: number

  name: string

  details: string

  image: string

}

function TournamentCard({

  id,
  name,
  details,
  image

}: Props) {

  const navigate = useNavigate()

  const getFee = () => {

    if (name.includes("Cricket")) {

      return "1500"

    }

    if (name.includes("Football")) {

      return "2000"

    }

    if (name.includes("Chess")) {

      return "500"

    }

    return "1000"

  }

  return (

    <div className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2">

      <img
        src={image}
        className="w-full h-[300px] object-cover"
      />

      <div className="p-8">

        <div className="flex justify-between items-center gap-4">

          <h1 className="text-3xl font-bold text-[#0f172a] leading-tight">

            {name}

          </h1>

          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap">

            Live

          </span>

        </div>

        <p className="text-gray-600 text-xl mt-6 leading-9 min-h-[90px]">

          {details}

        </p>

        <div className="flex justify-between items-end mt-10">

          <div>

            <p className="text-gray-400 text-lg">

              Entry Fee

            </p>

            <h2 className="text-3xl font-bold text-black mt-1">

              ₹{getFee()}

            </h2>

          </div>

          <button
            onClick={() =>
              navigate(`/register/${id}`)
            }
            className="bg-black hover:bg-gray-800 text-white px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300"
          >

            Register

          </button>

        </div>

      </div>

    </div>

  )

}

export default TournamentCard
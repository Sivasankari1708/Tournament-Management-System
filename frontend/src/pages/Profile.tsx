import NavBar from "../components/NavBar"

function Profile(){

const name=localStorage.getItem("name")
const mobile=localStorage.getItem("mobile")

return(

<div className="min-h-screen bg-[#f7f8fc]">

<NavBar/>

<div className="max-w-5xl mx-auto px-8 py-16">

<p className="text-sm uppercase tracking-[0.25em] text-gray-500 mb-4">

Account

</p>

<h1 className="text-5xl font-bold text-gray-900 mb-10">

Profile

</h1>

<div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-10">

<div className="flex items-center gap-6">

<img
src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
className="w-28 h-28 rounded-full"
/>

<div>

<h2 className="text-3xl font-bold text-gray-900">

{name}

</h2>

<p className="text-gray-500 mt-2 text-lg">

{mobile}

</p>

</div>

</div>

</div>

</div>

</div>

)

}

export default Profile
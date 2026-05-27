import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import OTP from "./pages/OTP"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import TournamentDetails from "./pages/TournamentDetails"

import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/otp"
          element={<OTP />}
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register/:id"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tournament/:id"
          element={
            <ProtectedRoute>
              <TournamentDetails />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )

}

export default App
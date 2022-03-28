import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css';
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import BreweryList from './pages/BreweryList/BreweryList'
import BreweryDetails from './pages/BreweryDetails/BreweryDetails'
import EventList from './pages/EventList/EventList'
import EventDetails from './pages/EventDetails/EventDetails'
import NewEvent from './pages/NewEvent/NewEvent';
import * as authService from './services/authService'
import * as breweryService from './services/breweryService'
import * as eventService from './services/eventService'

const App = () => {
  const [breweries, setBreweries] = useState([])
  const [events, setEvents] = useState([])

  useEffect(() => {
    breweryService.getAll()
      .then(allBreweries => {
        setBreweries(allBreweries.businesses)
      })
  }, [])

  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const [profile, setProfile] = useState({})

  const handleNewEvent = async newEventData => {
    const newEvent = await eventService.create(newEventData)
    setEvents([...events, newEvent])
    // navigate('/events')
  }

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleClick = (profile) => {
    setProfile(profile)
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/breweries"
          element={<BreweryList breweries={breweries} />}
        />
        <Route
          path="/brewery/:id"
          element={<BreweryDetails />}
        />
        <Route
          path="/events"
          element={<EventList />}
        />
        <Route
          path="/event"
          element={<EventDetails />}
        />
        <Route
          path="/new"
          element={<NewEvent handleNewEvent={handleNewEvent}/>}
        />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles handleClick={handleClick}/> : <Navigate to="/login" />}
        />
        <Route path="/profile" element={<ProfileDetails profile={profile} />}/>
        <Route
          path="/changePassword"
          element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin}/> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  )
}

export default App

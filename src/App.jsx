import { useNavigate } from "react-router-dom"
import HomePage from "./HomePage"


function App() {

  const navigate = useNavigate();
  return (
    <div>
      <HomePage
        navigate={navigate}
      >
      </HomePage>
    </div>
  )
}

export default App

import SignUp from "./components/SignUp"
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

function App() {

  return (
    <Router >
    <div className="w-full h-[768px]">
      <SignUp/>
    </div>
    </Router>
  )
}

export default App

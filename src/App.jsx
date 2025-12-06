import DashboardPage from "./Component/DashboardPage"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NEW from "./Component/NEW";


const App = () => {
  return (



 <BrowserRouter>
      <Routes>
        <Route path="/" element={<NEW/>}></Route>
        <Route path="/:id" element={<DashboardPage/>} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
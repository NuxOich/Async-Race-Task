import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Garage from "./pages/Garage/Garage";
import Winners from "./pages/Winners/Winners";

function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Garage />} />
        <Route path='/winners' element={<Winners />} />
      </Routes>

    </>
  );
}

export default App;

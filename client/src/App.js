import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import UserHomePage from "./pages/UserHomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="" element={<UserHomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

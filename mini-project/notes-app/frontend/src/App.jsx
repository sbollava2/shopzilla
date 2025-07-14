import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Notes from "./pages/Notes";
import { useAuth } from "./AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={token ? <Notes /> : <Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

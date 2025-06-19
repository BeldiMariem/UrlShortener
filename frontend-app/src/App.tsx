import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./presentation/components/Welcome";
import LoginForm from "./presentation/components/LoginForm";
import { AuthProvider } from "./context/authContext";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<LoginForm />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;

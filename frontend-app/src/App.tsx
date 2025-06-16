import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import { LoginForm } from "./presentation/components/LoginForm";
import { RegisterForm } from "./presentation/components/RegisterForm";

function App() {
  return (
    <div>
      <LoginForm />
      <RegisterForm />
    </div>
  );
}

export default App;

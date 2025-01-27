import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import AuthLayout from "../components/auth/AuthLayout";
import LoginForm from "../features/Auth/LoginForm";
import App from "../App";
import SignupForm from "../features/Auth/SignupForm";
import Dashboard from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        <Route index element={<LoginForm />} />
        <Route path="login" element={<LoginForm/>} />
        <Route path="signup" element={<SignupForm/>} />
      </Route>

      {/* Protected Routes */}
      <Route path="/user" element={<App/>}>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
  );
};

export default AppRoutes;

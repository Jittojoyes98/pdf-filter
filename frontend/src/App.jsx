import { Suspense, useState } from "react";
import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import { Authorize } from "./Auth/Authorize";
import Dashboard from "./Dashboard/Dashboard";
import HomePage from "./Home/Home";
import LoginPage from "./Login/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import SignupPage from "./Signup/Signup";
import Editor from "./Editor/Editor";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <BrowserRouter basename="/">
        <Suspense>
          <Authorize>
            <Routes>
              {/* add routes here */}
              <Route path="/" element={<Layout layout="home" />}>
                <Route index element={<HomePage />} />
              </Route>
              <Route path="/login" element={<Layout layout="login" />}>
                <Route index element={<LoginPage />} />
              </Route>
              <Route path="/signup" element={<Layout layout="signup" />}>
                <Route index element={<SignupPage />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route
                  path="/dashboard"
                  element={<Layout layout="dashboard" />}
                >
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path="/editor" element={<Layout layout="editor" />}>
                  <Route index element={<Editor />} />
                </Route>
              </Route>
            </Routes>
          </Authorize>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;

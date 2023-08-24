import "./App.scss";
import { Routes, Route, Outlet, Link, useLocation } from "react-router-dom";
import { useStore } from "react-atomize-store";

import Home from "./components/Home";
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Cubes from "./components/Cubes";
import MultiCubes from "./components/MultiCubes";
import NoMatch from "./components/NoMatch";

export default function App() {
  useStore(
    {
      text: "",
      select: 0,
      cubes: [],
      username: "",
      messages: [],
    },
    true,
    ["select", "cubes"]
  );

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="cubes" element={<Cubes />} />
        <Route path="multicubes" element={<MultiCubes />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

function Layout() {
  const location = useLocation();

  const current = (url) => {
    if (location.pathname === url) {
      return "current";
    }
  };

  return (
    <div>
      <nav>
        <ul>
          <li className={current("/")}>
            <Link to="/">Home</Link>
          </li>
          <li className={`${current("/cubes") ?? ""} rainbow`}>
            <Link to="/cubes">Cubes</Link>
          </li>
          <li className={`${current("/multicubes") ?? ""} rainbow`}>
            <Link to="/multicubes">MultiCubes</Link>
          </li>
          <li className={current("/dashboard")}>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li className={current("/about")}>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
}

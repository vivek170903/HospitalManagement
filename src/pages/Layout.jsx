import { Outlet } from "react-router-dom";
import Header from "../components/Header.jsx";
import Sidebar from "../components/sideBar.jsx";

export default function Layout() {
  return (
    <>
    <div className="pt-16">
      <Header />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <main className="ml-64 pt-20 flex-1 p-4 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
    </>
  );
}

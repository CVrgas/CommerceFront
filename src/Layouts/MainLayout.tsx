import { ToastContainer } from "react-toastify";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function MainLayout() {
  return (
    <>
      <header className="col-span-2">
        <Navbar />
      </header>
      <aside className="min-w-max w-0"></aside>
      <main className="flex">
        <Outlet />
      </main>
      <footer className="col-span-2"> Footer Content </footer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default MainLayout;

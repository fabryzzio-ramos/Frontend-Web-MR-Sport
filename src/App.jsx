import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

import Home from "./pages/Home";
import Matches from "./pages/Matches";
import Store from "./pages/Store";
import Login from "./pages/Login";
import Team from "./pages/Team";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Register from "./pages/Register";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminJugadores from "./pages/admin/AdminJugadores";
import Dashboard from "./pages/admin/Dashboard";
import AdminPartidos from "./pages/admin/AdminPartidos";
import AdminStore from "./pages/admin/AdminStore";

function App() {
    return (
        <BrowserRouter>
            <AppLayout />   
        </BrowserRouter>
    );
}

function AppLayout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {!isAdminRoute && <NavBar />}

            <main className="flex-1">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/equipo" element={<Team />} />
                    <Route path="/partidos" element={<Matches />} />
                    <Route path="/tienda" element={<PrivateRoute><Store /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/historia" element={<About />} />
                    <Route path="/contacto" element={<Contact />} />
                    <Route path="/registro" element={<Register />} />

                    {/* ADMIN */}
                    <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
                        <Route index element={<Dashboard />} />
                        <Route path="jugadores" element={<AdminJugadores />} />
                        <Route path="partidos" element={<AdminPartidos />} />
                        <Route path="productos" element={<AdminStore />} />
                    </Route>
                </Routes>
            </main>

            {!isAdminRoute && <Footer />}
        </div>
    );
}

export default App;
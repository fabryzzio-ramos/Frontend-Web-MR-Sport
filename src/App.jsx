import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import NavBar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";
import { useAuth } from "./context/AuthContext";
import FullLoader from "./components/ui/FullLoader";

const Home = lazy(() => import("./pages/Home"));
const Matches = lazy(() => import("./pages/Matches"));
const Login = lazy(() => import("./pages/Login"));
const Team = lazy(() => import("./pages/Team"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Register = lazy(() => import("./pages/Register"));

const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminJugadores = lazy(() => import("./pages/admin/AdminJugadores"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminPartidos = lazy(() => import("./pages/admin/AdminPartidos"));
const AdminStore = lazy(() => import("./pages/admin/AdminStore"));

const StoreLayout = lazy(() => import("./pages/store/StoreLayout"));
const StoreHome = lazy(() => import("./pages/store/StoreHome"));
const Cart = lazy(() => import("./pages/store/Cart"));
const Checkout = lazy(() => import("./pages/store/Checkout"));
const MisOrdenes = lazy(() => import("./pages/store/MisOrdenes"));
const OrdenSuccess = lazy(() => import("./pages/store/OrdenSucces"));

function App() {
    const { loading } = useAuth();

    if (loading) return <FullLoader />;
    return (
        <BrowserRouter>
            <AppLayout />   
        </BrowserRouter>
    );
}

function AppLayout() {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const isStoreRoute = location.pathname.startsWith("/tienda");

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {!isAdminRoute && !isStoreRoute && <NavBar />}

            <main className="flex-1">
                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/equipo" element={<Team />} />
                        <Route path="/partidos" element={<Matches />} />
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

                        {/* SHOP */}
                        <Route path="/tienda" element={<StoreLayout />}>
                            <Route index element={<StoreHome />} />
                            <Route path="carrito" element={<Cart />} />
                            <Route path="checkout" element={<Checkout />} />
                            <Route path="mis-ordenes" element={<PrivateRoute><MisOrdenes /></PrivateRoute>} />
                            <Route path="compra-exitosa" element={<OrdenSuccess />} />
                        </Route>
                    </Routes>
                </Suspense>
            </main>

            {!isAdminRoute && !isStoreRoute && <Footer />}
        </div>
    );
}

function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="animate-pulse text-red-500 text-xl font-bold">Cargando MR Sport...</div>
        </div>
    );
}

export default App;
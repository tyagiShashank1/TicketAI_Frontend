import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckAuth from "./components/CheckAuth.jsx";
import Tickets from "./pages/Tickets.jsx";
import TicketDetailsPage from "./pages/Ticket.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/signup.jsx";
import Admin from "./pages/admin.jsx";
export const VITE_SERVER_URL = "http://localhost:3000/api";
import { Provider } from "react-redux";
import appStore, { persistor } from "./utils/store.js";
import { PersistGate } from "redux-persist/integration/react";
import Navbar from "./components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <CheckAuth protectedRoute={true}>
                  <Navbar />
                  <Tickets />
                </CheckAuth>

              }
            />
            <Route
              path="/tickets/:id"
              element={
                <CheckAuth protectedRoute={true}>
                  <TicketDetailsPage />
                </CheckAuth>

              }
            />
            <Route

              path="/login"
              element={
                <CheckAuth protectedRoute={false}>
                  <Navbar />
                  <Login />
                </CheckAuth>

              }
            />
            <Route
              path="/signup"
              element={
                <CheckAuth protectedRoute={false}>
                  <Navbar />
                  <Signup />
                </CheckAuth>

              }
            />
            <Route
              path="/admin"
              element={
                <CheckAuth protectedRoute={true}>
                  <Navbar />
                  <Admin />
                </CheckAuth>
              }
            />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);


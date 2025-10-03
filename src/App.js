import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

import AppNavbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import InvoicesPage from "./pages/InvoicesPage";
import InvoiceDetailPage from "./pages/InvoiceDetailPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import CreateInvoicePage from "./pages/CreateInvoicePage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppNavbar /> {/* Navbar visible on all pages */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/create-invoice" element={<CreateInvoicePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<h1 className="text-center mt-5">404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

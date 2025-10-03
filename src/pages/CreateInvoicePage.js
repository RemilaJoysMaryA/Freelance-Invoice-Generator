import React from "react";
import InvoiceForm from "../components/InvoiceForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateInvoicePage() {
  const navigate = useNavigate();

  const handleSave = async (invoice) => {
    try {
      const response = await axios.post("https://freelance-invoice-generator.onrender.com/api/invoices", invoice);
      if (response.status === 201) {
        alert("Invoice created successfully!");
        navigate("/invoices"); // go back to invoices list
      }
    } catch (err) {
      console.error("Error saving invoice:", err);
      alert("Failed to save invoice. Check console for details.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Invoice</h2>
      <InvoiceForm onSubmit={handleSave} />
    </div>
  );
}

export default CreateInvoicePage;

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Table, Button } from "react-bootstrap";
import jsPDF from "jspdf";

function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.list) || [];
  const invoice = invoices.find((inv) => inv._id === id);

  if (!invoice) {
    return (
      <div className="container mt-5">
        <h3>Invoice not found</h3>
        <Button onClick={() => navigate("/invoices")}>Back to Invoices</Button>
      </div>
    );
  }

  const subtotal = invoice.items.reduce((sum, item) => sum + item.qty * item.rate, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleDownload = () => {
    const doc = new jsPDF();

    // Invoice Header
    doc.setFontSize(18);
    doc.text("Invoice / Bill", 105, 15, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice ID: ${invoice._id}`, 14, 30);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 37);

    // Client info
    doc.text(`Client Name: ${invoice.clientId?.name || ""}`, 14, 50);
    doc.text(`Email: ${invoice.clientId?.email || ""}`, 14, 57);

    // Table headers
    const tableColumn = ["#", "Description", "Qty", "Rate", "Total"];
    const tableRows = [];

    invoice.items.forEach((item, index) => {
      const row = [
        index + 1,
        item.description,
        item.qty,
        `₹${item.rate}`,
        `₹${item.qty * item.rate}`,
      ];
      tableRows.push(row);
    });

    // AutoTable plugin for tables (optional)
    // If you want to use it, install: npm install jspdf-autotable
    // import autoTable from 'jspdf-autotable';
    // autoTable(doc, { head: [tableColumn], body: tableRows, startY: 70 });

    // If you don’t use autoTable, draw manually:
    let startY = 70;
    doc.setFontSize(12);
    doc.text(tableColumn.join(" | "), 14, startY);
    startY += 7;
    tableRows.forEach((row) => {
      doc.text(row.join(" | "), 14, startY);
      startY += 7;
    });

    // Totals
    startY += 10;
    doc.text(`Subtotal: ₹${subtotal}`, 150, startY);
    doc.text(`Tax (10%): ₹${tax}`, 150, startY + 7);
    doc.text(`Total: ₹${total}`, 150, startY + 14);

    doc.save(`Invoice-${invoice._id}.pdf`);
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-lg">
        <Card.Body>
          <h3>Invoice Detail</h3>
          <p><strong>Client:</strong> {invoice.clientId?.name}</p>
          <p><strong>Email:</strong> {invoice.clientId?.email}</p>
          <p><strong>Status:</strong> {invoice.status}</p>

          <Table bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.description}</td>
                  <td>{item.qty}</td>
                  <td>₹{item.rate}</td>
                  <td>₹{item.qty * item.rate}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h5 className="text-end">Subtotal: ₹{subtotal}</h5>
          <h5 className="text-end">Tax: ₹{tax}</h5>
          <h4 className="text-end">Total: ₹{total}</h4>

          <div className="d-flex justify-content-between mt-4">
            <Button variant="secondary" onClick={() => navigate("/invoices")}>
              Back to Invoices
            </Button>
            <Button variant="success" onClick={handleDownload}>
              Download Bill
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default InvoiceDetailPage;

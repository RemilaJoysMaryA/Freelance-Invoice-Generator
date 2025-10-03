import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices, deleteInvoice } from "../store/invoicesSlice"; // make sure you have these actions

function InvoicesPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const invoices = useSelector((state) => state.invoices.list || []); // fallback to empty array
  const status = useSelector((state) => state.invoices.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvoices());
    }
  }, [dispatch, status]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      dispatch(deleteInvoice(id));
    }
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg glass-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Card.Title>Invoices</Card.Title>
            <Button variant="primary" onClick={() => navigate("/create-invoice")}>
              + New Invoice
            </Button>
          </div>

          {invoices.length === 0 ? (
            <p className="text-muted">No invoices available. Create one to get started.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, idx) => {
                  const subtotal = invoice.items.reduce(
                    (sum, item) => sum + item.qty * item.rate,
                    0
                  );
                  const tax = subtotal * 0.1;
                  const total = subtotal + tax;

                  return (
                    <tr key={invoice._id || idx}>
                      <td>{idx + 1}</td>
                       <td>{invoice.clientId?.name}</td>
                        <td>{invoice.clientId?.email}</td>
                      <td>
                        {invoice.paid ? (
                          <span className="text-success fw-bold">Paid</span>
                        ) : (
                          <span className="text-danger fw-bold">Unpaid</span>
                        )}
                      </td>
                      <td>₹{total}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <Link
                            to={`/invoices/${invoice._id || idx}`}
                            className="btn btn-sm btn-info"
                          >
                            View
                          </Link>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(invoice._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default InvoicesPage;

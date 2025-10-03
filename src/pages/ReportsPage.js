import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInvoices } from "../store/invoicesSlice"; // adjust path if needed
import { Container, Card, Row, Col, Table } from "react-bootstrap";

function ReportsPage() {
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoices.list || []); // safe default
  const status = useSelector((state) => state.invoices.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchInvoices());
    }
  }, [dispatch, status]);

  const totalInvoices = invoices.length;
  const paidInvoices = invoices.filter((inv) => inv.paid).length;
  const unpaidInvoices = totalInvoices - paidInvoices;

  const totalRevenue = invoices.reduce((sum, inv) => {
    const subtotal = inv.items?.reduce((s, item) => s + item.qty * item.rate, 0) || 0;
    const tax = subtotal * 0.1;
    return sum + subtotal + tax;
  }, 0);

  return (
    <Container className="mt-5">
      <Card className="shadow-lg glass-card">
        <Card.Body>
          <Card.Title className="mb-4">Reports</Card.Title>

          {/* Summary Stats */}
          <Row className="mb-4 text-center">
            <Col>
              <h5>Total Invoices</h5>
              <p className="fw-bold">{totalInvoices}</p>
            </Col>
            <Col>
              <h5>Paid</h5>
              <p className="text-success fw-bold">{paidInvoices}</p>
            </Col>
            <Col>
              <h5>Unpaid</h5>
              <p className="text-danger fw-bold">{unpaidInvoices}</p>
            </Col>
            <Col>
              <h5>Total Revenue</h5>
              <p className="text-primary fw-bold">₹{totalRevenue.toFixed(2)}</p>
            </Col>
          </Row>

          {/* Invoice Breakdown */}
          <h5 className="mt-4">Invoice Breakdown</h5>
          {invoices.length === 0 ? (
            <p className="text-muted">No invoices to report.</p>
          ) : (
            <Table bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv, idx) => {
                  const subtotal = inv.items?.reduce((s, item) => s + item.qty * item.rate, 0) || 0;
                  const tax = subtotal * 0.1;
                  const total = subtotal + tax;

                  return (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{inv.clientId?.name || "N/A"}</td> {/* use clientId.name */}
                      <td>
                        {inv.paid ? (
                          <span className="text-success">Paid</span>
                        ) : (
                          <span className="text-danger">Unpaid</span>
                        )}
                      </td>
                      <td>₹{total.toFixed(2)}</td>
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

export default ReportsPage;

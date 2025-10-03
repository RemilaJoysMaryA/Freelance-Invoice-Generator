import React, { useState } from "react";
import {
  Carousel,
  Card,
  Button,
  Form,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import "../App.css"; // Adjust path if App.css is in src/

// Carousel Component
function ImageCarousel() {
  const images = [
    {
      src: "https://img.freepik.com/premium-photo/flat-lay-composition-stylish-office-desk_77417-4713.jpg?w=360",
      alt: "Work Sample 1",
    },
    { src: "https://picsum.photos/1200/400?random=2", alt: "Work Sample 2" },
    {
      src: "https://mobirise.com/bootstrap-4-theme/web-application-template/assets/images/deer-mockup1-3861x2574.jpg",
      alt: "Work Sample 3",
    },
  ];

  return (
    <div className="carousel-container mt-4">
      <Carousel fade>
        {images.map((img, idx) => (
          <Carousel.Item key={idx}>
            <img
              className="d-block w-100 carousel-img"
              src={img.src}
              alt={img.alt}
            />
            <Carousel.Caption>
              <h5 className="fw-bold">Welcome to Freelance Invoice Generator</h5>
              <h6>Create, manage, and share professional invoices easily</h6>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

// Image Card Component
function ImageCard({ src, title, description }) {
  const [viewCount, setViewCount] = useState(0);

  const handleView = () => {
    setViewCount(viewCount + 1);
    window.open(src, "_blank");
  };

  return (
    <Card className="portfolio-card shadow glass-card">
      <Card.Img variant="top" src={src} className="card-img-top-sm" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button
          size="sm"
          variant="light"
          className="btn-glass"
          onClick={handleView}
        >
          View Full Image
        </Button>
        <p className="mt-2 text-muted small">Viewed {viewCount} times</p>
      </Card.Body>
    </Card>
  );
}

// Invoice Form Component
function InvoiceForm({ onAddInvoice }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [items, setItems] = useState([{ description: "", qty: 1, rate: 0 }]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleItemChange = (idx, e) => {
    const newItems = [...items];
    newItems[idx][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () =>
    setItems([...items, { description: "", qty: 1, rate: 0 }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.name && form.email && items.length > 0) {
      onAddInvoice({ ...form, items });
      setForm({ name: "", email: "" });
      setItems([{ description: "", qty: 1, rate: 0 }]);
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-lg mt-5 invoice-form"
    >
      <h5 className="client mb-4">Client Details</h5>
      <Form.Group className="mb-3">
        <Form.Label>Client Name</Form.Label>
        <Form.Control
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter client name"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Client Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter client email"
          required
        />
      </Form.Group>

      <h6 className="mt-4 text-secondary">Invoice Items</h6>
      {items.map((item, idx) => (
        <Row key={idx} className="mb-3">
          <Col>
            <Form.Control
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(idx, e)}
              placeholder="Service / Product"
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="qty"
              value={item.qty}
              onChange={(e) => handleItemChange(idx, e)}
              placeholder="Qty"
              required
            />
          </Col>
          <Col>
            <Form.Control
              type="number"
              name="rate"
              value={item.rate}
              onChange={(e) => handleItemChange(idx, e)}
              placeholder="Rate"
              required
            />
          </Col>
        </Row>
      ))}

      <Button className="buttonsubmit" type="button" onClick={addItem}>
        + Add Item
      </Button>
      <Button type="submit" className="buttonsubmit mt-3 float-end">
        Generate Invoice
      </Button>
    </Form>
  );
}

// ✅ HomePage Component (main export)
function HomePage() {
  const [invoices, setInvoices] = useState([]);
  const addInvoice = (invoice) => setInvoices([...invoices, invoice]);

  return (
    <div className="app-background">
      <Container>
        <ImageCarousel />

        {/* Portfolio Section */}
        <h4 className="section-title mt-5">My Portfolio</h4>
        <Row className="justify-content-center">
          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center">
            <ImageCard
              src="https://www.web-ideas.com.au/uploads/110/254/med-What-is-website-development.jpg"
              title="Web Development"
              description="Modern responsive websites"
            />
          </Col>
          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center">
            <ImageCard
              src="https://pixel77.com/wp-content/uploads/2018/10/1934823-e1540532501723.jpg"
              title="Graphic Design"
              description="Professional logos & branding"
            />
          </Col>
          <Col md={4} sm={6} xs={12} className="d-flex justify-content-center">
            <ImageCard
              src="https://emindsinfosystems.com/wp-content/uploads/2022/08/32.jpg"
              title="Consulting"
              description="Smart IT & business strategies"
            />
          </Col>
        </Row>

        {/* Invoice Form Section */}
        <h4 className="section-title mt-5">Create Invoice</h4>
        <InvoiceForm onAddInvoice={addInvoice} />

        {/* Display Submitted Invoices */}
        <h4 className="section-title mt-5">Generated Invoices</h4>
        <Row className="mt-4">
          {invoices.map((invoice, idx) => {
            const subtotal = invoice.items.reduce(
              (sum, item) => sum + item.qty * item.rate,
              0
            );
            const tax = subtotal * 0.1;
            const total = subtotal + tax;

            return (
              <Col
                md={4}
                sm={6}
                xs={12}
                key={idx}
                className="d-flex justify-content-center mb-4"
              >
                <Card className="invoice-card glass-card shadow">
                  <Card.Body>
                    <Card.Title className="text-light">{invoice.name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {invoice.email}
                    </Card.Subtitle>

                    <Table bordered hover size="sm" className="text-light">
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Rate</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {invoice.items.map((item, i) => (
                          <tr key={i}>
                            <td>{item.description}</td>
                            <td>{item.qty}</td>
                            <td>₹{item.rate}</td>
                            <td>₹{item.qty * item.rate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>

                    <div className="text-end">
                      <p>
                        <strong>Subtotal:</strong> ₹{subtotal}
                      </p>
                      <p>
                        <strong>Tax (10%):</strong> ₹{tax}
                      </p>
                      <h6>
                        <strong>Total:</strong> ₹{total}
                      </h6>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default HomePage;

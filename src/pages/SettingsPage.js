import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";

function SettingsPage() {
  // Load initial settings from localStorage
  const storedSettings = JSON.parse(localStorage.getItem("appSettings")) || {};

  const [form, setForm] = useState({
    name: storedSettings.name || "",
    email: storedSettings.email || "",
    businessName: storedSettings.businessName || "",
    address: storedSettings.address || "",
    taxRate: storedSettings.taxRate || 10,
    currency: storedSettings.currency || "₹",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings to localStorage
    localStorage.setItem("appSettings", JSON.stringify(form));
    alert("Settings saved successfully!");
  };

  return (
    <Container className="mt-5">
      <Card className="shadow-lg glass-card">
        <Card.Body>
          <Card.Title className="mb-4">Settings</Card.Title>

          <Form onSubmit={handleSubmit}>
            {/* Profile Section */}
            <h5 className="mb-3">Profile</h5>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Business Section */}
            <h5 className="mb-3 mt-4">Business</h5>
            <Form.Group className="mb-3">
              <Form.Label>Business Name</Form.Label>
              <Form.Control
                type="text"
                name="businessName"
                value={form.businessName}
                onChange={handleChange}
                placeholder="Enter your business name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your business address"
              />
            </Form.Group>

            {/* Preferences Section */}
            <h5 className="mb-3 mt-4">Preferences</h5>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Default Tax (%)</Form.Label>
                  <Form.Control
                    type="number"
                    name="taxRate"
                    value={form.taxRate}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Currency</Form.Label>
                  <Form.Select
                    name="currency"
                    value={form.currency}
                    onChange={handleChange}
                  >
                    <option value="₹">₹ - INR</option>
                    <option value="$">$ - USD</option>
                    <option value="€">€ - EUR</option>
                    <option value="£">£ - GBP</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" className="buttonsubmit">
                Save Settings
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default SettingsPage;

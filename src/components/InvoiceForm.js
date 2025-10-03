import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

function InvoiceForm({ onSubmit }) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ clientId: "", items: [{ description: "", qty: 1, rate: 0 }] });

  useEffect(() => {
    async function fetchClients() {
      const res = await axios.get("https://freelance-invoice-generator.onrender.com/api/clients");
      setClients(res.data);
    }
    fetchClients();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleItemChange = (index, e) => {
    const newItems = [...form.items];
    newItems[index][e.target.name] = e.target.value;
    setForm({ ...form, items: newItems });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { description: "", qty: 1, rate: 0 }] });
  const removeItem = (index) => setForm({ ...form, items: form.items.filter((_, i) => i !== index) });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.clientId) return alert("Select a client!");
    if (form.items.length === 0) return alert("Add at least one item!");
    onSubmit(form);
  };

  return (
    <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-lg mt-3">
      <h5>Client</h5>
      <Form.Group className="mb-3">
        <Form.Label>Select Client</Form.Label>
        <Form.Select name="clientId" value={form.clientId} onChange={handleChange} required>
          <option value="">-- Select Client --</option>
          {clients.map((c) => (
            <option key={c._id} value={c._id}>{c.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <h5>Invoice Items</h5>
      {form.items.map((item, idx) => (
        <Row key={idx} className="mb-2 align-items-center">
          <Col>
            <Form.Control
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(idx, e)}
              placeholder="Description"
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
          <Col xs="auto">
            <Button variant="danger" size="sm" onClick={() => removeItem(idx)}>Remove</Button>
          </Col>
        </Row>
      ))}

      <Button variant="secondary" size="sm" onClick={addItem}>+ Add Item</Button>
      <Button variant="primary" type="submit" className="float-end">Save Invoice</Button>
    </Form>
  );
}

export default InvoiceForm;

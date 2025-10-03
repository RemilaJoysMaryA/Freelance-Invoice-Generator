import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClients } from "../store/clientSlice";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function ClientsPage() {
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.list) || [];
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", contact: "" });

  const location = useLocation();

  // Prefill form from URL query parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name") || "";
    const email = params.get("email") || "";
    const company = params.get("company") || "";
    const contact = params.get("contact") || "";
    if (name || email || company || contact) {
      setForm({ name, email, company, contact });
      setShowModal(true);
    }
  }, [location.search]);

  // Fetch clients from backend
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://freelance-invoice-generator.onrender.com/api/clients", form);
      if (response.status === 200 || response.status === 201) {
        dispatch(fetchClients());
        setForm({ name: "", email: "", company: "", contact: "" });
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error adding client:", err);
      alert("Failed to add client. Check console for details.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://freelance-invoice-generator.onrender.com/api/clients/${editingClient._id}`,
        form
      );
      if (response.status === 200) {
        dispatch(fetchClients());
        setEditingClient(null);
        setForm({ name: "", email: "", company: "", contact: "" });
        setShowModal(false);
      }
    } catch (err) {
      console.error("Error updating client:", err);
      alert("Failed to update client. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this client?")) {
      try {
        await axios.delete(`https://freelance-invoice-generator.onrender.com/api/clients/${id}`);
        dispatch(fetchClients());
      } catch (err) {
        console.error("Error deleting client:", err);
        alert("Failed to delete client. Check console for details.");
      }
    }
  };

  const openModal = (client = null) => {
    if (client) {
      setEditingClient(client);
      setForm(client);
    } else {
      setEditingClient(null);
      setForm({ name: "", email: "", company: "", contact: "" });
    }
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Client Management</h2>
      <Button variant="primary" onClick={() => openModal()}>+ Add Client</Button>

      <Table striped bordered hover className="mt-4 shadow">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client._id}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.company}</td>
              <td>{client.contact}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => openModal(client)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(client._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {clients.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No clients available.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingClient ? "Edit Client" : "Add Client"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editingClient ? handleUpdate : handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label>Client Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
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
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                name="contact"
                value={form.contact}
                onChange={handleChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="success" type="submit">
                {editingClient ? "Update" : "Add"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ClientsPage;

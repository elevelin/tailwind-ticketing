import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [tickets, setTickets] = useState([]);
  const [formState, setFormState] = useState({
    subject: "",
    priority: 0,
    status: "open",
    owner: "",
    description: "",
    issue_type: "",
    subcategory: "",
  });
  const [editingTicketId, setEditingTicketId] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get("http://localhost:5050/tickets");
    setTickets(response.data);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTicketId) {
      await axios.put(`http://localhost:5050/tickets/${editingTicketId}`, formState);
    } else {
      await axios.post("http://localhost:5050/tickets", formState);
    }
    setFormState({
      subject: "",
      priority: 0,
      status: "open",
      owner: "",
      description: "",
      issue_type: "",
      subcategory: "",
    });
    setEditingTicketId(null);
    fetchTickets();
  };

  const handleEdit = (ticket) => {
    setFormState(ticket);
    setEditingTicketId(ticket.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5050/tickets/${id}`);
    fetchTickets();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">Tailwind + React is working!</h1>
      </div>

      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow mt-10">
        <h2 className="text-2xl font-bold mb-4">Ticketing System</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="subject"
            value={formState.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            type="text"
            name="owner"
            value={formState.owner}
            onChange={handleChange}
            placeholder="Owner"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <select
            name="priority"
            value={formState.priority}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value={0}>Low</option>
            <option value={1}>Medium</option>
            <option value={2}>High</option>
          </select>
          <select
            name="status"
            value={formState.status}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="closed">Closed</option>
          </select>
          <select
            name="issue_type"
            value={formState.issue_type}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select Issue Type</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
          </select>
          <select
            name="subcategory"
            value={formState.subcategory}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="">Select Subcategory</option>
            <option value="laptop">Laptop</option>
            <option value="monitor">Monitor</option>
            <option value="email">Email</option>
          </select>
          <textarea
            name="description"
            value={formState.description}
            onChange={handleChange}
            placeholder="Description"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          ></textarea>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingTicketId ? "Update Ticket" : "Create Ticket"}
          </button>
        </form>
      </div>

      <div className="max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Tickets</h2>
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-white p-4 rounded shadow mb-4 space-y-2"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-lg">{ticket.subject}</p>
                <p className="text-sm text-gray-600">Owner: {ticket.owner}</p>
                <p className="text-sm text-gray-600">Priority: {ticket.priority}</p>
                <p className="text-sm text-gray-600">Status: {ticket.status}</p>
                <p className="text-sm text-gray-600">Issue Type: {ticket.issue_type}</p>
                <p className="text-sm text-gray-600">Subcategory: {ticket.subcategory}</p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(ticket)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(ticket.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700">{ticket.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

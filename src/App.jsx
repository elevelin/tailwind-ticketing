import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from "react-router-dom";

const PRIORITY_OPTIONS = [
  { value: 0, label: "Low", color: "bg-yellow-500 text-white" },
  { value: 1, label: "Medium", color: "bg-orange-500 text-white" },
  { value: 2, label: "High", color: "bg-red-500 text-white" },
  { value: 3, label: "Unbreak Immediately", color: "bg-purple-600 text-white" },
];

function priorityInfo(value) {
  return PRIORITY_OPTIONS.find((opt) => opt.value === parseInt(value)) || PRIORITY_OPTIONS[0];
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TicketViewPage() {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5050/tickets`).then(res => {
      const t = res.data.find(t => t.id === parseInt(id));
      setTicket(t);
    });
  }, [id]);

  if (!ticket) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Ticket #{ticket.id}</h2>
        <p><strong>Subject:</strong> {ticket.subject}</p>
        <p><strong>Description:</strong> {ticket.description}</p>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p>
          <strong>Priority:</strong>
          <span
            className={"ml-2 rounded px-2 py-1 " + priorityInfo(ticket.priority).color}
          >
            {priorityInfo(ticket.priority).label}
          </span>
        </p>
        <p><strong>Owner:</strong> {ticket.owner}</p>
        <p><strong>Issue Type:</strong> {ticket.issue_type}</p>
        <p><strong>Subcategory:</strong> {ticket.subcategory}</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 underline">Back to Tickets</Link>
      </div>
    </div>
  );
}

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const query = useQuery();
  const statusFilter = query.get("status");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const response = await axios.get("http://localhost:5050/tickets");
    setTickets(response.data);
  };

  const handleClaim = async (id, owner) => {
    await axios.put(`http://localhost:5050/tickets/${id}/claim`, { owner });
    fetchTickets();
  };

  const handleInlineUpdate = async (id, field, value) => {
    const ticket = tickets.find(t => t.id === id);
    if (!ticket) return;
    const updated = { ...ticket, [field]: value };
    await axios.put(`http://localhost:5050/tickets/${id}`, updated);
    fetchTickets();
  };

  const displayedTickets = statusFilter ? tickets.filter(t => t.status === statusFilter) : tickets;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <div className="text-3xl font-bold text-blue-800">Ticketing System</div>
        <Link to="/new" className="bg-blue-600 text-white px-4 py-2 rounded">+ New Ticket</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Link to="/?status=open" className="bg-white p-4 rounded shadow text-center hover:bg-blue-50 transition">
          <div className="text-blue-500 text-2xl font-bold">{tickets.filter(t => t.status === 'open').length}</div>
          <div className="text-sm text-gray-600">Open</div>
        </Link>
        <Link to="/?status=acknowledged" className="bg-white p-4 rounded shadow text-center hover:bg-green-50 transition">
          <div className="text-green-500 text-2xl font-bold">{tickets.filter(t => t.status === 'acknowledged').length}</div>
          <div className="text-sm text-gray-600">Acknowledged</div>
        </Link>
        <Link to="/?status=in_progress" className="bg-white p-4 rounded shadow text-center hover:bg-orange-50 transition">
          <div className="text-orange-500 text-2xl font-bold">{tickets.filter(t => t.status === 'in_progress').length}</div>
          <div className="text-sm text-gray-600">In Progress</div>
        </Link>
        <Link to="/?status=blocked" className="bg-white p-4 rounded shadow text-center hover:bg-purple-50 transition">
          <div className="text-purple-500 text-2xl font-bold">{tickets.filter(t => t.status === 'blocked').length}</div>
          <div className="text-sm text-gray-600">Blocked</div>
        </Link>
      </div>

      <div className="bg-white rounded shadow p-6 mb-10">
        <h2 className="text-xl font-bold mb-4">Tickets</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Subject</th>
              <th className="p-2">Owner</th>
              <th className="p-2">Priority</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {displayedTickets.map(ticket => (
              <tr key={ticket.id} className="border-t">
                <td className="p-2">#{ticket.id}</td>
                <td className="p-2 font-semibold">{ticket.subject}</td>
                <td className="p-2">
                  <input
                    className="border rounded px-2 py-1 w-full"
                    value={ticket.owner}
                    onChange={(e) => handleInlineUpdate(ticket.id, "owner", e.target.value)}
                  />
                </td>
                <td className="p-2">
                  <select
                    className={
                      "border rounded px-2 py-1 " + priorityInfo(ticket.priority).color
                    }
                    value={ticket.priority}
                    onChange={(e) =>
                      handleInlineUpdate(ticket.id, "priority", parseInt(e.target.value))
                    }
                  >
                    {PRIORITY_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-2">
                  <select
                    className="border rounded px-2 py-1"
                    value={ticket.status}
                    onChange={(e) => handleInlineUpdate(ticket.id, "status", e.target.value)}
                  >
                    <option value="open">Open</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="in_progress">In Progress</option>
                    <option value="blocked">Blocked</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
                <td className="p-2 space-x-2">
                  <Link to={`/edit/${ticket.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</Link>
                  {ticket.owner === "Amber" ? (
                    <button onClick={() => handleClaim(ticket.id, "")} className="bg-red-600 text-white px-2 py-1 rounded">Unclaim</button>
                  ) : (
                    <button onClick={() => handleClaim(ticket.id, "Amber")} className="bg-green-600 text-white px-2 py-1 rounded">Claim</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function NewTicketPage() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    subject: "",
    priority: 0,
    status: "open",
    owner: "",
    description: "",
    issue_type: "",
    subcategory: "",
  });
  const [createdTicketId, setCreatedTicketId] = useState(null);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5050/tickets", formState);
    setCreatedTicketId(response.data.id);
  };

  if (createdTicketId) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-xl mx-auto bg-white rounded shadow p-6 text-center">
          <h2 className="text-xl font-bold mb-4 text-green-600">Ticket #{createdTicketId} created successfully!</h2>
          <Link to={`/edit/${createdTicketId}`} className="text-blue-600 underline">View Ticket #{createdTicketId}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">New Ticket</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" className="input" />
          <input name="owner" value={formState.owner} onChange={handleChange} placeholder="Owner" className="input" />
          <select
            name="priority"
            value={formState.priority}
            onChange={handleChange}
            className={"input " + priorityInfo(formState.priority).color}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select name="status" value={formState.status} onChange={handleChange} className="input">
            <option value="open">Open</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="closed">Closed</option>
          </select>
          <select name="issue_type" value={formState.issue_type} onChange={handleChange} className="input">
            <option value="">Select Issue Type</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
          </select>
          <select name="subcategory" value={formState.subcategory} onChange={handleChange} className="input">
            <option value="">Select Subcategory</option>
            <option value="laptop">Laptop</option>
            <option value="monitor">Monitor</option>
            <option value="email">Email</option>
          </select>
          <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Description" className="input md:col-span-2" />
          <div className="md:col-span-2 flex justify-between">
            <button type="button" onClick={() => navigate("/")} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function EditTicketPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    subject: "",
    priority: 0,
    status: "open",
    owner: "",
    description: "",
    issue_type: "",
    subcategory: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5050/tickets")
      .then(res => {
        const ticket = res.data.find(t => t.id === parseInt(id));
        if (ticket) setFormState(ticket);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5050/tickets/${id}`, formState);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="subject" value={formState.subject} onChange={handleChange} placeholder="Subject" className="input" />
          <input name="owner" value={formState.owner} onChange={handleChange} placeholder="Owner" className="input" />
          <select
            name="priority"
            value={formState.priority}
            onChange={handleChange}
            className={"input " + priorityInfo(formState.priority).color}
          >
            {PRIORITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <select name="status" value={formState.status} onChange={handleChange} className="input">
            <option value="open">Open</option>
            <option value="acknowledged">Acknowledged</option>
            <option value="in_progress">In Progress</option>
            <option value="blocked">Blocked</option>
            <option value="closed">Closed</option>
          </select>
          <select name="issue_type" value={formState.issue_type} onChange={handleChange} className="input">
            <option value="">Select Issue Type</option>
            <option value="hardware">Hardware</option>
            <option value="software">Software</option>
            <option value="network">Network</option>
          </select>
          <select name="subcategory" value={formState.subcategory} onChange={handleChange} className="input">
            <option value="">Select Subcategory</option>
            <option value="laptop">Laptop</option>
            <option value="monitor">Monitor</option>
            <option value="email">Email</option>
          </select>
          <textarea name="description" value={formState.description} onChange={handleChange} placeholder="Description" className="input md:col-span-2" />
          <div className="md:col-span-2 flex justify-between">
            <button type="button" onClick={() => navigate("/")} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
            <button type="submit" className="bg-yellow-600 text-white px-4 py-2 rounded">Update Ticket</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TicketList />} />
        <Route path="/new" element={<NewTicketPage />} />
        <Route path="/edit/:id" element={<EditTicketPage />} />
        <Route path="/ticket/:id" element={<TicketViewPage />} />
      </Routes>
    </Router>
  );
}

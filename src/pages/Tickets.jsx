import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { VITE_SERVER_URL } from "../main";
import Navbar from "../components/Navbar";

export default function Tickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  const description = useRef(null);
  const title = useRef(null);


  const fetchTickets = async () => {
    try {
      const results = await axios.get(`${VITE_SERVER_URL}/tickets`, {
        withCredentials: true
      });
      console.log(results);
      setTickets(results.data.tickets || []);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const result = await axios.post(`${VITE_SERVER_URL}/tickets`, {
        title: title.current.value,
        description: description.current.value
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

      if (result) {
       title.current.value="";
       description.current.value="";
        fetchTickets(); // Refresh list
      } else {
        alert(result.data.message || "Ticket creation failed");
      }
    } catch (err) {
      alert("Error creating ticket");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Ticket</h2>

      <form onSubmit={(e) => { e.preventDefault() }} className="space-y-3 mb-8">
        <input
          name="title"
          ref={title}
          placeholder="Ticket Title"
          className="input input-bordered w-full"
          required
        />
        <textarea
          name="description"
          ref={description}
          placeholder="Ticket Description"
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
        <button onClick={() => { handleSubmit() }} className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2">All Tickets</h2>
      <div className="space-y-3">
        {tickets.map((ticket) => (
          <Link
            key={ticket._id}
            className="card shadow-md p-4 bg-gray-800"
            to={`/tickets/${ticket._id}`}
          >
            <h3 className="font-bold text-lg">{ticket.title}</h3>
            <p className="text-sm">{ticket.description}</p>
            <p className="text-sm text-gray-500">
              Created At: {new Date(ticket.createdAt).toLocaleString()}
            </p>
          </Link>
        ))}
        {tickets.length === 0 && <p>No tickets submitted yet.</p>}
      </div>
    </div>
  );
}
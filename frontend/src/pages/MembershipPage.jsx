import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function MembershipPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { syncUser } = useAuth();
  const navigate = useNavigate();

  const activateMembership = async () => {
    setLoading(true);
    try {
      const { data } = await api.post("/membership/activate");
      setMessage(data.message);
      await syncUser();
      navigate("/dashboard");
    } catch (err) {
      setMessage(err.response?.data?.message || "Membership activation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card narrow glass">
      <p className="eyebrow">Founding Program</p>
      <h2>Membership Activation</h2>
      <p>Founding Membership Fee: ₹10,000</p>
      <p>Duration: 1 Year</p>
      <ul>
        <li>Professional Dashboard Access</li>
        <li>Learning Center Included</li>
        <li>Priority Member Support</li>
      </ul>
      <button className="btn" onClick={activateMembership} disabled={loading}>
        {loading ? "Activating..." : "Activate Membership"}
      </button>
      {message && <p>{message}</p>}
    </section>
  );
}

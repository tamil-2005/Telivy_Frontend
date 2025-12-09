import "../Component/Style.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function DashboardPage() {


    const { id } = useParams();

  const [scores, setScores] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");   

  const URL = "http://telivy-backend.azurewebsites.net/db/session/";


  let name = "";
  let domain = "";

  if (email.includes("@")) {
    const splitEmail = email.split("@");
    name = splitEmail[0];
    domain = splitEmail[1];
  }

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(URL + id); 
        const data = await response.json();

        setEmail(data.email);

        setScores({
          dnsHealth: data.result.dnsHealth,
          ipReputation: data.result.ipReputation,
          networkSecurity: data.result.networkSecurity,
          socialEngineering: data.result.socialEngineering,
          applicationSecurity: data.result.applicationSecurity,
          externalVulnerabilities: data.result.externalVulnerabilities
        });

        setLoading(false);

      } catch (error) {
        console.error("API error:", error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  const gradeColors = {
    A: "#22c55e",
    B: "#84cc16",
    C: "#f59e0b",
    D: "#ef4444",
    F: "#991b1b"
  };

  return (
    <div className="page-container">
      
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          infinite<span>sol.</span>
        </div>
      </nav>

<div className="user-detail-card">
  <h2 className="user-welcome">
    Hello <span className="highlight">{name.toUpperCase()}</span>, your result is ready
  </h2>

  {domain && (
    <div className="domain-badge">
      {domain.toUpperCase()}
    </div>
  )}
</div>


      {/* Hero */}
      <section className="hero">

        {loading && (
          <p style={{ marginTop: "20px", fontSize: "18px" }}>
            Loading security scores...
          </p>
        )}

        {scores && (
          <div className="scoreboard">
            {Object.entries(scores).map(([key, value]) => (
              <div className="score-item" key={key}>
                <span className="score-label">{key}</span>

                <span
                  className="score-box"
                  style={{ backgroundColor: gradeColors[value] }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}

      </section>
    </div>
  );
}


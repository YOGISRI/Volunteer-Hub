import api from "../api/axios";

export default function OpportunityCard({ opportunity }) {

    const apply = async () => {
        await api.post("/opportunities/apply", {
            opportunityId: opportunity.id
        });
        alert("Applied successfully!");
    };

    return (
        <div className="card">
            <h3>{opportunity.title}</h3>
            <p>{opportunity.description}</p>
            <p><strong>Location:</strong> {opportunity.location}</p>
            <button onClick={apply}>Apply</button>
        </div>
    );
}
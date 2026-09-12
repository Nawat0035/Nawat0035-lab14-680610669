import { useEffect, useState } from "react";
import UserRegisterCard from "../components/UserRegisterCard";
import type { Registrant } from "../libs/Registrant";

export default function DashboardPage() {
  const [registrants, setRegistrants] = useState<Registrant[]>([]);

  useEffect(() => {
    const data = JSON.parse(
      localStorage.getItem("registrants") || "[]"
    );

    setRegistrants(data);
  }, []);

  return (
    <div className="container mt-4">

      <h2>Dashboard</h2>

      <p>
        ผู้ลงทะเบียนทั้งหมด ({registrants.length} คน)
      </p>

      {registrants.length === 0 ? (
        <div className="alert alert-secondary">
          ยังไม่มีผู้ลงทะเบียน
        </div>
      ) : (
        registrants.map((registrant) => (
          <UserRegisterCard
            key={registrant.id}
            registrant={registrant}
          />
        ))
      )}

    </div>
  );
}
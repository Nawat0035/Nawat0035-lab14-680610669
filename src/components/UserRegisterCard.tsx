import type { Registrant } from "../libs/Registrant";

interface UserRegisterCardProps {
  registrant: Registrant;
}

export default function UserRegisterCard({
  registrant,
}: UserRegisterCardProps) {
  return (
    <div className="card mb-3">
      <div className="card-body">

        <div className="d-flex justify-content-between">
          <div>
            <h5 className="card-title mb-1">
              {registrant.fullName}
            </h5>

            <p className="card-text mb-1">
              {registrant.plan} · {registrant.gender}
            </p>

            {registrant.extras.length > 0 && (
              <div>
                {registrant.extras.map((extra) => (
                  <span
                    key={extra}
                    className="badge bg-light text-dark me-1"
                  >
                    {extra}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            {registrant.total.toLocaleString()} THB
          </div>
        </div>

      </div>
    </div>
  );
}
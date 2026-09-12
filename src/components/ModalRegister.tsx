import { useState } from "react";
import type { Registrant } from "../libs/Registrant";

//---- แผนการวิ่ง ----
const plans = [
  { id: "funrun", label: "Fun run 5.5 Km", price: 500 },
  { id: "mini", label: "Mini Marathon 10 Km", price: 800 },
  { id: "half", label: "Half Marathon 21 Km", price: 1200 },
  { id: "full", label: "Full Marathon 42.195 Km", price: 1500 },
];
// ---- สินค้าเสริม ----
const extraItems = [
  { id: "bottle", label: "Bottle 🍼", price: 200 },
  { id: "shoes", label: "Shoes 👟", price: 600 },
  { id: "cap", label: "Cap 🧢", price: 400 },
];

export default function ModalRegister() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [plan, setPlan] = useState("");
  const [gender, setGender] = useState("");
  const [extras, setExtras] = useState<string[]>([]);
  const [agree, setAgree] = useState(false);

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    plan: false,
    gender: false,
  });

  const selectedPlan = plans.find((item) => item.id === plan);

  const extrasPrice = extras.reduce((total, id) => {
    const item = extraItems.find((extra) => extra.id === id);
    return total + (item?.price || 0);
  }, 0);

  const subtotal = (selectedPlan?.price || 0) + extrasPrice;

  const isDiscount = extras.length === 3;

  const totalPrice = isDiscount ? subtotal * 0.8 : subtotal;

  const handleExtraChange = (id: string) => {
    if (extras.includes(id)) {
      setExtras(extras.filter((item) => item !== id));
    } else {
      setExtras([...extras, id]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
      plan: plan === "",
      gender: gender === "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    const oldData: Registrant[] = JSON.parse(
      localStorage.getItem("registrants") || "[]"
    );

    const newRegistrant: Registrant = {
      id: Date.now(),
      fullName: `${firstName.trim()} ${lastName.trim()}`,
      gender: gender,
      plan: selectedPlan?.label || "",
      extras: extras.map(
        (id) => extraItems.find((item) => item.id === id)?.label || ""
      ),
      total: totalPrice,
    };

    localStorage.setItem(
      "registrants",
      JSON.stringify([...oldData, newRegistrant])
    );

    alert(
      `Registration complete. Please pay money for ${totalPrice.toLocaleString()} THB.`
    );

    setFirstName("");
    setLastName("");
    setPlan("");
    setGender("");
    setExtras([]);
    setAgree(false);

    setErrors({
      firstName: false,
      lastName: false,
      plan: false,
      gender: false,
    });
  };

  return (
    <div
      className="modal fade"
      id="modalregister"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="modalregisterLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Register CMU Marathon 🏃‍♂️</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="d-flex gap-2">
                <div className="w-50">
                  <label className="form-label">First name</label>
                  <input
                    className={`form-control ${
                      errors.firstName ? "is-invalid" : ""
                    }`}
                    value={firstName}
                    onChange={(event) => {
                      setFirstName(event.target.value);
                      setErrors({
                        ...errors,
                        firstName: false,
                      });
                    }}
                  />
                  {errors.firstName && (
                    <div className="invalid-feedback">
                      Invalid first name
                    </div>
                  )}
                </div>

                <div className="w-50">
                  <label className="form-label">Last name</label>
                  <input
                    className={`form-control ${
                      errors.lastName ? "is-invalid" : ""
                    }`}
                    value={lastName}
                    onChange={(event) => {
                      setLastName(event.target.value);
                      setErrors({
                        ...errors,
                        lastName: false,
                      });
                    }}
                  />
                  {errors.lastName && (
                    <div className="invalid-feedback">
                      Invalid last name
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-2">
                <label className="form-label">Plan</label>
                <select
                  className={`form-select ${
                    errors.plan ? "is-invalid" : ""
                  }`}
                  value={plan}
                  onChange={(event) => {
                    setPlan(event.target.value);
                    setErrors({
                      ...errors,
                      plan: false,
                    });
                  }}
                >
                  <option value="">Please select..</option>
                  <option value="funrun">
                    Fun run 5.5 Km (500 THB)
                  </option>
                  <option value="mini">
                    Mini Marathon 10 Km (800 THB)
                  </option>
                  <option value="half">
                    Half Marathon 21 Km (1,200 THB)
                  </option>
                  <option value="full">
                    Full Marathon 42.195 Km (1,500 THB)
                  </option>
                </select>

                {errors.plan && (
                  <div className="invalid-feedback">
                    Please select a Plan
                  </div>
                )}
              </div>

              <div className="mt-2">
                <label className="form-label">Gender</label>

                <div>
                  <input
                    className={`me-2 form-check-input ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={gender === "Male"}
                    onChange={(event) => {
                      setGender(event.target.value);
                      setErrors({
                        ...errors,
                        gender: false,
                      });
                    }}
                  />
                  Male 👨

                  <input
                    className={`mx-2 form-check-input ${
                      errors.gender ? "is-invalid" : ""
                    }`}
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={gender === "Female"}
                    onChange={(event) => {
                      setGender(event.target.value);
                      setErrors({
                        ...errors,
                        gender: false,
                      });
                    }}
                  />
                  Female 👩
                </div>

                {errors.gender && (
                  <div className="text-danger">
                    Please select gender
                  </div>
                )}
              </div>

              {/* Extra Items */}
              <div>
                <label className="form-label">Extra Item(s)</label>

                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    checked={extras.includes("bottle")}
                    onChange={() => handleExtraChange("bottle")}
                  />
                  <label className="form-check-label">
                    Bottle 🍼 (200 THB)
                  </label>
                </div>

                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    checked={extras.includes("shoes")}
                    onChange={() => handleExtraChange("shoes")}
                  />
                  <label className="form-check-label">
                    Shoes 👟 (600 THB)
                  </label>
                </div>

                <div>
                  <input
                    className="me-2 form-check-input"
                    type="checkbox"
                    checked={extras.includes("cap")}
                    onChange={() => handleExtraChange("cap")}
                  />
                  <label className="form-check-label">
                    Cap 🧢 (400 THB)
                  </label>
                </div>

                {/* conditional เมื่อเลือกสินค้าเสริมทั้งหมด ให้แสดง discount*/}
                {isDiscount && (
                  <span className="text-success d-block">
                    (20% Discounted)
                  </span>
                )}
              </div>

              <div className="alert alert-primary mt-3" role="alert">
                Promotion📢 Buy all items to get 20% Discount
              </div>

              <div>
                Total Payment : {totalPrice.toLocaleString()} THB
              </div>
            </div>

            <div className="modal-footer">
              <div>
                <input
                  className="me-2 form-check-input"
                  type="checkbox"
                  checked={agree}
                  onChange={(event) =>
                    setAgree(event.target.checked)
                  }
                />
                I agree to the terms and conditions
              </div>

              <button
                type="submit"
                className="btn btn-success my-2"
                disabled={!agree}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
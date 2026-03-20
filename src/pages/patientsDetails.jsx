import { useNavigate, useSearchParams,useLocation } from "react-router-dom";
import patients from "../dataSets/patients.json";

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

    const patientsArray =
    patients.patients ||
    patients.data ||
    patients;

  const patientId = searchParams.get("id");

  const patient = patientsArray.find(
    (p) => Number(p.id) === Number(patientId)
  );

  const fromPage = location.state?.from || "Patients"

  const handleBreadcrumbClick = () => {
       if (fromPage === "Encounters") {
      navigate("/encounters");
    } else {
      navigate("/patients");
    }

  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span
          onClick={handleBreadcrumbClick}
          className="cursor-pointer hover:underline text-blue-600"
        >
          {fromPage}
        </span>
        {" / Patient Details"}
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Patient Details</h2>
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">ID</span>
            <span className="block text-lg">{patient.id ?? 'Not known'}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">Name</span>
            <span className="block text-lg">{patient.name ? patient.name : 'Not known'}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">Gender</span>
            <span className="block text-lg">{patient.gender ? patient.gender : 'Not known'}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Referral Program</span>
            <span className="block text-lg">{patient.referral_program ? patient.referral_program : 'Not known'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

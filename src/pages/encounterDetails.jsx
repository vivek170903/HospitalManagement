import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import encountersData from "../dataSets/encounters.json";

const EncounterDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const encountersArray =
    encountersData.encounters ||
    encountersData.data ||
    encountersData;

  const encounterId = searchParams.get("id");

  const encounter = encountersArray.find(
    (e) => String(e.id) === String(encounterId)
  );
console.log("Encounter ID from URL:", encounter);
  const fromPage = location.state?.from || "Encounters";

  const handleBreadcrumbClick = () => {
    if (fromPage === "Patients") {
      navigate("/patients");
    } else {
      navigate("/encounters");
    }
  };
  
  if (!encounter) {
    return <div>Encounter not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        <span
          onClick={handleBreadcrumbClick}
          className="cursor-pointer hover:underline text-blue-600"
        >
          {fromPage}
        </span>
        {" / Encounter Details"}
      </div>
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">Encounter Details</h2>
      <div className="flex justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">ID</span>
            <span className="block text-lg">{encounter.id ?? 'Not known'}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">Name</span>
            <span className="block text-lg">{encounter.patient && encounter.patient.name ? encounter.patient.name : 'Not known'}</span>
          </div>
          <div className="mb-4">
            <span className="block text-gray-500 font-semibold">Consultation</span>
            <span className="block text-lg">{encounter.consultation_type ? encounter.consultation_type : 'Not known'}</span>
          </div>
          <div>
            <span className="block text-gray-500 font-semibold">Date</span>
            <span className="block text-lg">{encounter.date_of_service ? encounter.date_of_service : 'Not known'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncounterDetails;

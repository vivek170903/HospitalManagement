
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import patientsData from "../dataSets/patients.json";

export default function Patients() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const referral_program = searchParams.get("referral_program") || "";
  const gender = searchParams.get("gender") || "";

  const patientsArray =
    patientsData.patients ||
    patientsData.data ||
    patientsData;

  const referralOptions = [
    ...new Set(patientsArray.map((p) => p.referral_program)),
  ];
  const genderOptions = [
    ...new Set(patientsArray.map((p) => p.gender)),
  ];

  const updateParams = (newParams) => {
    setSearchParams({
      referral_program,
      gender,
      ...newParams,
    });
  };

  const filteredPatients = patientsArray.filter((patient) => {
    const matchReferral = !referral_program || patient.referral_program === referral_program;
    const matchGender = !gender || patient.gender === gender;
    return matchReferral && matchGender;
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentData = filteredPatients.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredPatients.length / recordsPerPage);

  const handleNavigateToPatient = (patientId) => {
    navigate(`/patients/patients-details?id=${patientId}`, {
      state: {
        from: "Patients",
        query: searchParams.toString(),
      },
    });
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Patients Page</h2>
      <div className="flex flex-wrap gap-4 items-end mb-8 justify-between bg-white p-4 rounded shadow-sm">
        <div className="flex flex-col">
          <label className="mb-1 text-left font-medium">Referral Program:</label>
          <select
            value={referral_program}
            onChange={e => updateParams({ referral_program: e.target.value })}
            className="p-2 rounded border border-gray-300 min-w-45"
          >
            <option value="">Select</option>
            {referralOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-left font-medium">Gender:</label>
          <select
            value={gender}
            onChange={e => updateParams({ gender: e.target.value })}
            className="p-2 rounded border border-gray-300 min-w-45"
          >
            <option value="">Select</option>
            {genderOptions.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col justify-end">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm font-semibold hover:bg-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
      {filteredPatients.length > 0 && (
        <div>
          <h3>Results:</h3>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Referral Program</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((patient) => (
                  <tr key={patient.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">{patient.id ?? 'Not known'}</td>
                    <td className="p-3">{patient.name ? patient.name : 'Not known'}</td>
                    <td className="p-3">{patient.gender ? patient.gender : 'Not known'}</td>
                    <td className="p-3">{patient.referral_program ? patient.referral_program : 'Not known'}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleNavigateToPatient(patient.id)}
                        className="text-blue-600 hover:underline"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

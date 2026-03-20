import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Login from "./pages/login.jsx";
import Layout from "./pages/Layout.jsx";
import Encounters from "./pages/encounter.jsx";
import Patients from "./pages/patients.jsx";
import PatientDetails from "./pages/patientsDetails.jsx";
import EncounterDetails from "./pages/encounterDetails.jsx";
import PrivateRoute from "./Routes/privateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/encounters",
        element: <Encounters />,
      },
      {
        path: "/patients",
        element: <Patients />,
      },
      {
        path: "/patients/patients-details",
        element: <PatientDetails />, 
      },
      {
        path: "/encounters/encounter-details",
        element: <EncounterDetails />, 
      },
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;

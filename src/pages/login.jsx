import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState({});
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/encounters");
    }
  }, []);

  const handleLogin = () => {
    let newErrors = {};
    if (!form.username) {
      newErrors.username = "Username is required";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    if (form.username.trim() !== "vivek" ) {
      newErrors.username = "Invalid username";
    }
    if (form.password !== "1234") {
      newErrors.password = "Invalid password";
    }
  
    if (form.username === "vivek" && form.password === "1234") {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("name", form.username);
      navigate("/encounters");
    } else {
      setError(newErrors);
    }
  };

  return (
        <div className="py-20 min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex h-full items-center justify-center">
        <div className="rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800 flex flex-col sm:px-4 w-full max-w-md">

          <div className="flex flex-col justify-center gap-4 p-6">

              <h2 className="mb-4 text-2xl font-bold dark:text-white">
                Login
              </h2>

              <div>
                <input
                  className="block w-full bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="text"
                  placeholder="Username"
                  onChange={(e) =>
                  setForm({ ...form, username: e.target.value })
                  }
                  required
                />
                {error.username && (
                  <div className="text-red-500 text-xs mt-1">{error.username}</div>
                )}
              </div>

              <div>
                <input
                  className="block w-full bg-gray-50 border border-gray-300 text-gray-900 p-2.5 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  type="password"
                  placeholder="password"
                  onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                  }
                  required
                />
                {error.password && (
                  <div className="text-red-500 text-xs mt-1">{error.password}</div>
                )}
              </div>

              <button
                type="submit"
                onClick={handleLogin}
                className="bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg transition"
              >
                Login
              </button>
          </div>
        </div>
      </div>
    </div>
  
  );
}

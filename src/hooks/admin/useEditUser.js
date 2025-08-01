import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // Your actual axios instance

export const useEditUser = (userId) => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    role: "",
    logisticCenter: "",
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const [logisticCenterOptions, setLogisticCenterOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  // Fetch data via backend API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setApiError(null);
      try {
        // Backend endpoints must exist and return the required data formats
        const userRes = await api.get(`/edituser/${userId}`);
        const rolesRes = await api.get("/roles");
        const centersRes = await api.get("/logistic-centers");

        setUser({
          fullName: userRes.data.fullName || "",
          email: userRes.data.email || "",
          phoneNumber: userRes.data.phoneNumber || "",
          role: userRes.data.role || "",
          logisticCenter: userRes.data.logisticCenter || "",
        });

        setRoleOptions([
          { value: "", label: "Select Role" },
          ...(rolesRes.data.map((role) => ({
            value: role.id,
            label: role.name,
          })) || [])
        ]);

        setLogisticCenterOptions([
          { value: "", label: "Select Center" },
          ...(centersRes.data.map((center) => ({
            value: center.id,
            label: `${center.name} - ${center.city}`,
          })) || [])
        ]);
      } catch (err) {
        setApiError(err.response?.data?.message || err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Validation logic
  const validateForm = () => {
    const newErrors = {};
    if (!user.fullName.trim()) newErrors.fullName = "Full name is required";
    else if (user.fullName.length < 3 || user.fullName.length > 50)
      newErrors.fullName = "Full name must be 3 to 50 characters";

    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email must be a valid address";

    if (!user.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    else if (!/^\+?\d{7,15}$/.test(user.phoneNumber))
      newErrors.phoneNumber = "Phone number must be valid";

    if (!user.role) newErrors.role = "Role is required";
    if (!user.logisticCenter) newErrors.logisticCenter = "Logistic center is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);
    setErrors({});
    setApiError(null);
    try {
      // You must implement the edit endpoint in your backend
      await api.put(`/edituser/${userId}`, user);
      // Optionally, show a toast or success state
      navigate("/users");
    } catch (err) {
      setApiError(err.response?.data?.message || err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

  const resetForm = () => {
    setErrors({});
    // Optionally re-fetch or reset user to the last loaded data
  };

//   setLoading(false);
  return {
    user,
    setUser,
    roleOptions,
    logisticCenterOptions,
    errors,
    apiError,
    loading,
    saving,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

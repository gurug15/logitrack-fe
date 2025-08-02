import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export const useEditUser = (userId) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    roleId: "",
    logisticCenterId: "",
  });
  const [roleOptions, setRoleOptions] = useState([]);
  const [logisticCenterOptions, setLogisticCenterOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setApiError(null);
      try {
        // Fixed API calls to match your backend
        const userRes = await api.get(`/users/${userId}`);
        const rolesRes = await api.get("/roles");
        const centersRes = await api.get("/logistic-centers");

        console.log("User data:", userRes.data);
        console.log("Roles:", rolesRes.data);
        console.log("Centers:", centersRes.data);

        // Map User entity to form fields
        setUser({
          name: userRes.data.name || "",
          email: userRes.data.email || "",
          phone: userRes.data.phone || "",
          roleId: userRes.data.roleId?.id || "",
          logisticCenterId: userRes.data.logisticCenterId?.id || "",
        });

        // Map roles to select options
        setRoleOptions([
          { value: "", label: "Select Role" },
          ...(rolesRes.data.map((role) => ({
            value: role.id,
            label: role.name,
          })) || [])
        ]);

        // Map centers to select options
        setLogisticCenterOptions([
          { value: "", label: "Select Center" },
          ...(centersRes.data.map((center) => ({
            value: center.id,
            label: center.name,
          })) || [])
        ]);
      } catch (err) {
        console.error("Error fetching data:", err);
        setApiError(err.response?.data?.message || err.message || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const validateForm = () => {
    const newErrors = {};
    if (!user.name.trim()) newErrors.name = "Name is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!user.phone.trim()) newErrors.phone = "Phone is required";
    if (!user.roleId) newErrors.roleId = "Role is required";
    if (!user.logisticCenterId) newErrors.logisticCenterId = "Logistic center is required";

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
      // Convert to UpdateUserDto format
      const updateData = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        roleId: parseInt(user.roleId),
        logisticCenterId: parseInt(user.logisticCenterId),
      };

      await api.put(`/users/edit/${userId}`, updateData);
      navigate("/admin"); // Navigate back to user list
    } catch (err) {
      console.error("Error updating user:", err);
      setApiError(err.response?.data?.message || err.message || "Failed to update user");
    } finally {
      setSaving(false);
    }
  };

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
  };
};
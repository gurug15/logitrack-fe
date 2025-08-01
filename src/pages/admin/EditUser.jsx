
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { useEditUser } from "../../hooks/admin/useEditUser";

const EditUserPage = ({ userId }) => {
  const {
    user,
    roleOptions,
    logisticCenterOptions,
    errors,
    apiError,
    loading,
    saving,
    handleChange,
    handleSubmit,
  } = useEditUser(userId);



  const breadcrumbItems = [
    { label: "Users", link: "/admin" },
    { label: "Edit User" },
  ];

  if (loading) return <LoadingSpinner />;
  if (apiError) return <ErrorMessage message={apiError} onRetry={() => window.location.reload()} />;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Breadcrumb items={breadcrumbItems} />
      <h1 className="text-3xl font-bold my-4 px-4">Edit User</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-5 px-4">
        {apiError && (
          <p className="text-red-600 text-center font-medium">{apiError}</p>
        )}
        <Input
          label="Full Name"
          name="fullName"
          value={user.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          error={errors.fullName}
          disabled={saving}
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={user.email}
          onChange={handleChange}
          placeholder="Enter email address"
          error={errors.email}
          disabled={saving}
        />
        <Input
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          value={user.phoneNumber}
          onChange={handleChange}
          placeholder="Enter phone number"
          error={errors.phoneNumber}
          disabled={saving}
        />
        <Select
          label="Role"
          name="role"
          value={user.role}
          onChange={handleChange}
          options={roleOptions}
          error={errors.role}
          disabled={saving}
        />
        <Select
          label="Logistic Center Assignment"
          name="logisticCenter"
          value={user.logisticCenter}
          onChange={handleChange}
          options={logisticCenterOptions}
          error={errors.logisticCenter}
          disabled={saving}
        />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" type="button" onClick={() => window.history.back()} disabled={saving}>
            Cancel
          </Button>
          <Button variant="primary" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUserPage;



const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#527ec5]"></div>
    <span className="ml-2 text-[#6a7381]">Loading...</span>
  </div>
);

// Error Message Component
const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center p-8 text-center">
    <div className="text-red-500 mb-2">
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p className="text-red-600 mb-4">{message}</p>
    {onRetry && (
      <Button variant="primary" onClick={onRetry} size="small">
        Try Again
      </Button>
    )}
  </div>
);
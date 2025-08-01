import { Breadcrumb } from "../../components/admin/BreadCrumb";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";


const CreateLogisticCenterPage = () => {
  // Placeholder handlers (replace with your hook's handlers)
  const handleChange = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement submit logic later
  };

  // Example breadcrumb items - update as per your routing
  const breadcrumbItems = [
    { label: "Admin", link: "/admin" },
    { label: "Centers", link: "/admin/centers" },
    { label: "Create New Logistic Center" },
  ];

  // Example options for State and Subadmin/Manager selects
  const stateOptions = [
    { value: "", label: "Select state" },
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
  ];

  const subadminOptions = [
    { value: "", label: "Select subadmin/manager" },
    { value: "one", label: "one" },
    { value: "two", label: "two" },
    { value: "three", label: "three" },
  ];

  return (
  

        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
            {/* Breadcrumb */}
            <Breadcrumb items={breadcrumbItems} />

            {/* Page Title */}
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight min-w-72">
                Create New Logistic Center
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 px-4">
              <Input
                label="Center Name"
                name="centerName"
                placeholder="Enter center name"
                onChange={handleChange}
                value=""
              />

              <Input
                label="City"
                name="city"
                placeholder="Enter city"
                onChange={handleChange}
                value=""
              />

              <Select
                label="State"
                name="state"
                options={stateOptions}
                onChange={handleChange}
                value=""
              />

              <Input
                label="Address"
                name="address"
                placeholder="Enter address"
                onChange={handleChange}
                value=""
                type="textarea"
                // If your FormInput doesn't support textarea, you can create a separate Textarea component or extend it.
                // For now, you can manage it per your implementation.
              />

              <Input
                label="Contact Phone"
                name="contactPhone"
                placeholder="Enter contact phone"
                onChange={handleChange}
                value=""
              />

              <Select
                label="Assign Subadmin/Manager"
                name="subadminManager"
                options={subadminOptions}
                onChange={handleChange}
                value=""
              />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 justify-end mt-4">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Create Center
                </Button>
              </div>
            </form>
          </div>
        </div>
     
  );
};

export default CreateLogisticCenterPage;

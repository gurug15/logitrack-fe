
import { Breadcrumb } from "../../components/admin/BreadCrumb";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { Select } from "../../components/ui/Select";
import { useCreateCenter } from "../../hooks/admin/useCreateCenter";

const CreateLogisticCenterPage = () => {
    // Use the hook to get state and handlers
    const { center, isLoading, error, handleChange, handleSubmit } = useCreateCenter();

    const breadcrumbItems = [
        { label: "Admin", link: "/admin" },
        { label: "Centers", link: "/admin/centers" },
        { label: "Create New Center" },
    ];

    // Example state options. Ideally, fetch this from an API.
    const stateOptions = [
        { value: "", label: "Select a state" },
        { value: "Maharashtra", label: "Maharashtra" }
    ];

    return (
        <div className="flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full md:w-[512px] py-5">
                <Breadcrumb items={breadcrumbItems} />

                <div className="flex flex-wrap justify-between gap-3 p-4">
                    <p className="text-[#121416] tracking-light text-[32px] font-bold leading-tight">
                        Create New Logistic Center
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 px-4">
                    {/* Display API errors */}
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                           <p>{error}</p>
                        </div>
                    )}
                    
                    <Input label="Center Name" name="name" placeholder="Enter center name" onChange={handleChange} value={center.name} required />
                    <Input label="City" name="city" placeholder="Enter city" onChange={handleChange} value={center.city} required />
                    <Select label="State" name="state" options={stateOptions} onChange={handleChange} value={center.state} required />
                    <Input label="Address" name="address" placeholder="Enter full address" onChange={handleChange} value={center.address} type="textarea" required />
                    <Input label="Postal Code" name="postalcode" placeholder="Enter 6-digit postal code" onChange={handleChange} value={center.postalcode} required />
                    <Input label="Contact Phone" name="contactPhone" placeholder="Enter contact phone" onChange={handleChange} value={center.contactPhone} type="tel" required />
                    
                    {/* Subadmin field removed to match backend model */}

                    <div className="flex flex-wrap gap-3 justify-end pt-4">
                        <Button type="button" variant="secondary" onClick={() => window.history.back()}>Cancel</Button>
                        <Button type="submit" variant="primary" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create Center'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateLogisticCenterPage;
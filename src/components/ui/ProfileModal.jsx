import { useUserProfile } from "../../hooks/user/useUserProfile";
import Button from "./Button";
import Input from "./Input";


// A small helper component for displaying profile fields
const ProfileField = ({ label, value, name, isEditing, onChange }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500">{label}</label>
        {isEditing ? (
            <Input
                name={name}
                value={value}
                onChange={onChange}
                className="mt-1" // Add any specific styling needed
            />
        ) : (
            <div className="w-full p-2 mt-1 bg-gray-100 rounded-md text-gray-800">
                {value || '-'}
            </div>
        )}
    </div>
);

const ProfileModal = ({ isOpen, onClose }) => {
    const { profile, isLoading, error, isEditing, formData, logout, handleEditToggle, handleChange, handleSave } = useUserProfile(isOpen);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
                    <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">&times;</button>
                </div>

                {isLoading ? (
                    <p>Loading profile...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div>
                        <ProfileField label="Full name" name="name" value={formData.name} isEditing={isEditing} onChange={handleChange} />
                        <ProfileField label="Email" value={profile?.email} isEditing={false} />
                        <ProfileField label="Phone" name="phone" value={formData.phone} isEditing={isEditing} onChange={handleChange} />
                        <ProfileField label="Role" value={profile?.roleName} isEditing={false} />
                        <ProfileField label="Logistic center" value={profile?.logisticCenterName} isEditing={false} />
                        
                        <div className="flex justify-between items-center mt-6">
                            <Button onClick={logout} variant="secondary">Logout</Button>
                            <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <Button onClick={handleEditToggle} variant="secondary">Cancel</Button>
                                        <Button onClick={handleSave} disabled={isLoading}>
                                            {isLoading ? 'Saving...' : 'Save'}
                                        </Button>
                                    </>
                                ) : (
                                    <Button onClick={handleEditToggle}>Edit</Button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
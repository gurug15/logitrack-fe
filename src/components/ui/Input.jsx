const Input = ({
    onChange, 
    placeholder, 
    type, 
    value, 
    label, 
    name, 
    error, 
    disabled,
    id
}) => {
    // Generate unique id if not provided
    const inputId = id || name || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    return (
        <div>
            <label 
                className='mt-2 block text-sm font-medium mb-2' 
                htmlFor={inputId}
            >
                {label}
            </label>
            <input 
                id={inputId}
                type={type}
                name={name || undefined}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                disabled={disabled}
                className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${
                    error 
                        ? 'border-red-500 focus:ring-red-500 text-red-900' 
                        : 'border-gray-300 focus:ring-blue-500'
                } ${
                    disabled 
                        ? 'bg-gray-100 cursor-not-allowed opacity-60' 
                        : 'bg-white'
                }`}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    )
}

export default Input

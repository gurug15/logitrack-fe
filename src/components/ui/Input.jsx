


const Input = ({onChange, placeholder,type,value,label}) => {
  return (
    <div>
        <label className='mt-5 block text-sm font-medium mb-2' htmlFor='password'>{label}</label>
        <input type={type} value={value} onChange={onChange} placeholder={placeholder} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    </div>
  )
}

export default Input
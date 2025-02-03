export const Dropdown = ({ className, options, value, onChange, placeholder, ...props }) => (
    <select
      value={value}
      onChange={onChange}
      className={`
        h-10 px-2
        text-base
        border border-gray-300 
        rounded-md
        bg-white
        appearance-none
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-gray-50
        focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#ff6842]/20
        bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"%3E%3Cpath d="M6 9L0 0h12z" fill="%23FF6842"/%3E%3C/svg%3E')]
        bg-no-repeat
        bg-right-4
        bg-center-y
        pr-8
        ${className}
      `}
      {...props}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
  
  export default Dropdown;
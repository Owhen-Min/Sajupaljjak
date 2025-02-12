export const Dropdown = ({ className, options, value, onChange, placeholder, ...props }) => (
    <select
      value={value}
      onChange={onChange}
      className={`
        h-10 pl-2
        text-sm
        border border-gray-300 
        rounded-md
        bg-white
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-gray-50
        focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#ff6842]/20
        bg-[url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"%3E%3Cpath d="M3 6l5 5 5-5" stroke="%23FF6842" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/%3E%3C/svg%3E')]
        bg-no-repeat
        bg-right-4
        bg-center-y
        pr-1
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
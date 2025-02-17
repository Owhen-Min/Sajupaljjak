export const Dropdown = ({
  className,
  options,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <select
    value={value}
    onChange={onChange}
    className={`
        h-10 pl-2
        text-sm
        border border-gray-300 
        rounded-md
        bg-gray-50
        cursor-pointer
        transition-all duration-300 ease-in-out
        hover:bg-gray-50
        focus:outline-none 

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

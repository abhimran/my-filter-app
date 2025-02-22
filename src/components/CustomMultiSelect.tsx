import { useState, useRef, useEffect } from "react";

interface CustomMultiSelectProps {
  options: string[];
  values: string[];
  onChange: (vals: string[]) => void;
  placeholder?: string;
}

function CustomMultiSelect({
  options,
  values,
  onChange,
  placeholder = "Select options",
}: CustomMultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleCheckboxChange = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      onChange([option, ...values]);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const displayText = values.length ? values.join(", ") : placeholder;

  return (
    <div className="relative inline-block w-52" ref={selectRef} tabIndex={0}>
      <div
        className="border border-gray-300 rounded-md px-2 py-1 bg-white cursor-pointer flex justify-between items-center"
        onClick={toggleDropdown}
      >
        <span className="truncate">{displayText}</span>
        <svg
          className={`w-4 h-4 transform transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-20 bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-auto shadow-lg w-full">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center px-2 py-1 hover:bg-gray-100 cursor-pointer"
            >
              <input
                type="checkbox"
                className="mr-2"
                checked={values.includes(option)}
                onChange={() => handleCheckboxChange(option)}
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default CustomMultiSelect;

import React, { useState, useRef, useEffect } from "react";
import styles from "./MultiSelectDropdown.module.scss";

interface Option {
  label: string;
  value: string;
  icon: string;
}

interface MultiSelectDropdownProps {
  options: Option[];
  onChange: (selected: Option[]) => void;
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<Option[]>(options);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      const newOption: Option = {
        label: inputValue,
        value: inputValue.toLowerCase().replace(/\s+/g, "-"),
        icon: "",
      };
      setDropdownOptions((prev) => [...prev, newOption]);
      setSelectedOptions((prev) => [...prev, newOption]);
      onChange([...selectedOptions, newOption]);
      setInputValue("");
    }
  };

  const handleOptionClick = (option: Option) => {
    const alreadySelected = selectedOptions.find(
      (o) => o.value === option.value
    );
    let updatedSelected;
    if (alreadySelected) {
      updatedSelected = selectedOptions.filter((o) => o.value !== option.value);
    } else {
      updatedSelected = [...selectedOptions, option];
    }
    setSelectedOptions(updatedSelected);
    onChange(updatedSelected);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.control} onClick={toggleDropdown} tabIndex={0}>
        {selectedOptions.length > 0
          ? selectedOptions.map((opt) => opt.label).join(", ")
          : "Select..."}
      </div>

      {isOpen && (
        <div className={styles.menu}>
          <input
            className={styles.input}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type and press Enter to add"
          />
          <div className={styles.options}>
            {dropdownOptions.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  selectedOptions.find((o) => o.value === option.value)
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <span>
                  <span style={{ margin: "0 4px" }}>{option.label}</span>
                  {option.icon}
                </span>
                {selectedOptions.find((o) => o.value === option.value) && (
                  <span className={styles.check}>✔</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

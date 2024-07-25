import React from 'react';

const Dropdown = ({ placeholder, options, value, onChange, disabled }) => {
  const selectStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '150px',
  };

  return (
    <select style={selectStyle} value={value} onChange={onChange} disabled={disabled}>
      <option value="">{placeholder}</option>
      {options.map(option => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;

import React from "react";
export default function Input({ objValue, onChange, index, deleteField }: any) {
  const { label, type, value } = objValue;
  return (
    <div className="input-group">
      <label htmlFor={label}>{label}</label>
      <div className="input">
        <input
          type={type || "text"}
          id={label}
          value={value || ""}
          onChange={(e) => onChange(e, index)}
        />
        {/* Add this */}
        {/* <div onClick={(e) => deleteField(e, index)}>X</div> */}
      </div>
    </div>
  );
}

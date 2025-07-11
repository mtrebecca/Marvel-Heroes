import React from "react";

interface HeroFiltersProps {
  onChange: (filters: { name?: string }) => void;
  value: { name?: string };
}

const HeroFilters: React.FC<HeroFiltersProps> = ({ onChange, value }) => (
  <div style={{ marginBottom: "1rem" }}>
    <input
      type="text"
      placeholder="Filter by name..."
      value={value.name || ""}
      onChange={(e) => onChange({ name: e.target.value })}
      style={{
        padding: "8px",
        width: "100%",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    />
  </div>
);

export default HeroFilters;

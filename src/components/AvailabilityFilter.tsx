import { FC } from "react";
import { AvailabilityFilterProps } from "../types/Book";

const AvailabilityFilter: FC<AvailabilityFilterProps> = ({ 
  available, 
  onClick, 
  isActive, 
  className = "" 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg font-semibold transition-all
        ${available
          ? "bg-green-500/30 text-green-800 hover:bg-green-500/50"
          : "bg-red-500/30 text-red-800 hover:bg-red-500/50"
        }
        ${isActive ? "ring-2 ring-offset-2" : ""}
        ${isActive && available ? "ring-green-600" : ""}
        ${isActive && !available ? "ring-red-600" : ""}
        ${className}
      `}
    >
      {available ? "✓ Available" : "✗ Not Available"}
    </button>
  );
};

export default AvailabilityFilter;

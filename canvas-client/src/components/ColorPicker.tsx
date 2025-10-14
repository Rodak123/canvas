import type React from "react";

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  return (
    <div className="h-100">
      <p style={{ fontFamily: 'monospace' }}>{color}</p>
      <input type="color" value={color} onChange={(e) => {
        setColor(e.target.value);
      }} />
    </div>
  );
};
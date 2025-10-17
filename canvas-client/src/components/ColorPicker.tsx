import type React from "react";
import Color from 'color';
import { useColors } from "../hooks/useColors";

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  const { colors } = useColors();
  const currentColor = Color(color);

  const textColor = currentColor.isDark() ? '#ffffff' : '#000000';

  return (
    <div className="h-100" style={{
      maxWidth: '25vw'
    }}>
      <p className="text-center fs-4" style={{ color: textColor }}>Pick a color</p>
      {colors.map((color) => {
        return (
          <button
            key={color}
            style={{
              width: '20px',
              height: '20px',
              backgroundColor: `#${color}`,
              border: 'none',
            }}
            className="m-1"
            onClick={() => {
              setColor(`#${color}`)
            }}
          />
        );
      })}
    </div>
  );
};
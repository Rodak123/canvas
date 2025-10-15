import type React from "react";
import { useEffect, useState } from "react";
import Color from 'color';

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  const [colors, setColors] = useState<string[]>([]);
  const currentColor = Color(color);

  useEffect(() => {
    const fetchColors = async () => {
      const response = await fetch('/palette.txt');
      if (!response.ok) {
        throw Error("Failed to fetch colors")
      }

      const txt = await response.text();
      const lines = txt
        .split(/\r?\n/)
        .filter((val) => val.length > 0);
      setColors(lines);
    };

    fetchColors();
  }, []);

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
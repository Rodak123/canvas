import type React from "react";
import Color from 'color';
import { useColors } from "../hooks/useColors";
import { useCallback, useEffect } from "react";

interface ColorPickerProps {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ color, setColor }) => {
  const { colors, isLoaded } = useColors();
  const currentColor = Color(color);

  const buttonSize = 32;
  const textColor = currentColor.isDark() ? '#ffffff' : '#000000';

  const changeColor = useCallback((hex: string) => {
    setColor(`#${hex}`)
  }, [setColor]);

  useEffect(() => {
    if (!isLoaded) return;
    changeColor(colors[0]);
  }, [isLoaded, colors, changeColor]);

  return (
    <div className="d-flex flex-column gap-4">
      <div>
        <p className="text-center fs-4 text-uppercase" style={{ color: textColor }}>Pick a color</p>
        {colors.map((color) => {
          return (
            <button
              key={color}
              style={{
                width: `${buttonSize}px`,
                height: `${buttonSize}px`,
                backgroundColor: `#${color}`,
                border: 'none',
              }}
              className="m-1"
              onClick={() => {
                changeColor(color);
              }}
            />
          );
        })}
      </div>
      <div>
        <p className="text-center fs-4 text-uppercase" style={{ color: textColor }}>Input any color</p>
        <input
          className="w-100 p-0"
          style={{
            borderColor: textColor,
            height: `${buttonSize}px`,
          }}
          type="color"
          value={color}
          onChange={(e) => changeColor(e.target.value.substring(1))}
        />
      </div>
    </div>
  );
};
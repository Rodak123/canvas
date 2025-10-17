import { useEffect, useState } from "react";
import { parsePalette } from "../utilities/palette";

const paletteUri = '/palette.txt';

export const useColors = () => {
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {
        const fetchColors = async () => {
            const response = await fetch(paletteUri);
            if (!response.ok) {
                throw Error("Failed to fetch colors")
            }

            const txt = await response.text();
            const palette = parsePalette(txt);
            setColors(palette);
        };

        fetchColors();
    }, []);

    return { colors }
};
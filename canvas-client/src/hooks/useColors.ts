import { useEffect, useState } from "react";
import { parsePalette } from "../utilities/palette";

const paletteUri = '/palette.txt';

export const useColors = () => {
    const [colors, setColors] = useState<string[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchColors = async () => {
            const response = await fetch(paletteUri);
            if (!response.ok) {
                throw Error("Failed to fetch colors")
            }

            const txt = await response.text();
            const palette = parsePalette(txt);
            setColors(palette);
            setIsLoaded(true);
        };

        fetchColors();
    }, []);

    return { colors, isLoaded }
};
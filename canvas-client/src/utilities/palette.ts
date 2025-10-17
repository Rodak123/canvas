
export const parsePalette = (fileText: string) => {
    return fileText
        .split(/\r?\n/)
        .filter((val) => val.length > 0);
};
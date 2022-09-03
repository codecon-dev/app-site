export const createMarkup = (text: string) => {
    return { __html: text.replace(/(?:\r\n|\r|\n)/g, '<br>') };
};

const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
        : null;
};

const luminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(function (v) {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export const contrast = (hex: string) => {
    const rgb: number[] | null = hexToRgb(hex);

    if (!rgb) {
        return 0;
    }

    const lum1 = luminance(rgb[0], rgb[1], rgb[2]);
    const lum2 = luminance(255, 255, 255);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
};

export const nl2br = (str?: string, is_xhtml?: boolean) => {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    const breakTag = is_xhtml || typeof is_xhtml === 'undefined' ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
};

export const getLastPath = (pathname: string) => {
    const paths = pathname.split('/')
    return paths[paths.length - 1]
}
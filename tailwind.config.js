/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'handjet-black': ['Handjet-Black'],
                'handjet-light': ['Handjet-Light'],
                'handjet-regular': ['Handjet-Regular'],
                'ubuntu-italic': ['Ubuntu-Italic'],
                'ubuntu-light': ['Ubuntu-Light'],
                'ubuntu-regular': ['Ubuntu-Regular'],
            },
            colors: {
                primary: '#ff00aa',
                primary100: '#ffb3d9',
                primary200: '#ff80c0',
                primary300: '#ff4da6',
                primary400: '#ff1a8d',
                primary500: '#e6007a',
                primary600: '#b3005c',
                primary700: '#800040',
                primary800: '#4d001f',
                primary900: '#1a0000',
                secondary: '#ffed20',
                secondary50: '#fff9cc',
                secondary100: '#fff099',
                secondary200: '#ffed66',
                secondary300: '#ffe933',
                secondary400: '#ffe600',
                secondary500: '#e6cc00',
                secondary600: '#b3a300',
                secondary700: '#806600',
                secondary800: '#4d3a00',
                secondary900: '#1a0d00',
                tertiary: '#00FFFF',
                tertiary50: '#e6ffff',
                tertiary100: '#b3ffff',
                tertiary200: '#80ffff',
                tertiary300: '#4dffff',
                tertiary400: '#1affff',
                tertiary500: '#00e6e6',
                tertiary600: '#00b3b3',
                tertiary700: '#008080',
                tertiary800: '#004d4d',
                tertiary900: '#001a1a',
                neutral: '#ededed',
                neutral50: '#f2f2f2',
                neutral100: '#d9d9d9',
                neutral200: '#bfbfbf',
                neutral300: '#a6a6a6',
                neutral400: '#8c8c8c',
                neutral500: '#737373',
                neutral600: '#595959',
                neutral700: '#404040',
                neutral800: '#262626',
                neutral900: '#0d0d0d',
                dark: '#2d2d2d',
                dark50: '#4d4d4d',
                dark100: '#404040',
                dark200: '#333333',
                dark300: '#262626',
                dark400: '#1a1a1a',
                dark500: '#0d0d0d',
            },
            backgroundColor: {
                primary100: '#ffb3d9',
                primary200: '#ff80c0',
                primary300: '#ff4da6',
                primary400: '#ff1a8d',
                primary500: '#e6007a',
                primary600: '#b3005c',
                primary700: '#800040',
                primary800: '#4d001f',
                primary900: '#1a0000',
                secondary50: '#fff9cc',
                secondary100: '#fff099',
                secondary200: '#ffed66',
                secondary300: '#ffe933',
                secondary400: '#ffe600',
                secondary500: '#e6cc00',
                secondary600: '#b3a300',
                secondary700: '#806600',
                secondary800: '#4d3a00',
                secondary900: '#1a0d00',
                tertiary50: '#e6ffff',
                tertiary100: '#b3ffff',
                tertiary200: '#80ffff',
                tertiary300: '#4dffff',
                tertiary400: '#1affff',
                tertiary500: '#00e6e6',
                tertiary600: '#00b3b3',
                tertiary700: '#008080',
                tertiary800: '#004d4d',
                tertiary900: '#001a1a',
                neutral50: '#f2f2f2',
                neutral100: '#d9d9d9',
                neutral200: '#bfbfbf',
                neutral300: '#a6a6a6',
                neutral400: '#8c8c8c',
                neutral500: '#737373',
                neutral600: '#595959',
                neutral700: '#404040',
                neutral800: '#262626',
                neutral900: '#0d0d0d',
                dark50: '#4d4d4d',
                dark100: '#404040',
                dark200: '#333333',
                dark300: '#262626',
                dark400: '#1a1a1a',
                dark500: '#0d0d0d',
            },
        },
    },
    plugins: [],
};

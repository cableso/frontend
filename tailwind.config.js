import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export const content = ['./src/**/*.{vue,ts}']
export const theme = {
    extend: {
        fontFamily: {
            sans: ['Inter', ..._fontFamily.sans]
        }
    }
}

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            'dark-grey': '#595959',
            'medium-grey': '#7F7F7F',
            'grey': '#A5A5A5',
            'light-grey': '#CCCCCC',
            'white-grey': '#F2F2F2',
            'orange': '#FFB431',
            'red': '#E15050',
            'green': '#50E163',
            'blue': '#5885DD',
            'black': '#000000'
        },
    },
    // daisyui: {
    //     themes: ["cupcake"]
    // },
    daisyui: {
        themes: ["light"]
    },
    plugins: [require('daisyui')],
};
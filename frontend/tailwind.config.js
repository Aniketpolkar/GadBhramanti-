/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        header: ['"Tiro Devanagari Marathi"', 'serif'], // for headings
        body: ['"Anek Devanagari"', 'sans-serif'],     // for paragraphs
      },
    },
  },
  plugins: [],
};

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         header: ['"Tiro Devanagari Marathi"', 'serif'],
//         body: ['"Anek Devanagari"', 'sans-serif'],
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/typography'), // ✅ add this
//   ],
// };

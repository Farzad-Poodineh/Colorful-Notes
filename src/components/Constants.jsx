// Color options for notes
export const colorOptions = [
  '#FFFEE0', // Pastel Cream
  '#FAF8F6', // Pastel White
  '#FFFBD5', // Pastel Blond
  '#D5F6FB', // Pastel Aqua
  '#F6F3A9', // Pastel Lemon
  '#E5ECF8', // Pastel Snow
  '#F0EBD8', // Pastel Pearl
  '#D1FEB8', // Pastel Lime
  '#EFDFD8', // Pastel Skin
  '#F7DFC2', // Pastel Peach
  '#EBCCFF', // Pastel Mauve
  '#E7D7CA', // Pastel Nude
  '#BEDDF1', // Pastel Sky
  '#DAD4B6', // Pastel Khaki
  '#E9C9AA', // Pastel Tan
  '#E7D27C', // Pastel Gold
  '#CFCFC4', // Pastel Gray
  '#F6B8D0', // Pastel Rose
  '#F1BEB5', // Pastel Flesh
  '#F8C57C', // Pastel Amber
  '#D7CAB7', // Pastel Earth
  '#A4DBD8', // Pastel Cyan
  '#D4C6AA', // Pastel Beige
  '#D3C7A2', // Pastel Sand
];

export const MAX_LENGTH = 200;

// Utility function to get random color
export const getRandomColor = () =>
  colorOptions[Math.floor(Math.random() * colorOptions.length)];

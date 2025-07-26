module.exports = {
  locales: ['en'],
  input: ['src/**/*.{js,jsx,ts,tsx}'],
  output: 'src/locales/$LOCALE/translation.json',
  defaultValue: '',
  useKeysAsDefaultValue: false,
  keySeparator: false,
  namespaceSeparator: false,
};
import { createContext } from 'react';

export type ThemeContextType = 'digital' | 'summit' | 'feature';

const defaultContext = 'digital';

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export default ThemeContext;

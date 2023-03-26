import { createContext } from 'react';

export type ThemeContextType = 'digital' | 'summit' | 'feature' | 'ia' | undefined;

const defaultContext = undefined;

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export default ThemeContext;

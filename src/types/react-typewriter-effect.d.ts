declare module 'react-typewriter-effect' {
  import { ReactNode } from 'react';

  interface TypewriterProps {
    text: string;
    typeSpeed?: number;
    eraseSpeed?: number;
    delaySpeed?: number;
    cursorColor?: string;
    hideCursorAfterText?: boolean;
    textStyle?: React.CSSProperties;
  }

  const Typewriter: React.FC<TypewriterProps>;
  export default Typewriter;
}
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}
function Button({ onClick, children }: ButtonProps) {
  return (
    <button type="button" className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;

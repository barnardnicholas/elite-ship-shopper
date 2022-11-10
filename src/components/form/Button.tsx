import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
}
function Button({ onClick, children }: ButtonProps) {
  return (
    <div className="button-wrapper">
      <button type="button" className="button" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;

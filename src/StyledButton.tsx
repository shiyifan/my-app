import type { MouseEventHandler, ReactNode } from 'react';
import './StyledButton.css';

export default function StyledButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button className="styled-btn" onClick={onClick}>
      {children}
    </button>
  );
}

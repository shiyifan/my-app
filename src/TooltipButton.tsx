import { useLayoutEffect, useRef, useState, type CSSProperties, type MouseEventHandler, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './TooltipButton.module.scss';

export default function TooltipButton({ tooltip, children, className, style, onClick }: TooltipProp) {
  const dom = useRef<HTMLButtonElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);

  return (
    <>
      <button className={className} style={style} ref={dom} onClick={onClick} onPointerEnter={handleEnter} onPointerLeave={handleLeave}>
        {children}
      </button>
      {rect != null && createPortal(<Tooltip buttonRect={rect}>{tooltip}</Tooltip>, document.body)}
    </>
  );

  function handleEnter() {
    if (dom.current == null) return;

    const { x, y, height } = dom.current.getBoundingClientRect(); // 相对于viewport的坐标,受滚动影响
    setRect({ x, y, h: height });
  }
  function handleLeave() {
    setRect(null);
  }
}

function Tooltip({ children, buttonRect }: { children: ReactNode; buttonRect: Rect }) {
  const wrapperDOM = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState(0);

  useLayoutEffect(() => {
    const h = wrapperDOM.current?.getBoundingClientRect().height;
    setWrapperHeight(h == null ? 0 : h);
  }, []);

  const tooltipX = buttonRect.x;
  let tooltipY;
  let viewportY = buttonRect.y - wrapperHeight;
  if (viewportY < 0) {
    // button上面viewport间的空间无法容纳tooltip, 改为在button下面显示
    tooltipY = buttonRect.y + buttonRect.h + window.scrollY;
  } else {
    tooltipY = viewportY + window.scrollY;
  }

  return (
    <div ref={wrapperDOM} className={styles['tooltip']} style={{ transform: `translate(${tooltipX}px, ${tooltipY}px)` }}>
      {children}
    </div>
  );
}

interface Rect {
  x: number;
  y: number;
  h: number;
}

interface TooltipProp {
  tooltip: ReactNode;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

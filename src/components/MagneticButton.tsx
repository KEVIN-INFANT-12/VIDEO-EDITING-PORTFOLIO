import {
  useRef,
  type ReactNode,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useHasFinePointer } from '../hooks/useMediaQuery';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
  variant?: 'solid' | 'line' | 'ghost';
  className?: string;
  ariaLabel?: string;
  cursorLabel?: string;
}

/** Button/link that leans toward the cursor on desktop; plain + accessible on touch. */
export default function MagneticButton({
  children,
  href,
  onClick,
  target,
  variant = 'solid',
  className = '',
  ariaLabel,
  cursorLabel = "Let's go",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const fine = useHasFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

  const onMove = (e: ReactMouseEvent) => {
    if (!fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    'group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition-colors duration-300 will-change-transform';
  const styles: Record<string, string> = {
    solid: 'bg-violet-glow text-white hover:bg-violet-soft shadow-glow',
    line: 'border border-white/25 text-chalk hover:border-violet-soft hover:text-violet-light',
    ghost: 'text-chalk/80 hover:text-violet-light',
  };

  const common = {
    ref: ref as never,
    onMouseMove: onMove,
    onMouseLeave: reset,
    style: { x: sx, y: sy },
    className: `${base} ${styles[variant]} ${className}`,
    'data-cursor': 'action',
    'data-cursor-label': cursorLabel,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <motion.a
        {...common}
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        onClick={onClick}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button {...common} type="button" onClick={onClick}>
      {children}
    </motion.button>
  );
}

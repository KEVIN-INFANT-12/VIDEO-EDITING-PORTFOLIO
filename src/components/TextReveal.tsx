import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Line-by-line mask reveal (split on \n). Uses useInView for reliable triggering.
 */
export function TextReveal({
  text,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.1,
}: {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const lines = text.split('\n');
  return (
    <span ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            className={`block ${lineClassName}`}
            initial={{ y: '110%' }}
            animate={inView ? { y: '0%' } : { y: '110%' }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1],
              delay: delay + i * stagger,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

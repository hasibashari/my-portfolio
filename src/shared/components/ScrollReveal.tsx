'use client';

import { motion, type HTMLMotionProps, type TargetAndTransition } from 'motion/react';
import { type ReactNode } from 'react';

export type AnimationVariant =
  | 'fade-up'
  | 'fade-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom-in'
  | 'blur-reveal'
  | 'pop-up';

interface ScrollRevealProps extends Omit<
  HTMLMotionProps<'div'>,
  'initial' | 'whileInView' | 'viewport' | 'transition'
> {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}

export default function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.6,
  distance = 32,
  once = false,
  className,
  style,
  ...props
}: ScrollRevealProps) {
  let initial: TargetAndTransition = { opacity: 0 };
  let whileInView: TargetAndTransition = { opacity: 1 };

  switch (variant) {
    case 'fade-up':
      initial = { opacity: 0, y: distance };
      whileInView = { opacity: 1, y: 0 };
      break;

    case 'fade-down':
      initial = { opacity: 0, y: -distance };
      whileInView = { opacity: 1, y: 0 };
      break;

    case 'slide-left':
      initial = { opacity: 0, x: distance, filter: 'blur(4px)' };
      whileInView = { opacity: 1, x: 0, filter: 'blur(0px)' };
      break;

    case 'slide-right':
      initial = { opacity: 0, x: -distance, filter: 'blur(4px)' };
      whileInView = { opacity: 1, x: 0, filter: 'blur(0px)' };
      break;

    case 'zoom-in':
      initial = { opacity: 0, scale: 0.92, y: distance * 0.5 };
      whileInView = { opacity: 1, scale: 1, y: 0 };
      break;

    case 'blur-reveal':
      initial = { opacity: 0, filter: 'blur(10px)', y: distance * 0.4 };
      whileInView = { opacity: 1, filter: 'blur(0px)', y: 0 };
      break;

    case 'pop-up':
      initial = { opacity: 0, scale: 0.95, y: distance };
      whileInView = { opacity: 1, scale: 1, y: 0 };
      break;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={whileInView}
      viewport={{ once, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
}

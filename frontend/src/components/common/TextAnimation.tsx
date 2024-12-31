import { AnimatePresence, motion, useInView } from 'motion/react';
import * as React from 'react';
 
export function GradualSpacing({ text }: { text: string }) {
  const ref = React.useRef(null);
  return (
    <div className="flex">
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            exit="hidden"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="tracking-tighter"
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}
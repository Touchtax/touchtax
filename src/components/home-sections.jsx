"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  wrap,
} from "framer-motion";
import { ImageIcon } from "@phosphor-icons/react/ssr";

import { cn } from "@/lib/utils";

/** Endless horizontal ticker. Slows down while hovered. */
export function Marquee({ items, speed = 40, className }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track || reduce) return;
    const half = track.scrollWidth / 2;
    const pxPerSec = hovered ? speed * 0.25 : speed;
    x.set(wrap(-half, 0, x.get() - (pxPerSec * delta) / 1000));
  });

  return (
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.ul ref={trackRef} style={{ x }} className="flex w-max items-center">
        {[...items, ...items].map((name, i) => (
          <li
            key={i}
            aria-hidden={i >= items.length || undefined}
            className="px-[clamp(20px,3vw,40px)] text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.03em] whitespace-nowrap text-foreground/35 transition-colors duration-300 hover:text-foreground"
          >
            {name}
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

/** Counts up from zero the first time it scrolls into view. */
export function CountUp({ value, prefix = "", suffix = "", className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => `${prefix}${Math.round(v)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, count, value]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {rounded}
    </motion.span>
  );
}

/** Gently bobbing element, used for the chips floating over image placeholders. */
export function Float({ children, className, delay = 0, distance = 8 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <motion.div
        animate={{ y: [0, -distance, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Stand-in for a photograph. Swap for next/image once real imagery is available. */
export function ImagePlaceholder({ label, className, children }) {
  return (
    <div
      role="img"
      aria-label={`${label} (image placeholder)`}
      className={cn(
        "relative isolate overflow-hidden rounded-[28px] bg-brand-100 bg-[linear-gradient(rgb(11_138_100/0.07)_1px,transparent_1px),linear-gradient(90deg,rgb(11_138_100/0.07)_1px,transparent_1px)] bg-[size:32px_32px]",
        className
      )}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_70%_20%,rgb(196_240_74/0.35),transparent_70%)]" />
      <div className="absolute inset-0 grid place-items-center">
        <span className="flex flex-col items-center gap-2 text-brand-700/70">
          <ImageIcon weight="duotone" className="size-12" />
          <span className="text-sm font-medium">{label}</span>
        </span>
      </div>
      {children}
    </div>
  );
}

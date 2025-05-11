"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BookOpeningOverlay({ onAnimationComplete }: { onAnimationComplete: () => void }) {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-gray-900 flex items-center justify-center z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2, duration: 1 }} // Adjust timing
      onAnimationComplete={onAnimationComplete}
    >
      <div className="relative w-[600px] h-[800px] flex">
        {/* Left Page */}
        <motion.div
          className="absolute w-1/2 h-full bg-white left-0 origin-left"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 90 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <Image src="/framsidaleft.png" alt="Left Page" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Right Page */}
        <motion.div
          className="absolute w-1/2 h-full bg-white right-0 origin-right"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: 90 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <Image src="/framsidaright.png" alt="Right Page" fill className="object-cover" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

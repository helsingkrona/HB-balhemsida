"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function BookOpeningAnimation() {
  return (
    <main className="flex items-center justify-center min-h-screen pt-1">
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
          animate={{ rotateY: -90 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div className="relative w-full h-full">
            <Image src="/framsidaright.png" alt="Right Page" fill className="object-cover" />
          </div>
        </motion.div>

      </div>
    </main>
  );
}

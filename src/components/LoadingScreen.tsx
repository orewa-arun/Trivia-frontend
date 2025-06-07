import { useRef, useEffect } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import Lottie from "lottie-react";
import peacockImage from "@assets/peacock-image.jpg";
import type { LottieRefCurrentProps } from "lottie-react";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  // Advanced dancing peacock Lottie animation for loading screen
  const dancingPeacockAnimation = {
    v: "5.7.4",
    fr: 24,
    ip: 0,
    op: 144,
    w: 400,
    h: 400,
    nm: "Dancing Peacock Loading",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Peacock Main Body",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: {
            a: 1,
            k: [
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 18, s: [15] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 36, s: [-15] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 54, s: [20] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 72, s: [-20] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 90, s: [10] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 108, s: [-10] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 126, s: [5] },
              { t: 144, s: [0] }
            ],
            ix: 10
          },
          p: {
            a: 1,
            k: [
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 12, s: [200, 180, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 24, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 36, s: [200, 170, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 48, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 60, s: [200, 160, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 72, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 84, s: [200, 175, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 96, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 108, s: [200, 185, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 120, s: [200, 200, 0] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 132, s: [200, 190, 0] },
              { t: 144, s: [200, 200, 0] }
            ],
            ix: 2
          },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [100] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 18, s: [110] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 36, s: [95] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 54, s: [115] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 72, s: [90] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 90, s: [105] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 108, s: [98] },
              { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 126, s: [107] },
              { t: 144, s: [100] }
            ],
            ix: 6
          }
        },
        ao: 0,
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0], ix: 3 },
            s: { a: 0, k: [120, 120], ix: 2 },
            nm: "Body",
            fill: {
              ty: "fl",
              c: {
                a: 1,
                k: [
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [0.2, 0.6, 1, 1] },
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 24, s: [0.8, 0.3, 0.9, 1] },
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 48, s: [0.1, 0.9, 0.4, 1] },
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 72, s: [0.9, 0.7, 0.2, 1] },
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 96, s: [0.6, 0.2, 0.8, 1] },
                  { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 120, s: [0.3, 0.8, 0.6, 1] },
                  { t: 144, s: [0.2, 0.6, 1, 1] }
                ],
                ix: 4
              },
              o: { a: 0, k: 100, ix: 5 },
            }
          }
        ],
        ip: 0,
        op: 144,
        st: 0,
        bm: 0
      }
    ]
  };

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.play();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Advanced Dancing Peacock with Lottie */}
        <motion.div 
          className="relative w-48 h-48 mx-auto"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          {/* Enhanced glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 opacity-30 blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Main mascot container */}
          <div className="relative w-full h-full">
            {/* Lottie Animation Layer */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Lottie
                lottieRef={lottieRef}
                animationData={dancingPeacockAnimation}
                loop={true}
                autoplay={true}
                className="w-32 h-32"
              />
            </div>

            {/* Fallback static image with enhanced animations */}
            <motion.img 
              src={peacockImage}
              alt="Dancing peacock mascot"
              className="w-full h-full object-cover rounded-full border-4 border-gradient-to-r from-blue-500 to-purple-500 shadow-2xl"
              animate={{
                rotate: [0, 5, -5, 3, -3, 0],
                scale: [1, 1.05, 0.98, 1.02, 1],
                y: [0, -8, 0, -4, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          {/* Enhanced sparkle effects */}
          <AnimatePresence>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className={`absolute w-3 h-3 rounded-full ${
                  i % 4 === 0 ? 'bg-yellow-400' :
                  i % 4 === 1 ? 'bg-blue-400' :
                  i % 4 === 2 ? 'bg-cyan-400' : 'bg-purple-400'
                }`}
                style={{
                  left: `${15 + i * 12}%`,
                  top: `${10 + (i % 3) * 30}%`,
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 360],
                  y: [0, -20, -40]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </AnimatePresence>

          {/* Orbiting elements */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="relative w-full h-full">
              <div className="absolute top-0 left-1/2 w-2 h-2 bg-yellow-400 rounded-full -translate-x-1/2"></div>
              <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full -translate-x-1/2"></div>
              <div className="absolute left-0 top-1/2 w-2 h-2 bg-purple-400 rounded-full -translate-y-1/2"></div>
              <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full -translate-y-1/2"></div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Enhanced message */}
        <motion.h2 
          className="text-3xl font-bold text-white mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {message}
        </motion.h2>
        
        {/* Advanced loading dots with wave animation */}
        <motion.div 
          className="flex justify-center space-x-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{
                y: [0, -12, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1.2,
                delay: i * 0.1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Progress indicator */}
        <motion.div
          className="w-64 h-1 bg-slate-700 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 256, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
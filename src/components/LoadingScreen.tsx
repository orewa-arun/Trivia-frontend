import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  // Simplified peacock animation data for orange theme
  // const peacockAnimation = {
  //   v: "5.7.4",
  //   fr: 24,
  //   ip: 0,
  //   op: 120,
  //   w: 200,
  //   h: 200,
  //   nm: "Peacock Orange",
  //   ddd: 0,
  //   assets: [],
  //   layers: [
  //     {
  //       ddd: 0,
  //       ind: 1,
  //       ty: 4,
  //       nm: "Peacock Body",
  //       sr: 1,
  //       ks: {
  //         o: { a: 0, k: 100, ix: 11 },
  //         r: {
  //           a: 1,
  //           k: [
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [0] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 30, s: [8] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 60, s: [-8] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 90, s: [5] },
  //             { t: 120, s: [0] }
  //           ],
  //           ix: 10
  //         },
  //         p: {
  //           a: 1,
  //           k: [
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [100, 100, 0] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 30, s: [100, 90, 0] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 60, s: [100, 100, 0] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 90, s: [100, 95, 0] },
  //             { t: 120, s: [100, 100, 0] }
  //           ],
  //           ix: 2
  //         },
  //         a: { a: 0, k: [0, 0, 0], ix: 1 },
  //         s: {
  //           a: 1,
  //           k: [
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [100] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 30, s: [105] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 60, s: [95] },
  //             { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 90, s: [102] },
  //             { t: 120, s: [100] }
  //           ],
  //           ix: 6
  //         }
  //       },
  //       ao: 0,
  //       shapes: [
  //         {
  //           ty: "el",
  //           p: { a: 0, k: [0, 0], ix: 3 },
  //           s: { a: 0, k: [80, 80], ix: 2 },
  //           nm: "Body",
  //           fill: {
  //             ty: "fl",
  //             c: {
  //               a: 1,
  //               k: [
  //                 { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 0, s: [1, 0.6, 0.2, 1] },
  //                 { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 40, s: [1, 0.4, 0.1, 1] },
  //                 { i: { x: [0.42], y: [0] }, o: { x: [0.58], y: [1] }, t: 80, s: [1, 0.7, 0.3, 1] },
  //                 { t: 120, s: [1, 0.6, 0.2, 1] }
  //               ],
  //               ix: 4
  //             },
  //             o: { a: 0, k: 100, ix: 5 },
  //           }
  //         }
  //       ],
  //       ip: 0,
  //       op: 120,
  //       st: 0,
  //       bm: 0
  //     }
  //   ]
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-sm w-full">
        
        {/* Clean mascot container */}
        <motion.div 
          className="relative w-32 h-32 mx-auto"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "backOut" }}
        >
          {/* Subtle glow effect */}
          <motion.div 
            className="absolute inset-0 rounded-full bg-white/20 blur-xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          
          {/* Main orange mascot circle */}
          <motion.div
            className="relative w-full h-full bg-orange-100 rounded-full shadow-lg border-4 border-white/50 flex items-center justify-center overflow-hidden"
            animate={{
              y: [0, -4, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Cool Orange Character */}
            <motion.div
              className="relative flex flex-col items-center justify-center"
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Orange body */}
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full border-2 border-orange-600 relative">
                  {/* Green leaf */}
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-3 h-4 bg-green-500 rounded-full border border-green-600 transform rotate-12"></div>
                    <div className="absolute top-0 right-0 w-1 h-2 bg-black rounded-full transform rotate-45"></div>
                  </div>
                  
                  {/* Cool sunglasses */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center">
                      <div className="w-5 h-4 bg-gray-800 rounded border border-black"></div>
                      <div className="w-1 h-1 bg-black"></div>
                      <div className="w-5 h-4 bg-gray-800 rounded border border-black"></div>
                    </div>
                    {/* Sunglasses highlights */}
                    <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-white/50 rounded-full"></div>
                    <div className="absolute top-0.5 right-0.5 w-1 h-1 bg-white/50 rounded-full"></div>
                  </div>
                  
                  {/* Cool smile */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-4 h-2 border-b-2 border-black rounded-b-full"></div>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute top-2 left-3 w-2 h-3 bg-white/30 rounded-full transform rotate-45"></div>
                </div>
                
                {/* Stick arms */}
                <div className="absolute -left-2 top-8 w-4 h-0.5 bg-black transform -rotate-12"></div>
                <div className="absolute -right-2 top-8 w-4 h-0.5 bg-black transform rotate-12"></div>
                
                {/* Stick legs */}
                <div className="absolute -bottom-2 left-6 w-0.5 h-4 bg-black"></div>
                <div className="absolute -bottom-2 right-6 w-0.5 h-4 bg-black"></div>
                
                {/* Cool briefcase */}
                <div className="absolute -bottom-1 right-4 w-2 h-2 bg-orange-600 border border-orange-700 rounded-sm"></div>
              </div>
            </motion.div>
          </motion.div>

          {/* Subtle floating elements */}
          <AnimatePresence>
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={`dot-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white/40"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${15 + (i % 2) * 70}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.6, 0],
                  y: [0, -15]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* Clean message text */}
        <motion.h2 
          className="text-2xl font-semibold text-white drop-shadow-sm"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {message}
        </motion.h2>
        
        {/* Simplified loading dots */}
        <motion.div 
          className="flex justify-center space-x-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-2.5 h-2.5 bg-white/70 rounded-full"
              animate={{
                y: [0, -8, 0],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Clean progress bar */}
        <motion.div
          className="w-48 h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 192, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-white/60 rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Optional subtitle */}
        <motion.p
          className="text-white/80 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Please wait a moment...
        </motion.p>
      </div>
    </div>
  );
}
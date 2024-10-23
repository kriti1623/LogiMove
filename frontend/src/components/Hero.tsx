
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion'

export const Hero = () =>{
    return <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-black to-[#0A0A0A]">
    {/* Background SVG */}
    <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <radialGradient id="dots" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                    <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                    <stop offset="100%" stopColor="transparent" />
                </radialGradient>
            </defs>
            <g className="dots">
                {[...Array(50)].map((_, i) => (
                    <circle
                        key={i}
                        cx={Math.random() * 100}
                        cy={Math.random() * 100}
                        r="0.5"
                        fill="url(#dots)"
                        className={`animate-float-${i % 3}`}
                    />
                ))}
            </g>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center">
        <motion.h1
            className="text-5xl font-bold mb-4 text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
            Revolutionize Your Logistics
        </motion.h1>
        <motion.p
            className="text-xl mb-8 text-gray-400"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            Connect with reliable drivers and move your goods with unparalleled efficiency.
        </motion.p>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            <Button size="lg" asChild className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/50">
                <Link to="/dashboard">Get Started Now</Link>
            </Button>
        </motion.div>
    </div>
</section>
}
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Truck, Users, DollarSign, BarChart, Shield, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Navbar } from "@/components/Navbar"
import { Hero } from "@/components/Hero"

export const Home = () => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="flex flex-col min-h-screen overflow-hidden bg-black text-white">

            <Navbar/>

            {/* Main */}
            <main className="flex-grow pt-16">
                
                <Hero/>

                {/* How It Works Section */}
                <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">How It Works</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {[
                                { icon: Truck, title: "Book a Ride", description: "Enter your delivery details and get instant quotes from our network of drivers." },
                                { icon: Users, title: "Connect with Drivers", description: "Choose from a list of verified drivers and track your delivery in real-time." },
                                { icon: DollarSign, title: "Transparent Pricing", description: "Enjoy competitive rates with no hidden fees. Pay securely through our platform." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <item.icon className="mx-auto h-16 w-16 text-blue-400 mb-6" />
                                    <h3 className="text-2xl font-semibold mb-4 text-white">{item.title}</h3>
                                    <p className="text-gray-400">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose LogiMove Section */}
                <section className="py-20 bg-gray-900 text-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-16 text-blue-400">Why Choose LogiMove?</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {[
                                { icon: Shield, title: "Secure & Reliable", description: "Our platform ensures the safety of your goods and data." },
                                { icon: Clock, title: "Time-Saving", description: "Streamlined process saves you valuable time in logistics management." },
                                { icon: BarChart, title: "Cost-Effective", description: "Competitive pricing and optimized routes reduce your overall costs." },
                                { icon: Users, title: "Large Network", description: "Access to a vast network of verified drivers across the country." },
                                { icon: Truck, title: "Real-Time Tracking", description: "Monitor your shipments in real-time for peace of mind." },
                                { icon: DollarSign, title: "Flexible Pricing", description: "Choose from various pricing options to suit your budget." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-gray-800 rounded-lg p-6 shadow-lg transition-transform hover:scale-105"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <item.icon className="h-12 w-12 text-blue-400 mb-4" />
                                    <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                                    <p className="text-gray-300">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-black text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold mb-8 text-blue-400">Ready to Transform Your Logistics?</h2>
                        <p className="text-xl text-gray-400 mb-12">Join thousands of satisfied customers who have revolutionized their supply chain with LogiMove.</p>
                        <Button size="lg" asChild className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-500/50">
                            <Link to="/signup">Sign Up Today</Link>
                        </Button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 py-8">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>&copy; 2024 LogiMove. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

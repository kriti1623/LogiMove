import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { Truck } from "lucide-react"

export const Navbar = () => {
    return (
        <header className="fixed w-full z-50 shadow-md transition-all duration-300 backdrop-filter backdrop-blur-lg"
            style={{
                backgroundColor: `rgba(0, 0, 0, ${Math.min(scrollY / 500, 0.8)})`,
                boxShadow: scrollY > 50 ? '0 10px 15px rgba(255, 255, 255, 0.1)' : 'none'
            }}
        >
            <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <Truck className="w-8 h-8 text-blue-400" />
                    <span className="text-2xl font-bold text-blue-400">LogiMove</span>
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Book a Ride</Link>
                    <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">Pricing</Link>
                    <Link to="/signin" className="text-gray-300 hover:text-blue-400 transition-colors">Login</Link>
                    <Button asChild variant="outline" className="bg-blue-500 text-white hover:bg-blue-600 border-blue-500">
                        <Link to="/signup">Sign Up</Link>
                    </Button>
                </div>
            </nav>
        </header>
    )
}

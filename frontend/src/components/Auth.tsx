import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";

interface AuthProps {
  type: "signin" | "signup";
}

export default function Auth({ type }: AuthProps) {
  const isSignIn = type === "signin";
  const {
    userRole,
    setUserRole,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    vehicleType,
    setVehicleType,
    loading,
    error,
    handleSubmit,
  } = useAuth();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(isSignIn);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-12">
      <Card className="w-full max-w-md bg-gray-800 bg-opacity-80 text-white shadow-2xl backdrop-filter backdrop-blur-sm border border-gray-700">
        <form onSubmit={onSubmit}>
          <CardHeader className="space-y-1">
            <Link to="/" className="flex items-center justify-center mb-4 transition-transform hover:scale-105">
              <Truck className="w-8 h-8 text-blue-400 mr-2" />
              <span className="text-2xl font-bold text-blue-400">LogiMove</span>
            </Link>
            <CardTitle className="text-2xl font-bold text-center">
              {isSignIn ? "Welcome Back" : "Join LogiMove"}
            </CardTitle>
            <CardDescription className="text-center text-gray-400">
              {isSignIn
                ? "Enter your credentials to access your account"
                : "Create your account and start moving with ease"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!isSignIn && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name" className="text-gray-300">First Name</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name" className="text-gray-300">Last Name</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-300">I want to sign up as a:</Label>
                  <RadioGroup onValueChange={(value) => setUserRole(value as "user" | "captain")} className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="user" id="user" />
                      <Label htmlFor="user" className="text-gray-300">User</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="driver" id="driver" />
                      <Label htmlFor="driver" className="text-gray-300">Driver</Label>
                    </div>
                  </RadioGroup>
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            {!isSignIn && userRole === "captain" && (
              <div className="space-y-2">
                <Label htmlFor="vehicle-type" className="text-gray-300">Vehicle Type</Label>
                <Input
                  id="vehicle-type"
                  placeholder="e.g. Van , Trolly , Truck"
                  required={userRole === "captain"}
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            {error && <div className="text-red-500">{error}</div>}
            <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-500 transition-colors">
              {loading ? "Loading..." : isSignIn ? "Sign In" : "Sign Up"}
            </Button>
            <Link to={isSignIn ? "/signup" : "/signin"} className="text-blue-400 hover:underline text-center">
              {isSignIn ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

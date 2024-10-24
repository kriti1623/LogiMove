import { useAuth } from '@/hooks/useAuth'; // Import your useAuth hook
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Truck, User, Clock, Calendar, DollarSign, Menu, LogOut } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserDashboard } from '@/hooks/useUserDashboardhook'; // Import the new hook
import { VehicleBooking } from './VehicleBooking';

// Mock data for charts
const bookingsData = [
  { name: 'Mon', bookings: 4 },
  { name: 'Tue', bookings: 3 },
  { name: 'Wed', bookings: 5 },
  { name: 'Thu', bookings: 4 },
  { name: 'Fri', bookings: 6 },
  { name: 'Sat', bookings: 5 },
  { name: 'Sun', bookings: 3 },
];

interface DashboardProps {
  userType: 'user' | 'captain';
}

export default function Dashboard({ userType }: DashboardProps) {
  const { logout } = useAuth(); // Get userEmail and userName from useAuth
  const {
    activeTab,
    sidebarOpen,
    userName,
    email,
    isDialogOpen,
    estimatedBookingResponse,
    bookingDetails,
    setActiveTab,
    setSidebarOpen,
    handleInputChange,
    handleVehicleTypeChange,
    handleGetPriceEstimate,
    handleConfirmBooking,
    setIsDialogOpen,
  } = useUserDashboard();

  const firstChar = userName ? userName.charAt(0).toUpperCase() : '';

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-100 dark:bg-gray-900">
        <Sidebar className={`fixed z-40 w-64 bg-white dark:bg-gray-800 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
          <SidebarHeader className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
            <h2 className="text-2xl font-bold">LogiMove</h2>
            <SidebarTrigger className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <Menu />
            </SidebarTrigger>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto">
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('overview')}>
                      <User className="mr-2" />
                      Overview
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('bookings')}>
                      <Calendar className="mr-2" />
                      {userType === 'user' ? 'My Bookings' : 'Job Assignments'}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('tracking')}>
                      <MapPin className="mr-2" />
                      {userType === 'user' ? 'Track Shipment' : 'Update Status'}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
                <AvatarFallback>{firstChar}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{email}</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start mt-4" onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </Sidebar>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile navbar */}
          <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4 flex items-center justify-between md:hidden">
            <SidebarTrigger onClick={() => setSidebarOpen(true)}>
              <Menu />
            </SidebarTrigger>
            <h1 className="text-xl font-bold">LogiMove</h1>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-y-auto">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
              Welcome, {userName}!
            </h1>

            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'overview' | 'bookings' | 'tracking')}>
              <TabsList className="flex justify-center md:justify-start mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="bookings">{userType === 'user' ? 'My Bookings' : 'Job Assignments'}</TabsTrigger>
                <TabsTrigger value="tracking">{userType === 'user' ? 'Track Shipment' : 'Update Status'}</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {userType === 'user' ? (
                  <>
                    {/* Book a vehicle */}
                    <VehicleBooking
                      bookingDetails={bookingDetails}
                      estimatedBookingResponse={estimatedBookingResponse}
                      isDialogOpen={isDialogOpen}
                      setIsDialogOpen={setIsDialogOpen}
                      handleInputChange={handleInputChange}
                      handleVehicleTypeChange={handleVehicleTypeChange}
                      handleGetPriceEstimate={handleGetPriceEstimate}
                      handleConfirmBooking={handleConfirmBooking}
                    />
                    {/* Recent Bookings */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Bookings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['Booking #1234', 'Booking #5678', 'Booking #9101'].map((booking, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                              <div>
                                <h3 className="font-semibold">{booking}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Status: In Transit</p>
                              </div>
                              <Button variant="outline">View Details</Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                ) : (
                  <>
                    {/* Driver statistics */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Driver Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center space-x-2">
                            <Truck className="h-10 w-10 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Deliveries</p>
                              <h3 className="text-2xl font-bold">152</h3>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-10 w-10 text-green-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">On-Time Deliveries</p>
                              <h3 className="text-2xl font-bold">145</h3>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <DollarSign className="h-10 w-10 text-yellow-500" />
                            <div>
                              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Earnings</p>
                              <h3 className="text-2xl font-bold">$3,500</h3>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Performance Chart */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Performance</CardTitle>
                      </CardHeader>
                      <CardContent className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={bookingsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="bookings" stroke="#8884d8" fillOpacity={0.5} fill="#8884d8" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              <TabsContent value="bookings" className="space-y-4">
                <h2 className="text-xl font-bold">My Bookings</h2>
                {/* Add the bookings content for users here */}
              </TabsContent>

              <TabsContent value="tracking" className="space-y-4">
                <h2 className="text-xl font-bold">Track Shipment</h2>
                {/* Add the tracking content for users here */}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

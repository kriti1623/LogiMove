import { useState } from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/components/ui/sidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Truck, User, Calendar, LogOut, Settings, Activity, BarChart } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Bar, BarChart as RechartsBarChart } from 'recharts'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for charts and tables
const fleetData = [
  { id: 1, type: 'Van', status: 'Active', driver: 'John Doe', lastLocation: 'New York' },
  { id: 2, type: 'Truck', status: 'In Transit', driver: 'Jane Smith', lastLocation: 'Los Angeles' },
  { id: 3, type: 'Trailer', status: 'Maintenance', driver: 'Bob Johnson', lastLocation: 'Chicago' },
  { id: 4, type: 'Van', status: 'Active', driver: 'Alice Brown', lastLocation: 'Houston' },
  { id: 5, type: 'Truck', status: 'Active', driver: 'Charlie Davis', lastLocation: 'Phoenix' },
]

const bookingsData = [
  { name: 'Mon', bookings: 40 },
  { name: 'Tue', bookings: 30 },
  { name: 'Wed', bookings: 50 },
  { name: 'Thu', bookings: 45 },
  { name: 'Fri', bookings: 60 },
  { name: 'Sat', bookings: 55 },
  { name: 'Sun', bookings: 35 },
]

const performanceData = [
  { name: 'John', performance: 85 },
  { name: 'Jane', performance: 92 },
  { name: 'Bob', performance: 78 },
  { name: 'Alice', performance: 95 },
  { name: 'Charlie', performance: 88 },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'fleet' | 'analytics'>('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 w-full">
        {/* Mobile Sidebar Toggle Button */}
        <Button
          variant="ghost"
          className="md:hidden fixed top-2 left-2 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Activity className="h-5 w-5" />
        </Button>

        <Sidebar className={`w-64 bg-white dark:bg-gray-800 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
          <SidebarHeader>
            <h2 className="text-2xl font-bold text-center py-4">LogiMove Admin</h2>
          </SidebarHeader>
          <SidebarContent className="flex-grow">
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('overview')}>
                      <Activity className="mr-2" />
                      Overview
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('fleet')}>
                      <Truck className="mr-2" />
                      Fleet Management
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setActiveTab('analytics')}>
                      <BarChart className="mr-2" />
                      Data Analytics
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/placeholder-avatar.jpg" alt="Admin avatar" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">admin@logimove.com</p>
              </div>
            </div>
            <Button variant="ghost" className="w-full justify-start mt-4" onClick={() => console.log('Logout clicked')}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </Sidebar>

        <main className="flex-1 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'overview' | 'fleet' | 'analytics')}>
            <TabsList className="overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="fleet">Fleet Management</TabsTrigger>
              <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Vehicles
                    </CardTitle>
                    <Truck className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">45</div>
                    <p className="text-xs text-muted-foreground">
                      +2 from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Drivers
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32</div>
                    <p className="text-xs text-muted-foreground">
                      +5 from last week
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Bookings
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">
                      +15% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Last Location</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fleetData.map(vehicle => (
                        <TableRow key={vehicle.id}>
                          <TableCell>{vehicle.id}</TableCell>
                          <TableCell>{vehicle.type}</TableCell>
                          <TableCell>{vehicle.status}</TableCell>
                          <TableCell>{vehicle.driver}</TableCell>
                          <TableCell>{vehicle.lastLocation}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fleet" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fleet Overview</CardTitle>
                  <CardDescription>
                    Manage and track your fleet
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Add your fleet management content here */}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Booking Analytics</CardTitle>
                  <CardDescription>
                    Number of bookings per day
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={bookingsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="bookings" fill="#8884d8" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Driver Performance</CardTitle>
                  <CardDescription>
                    Performance ratings of drivers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="performance" stroke="#82ca9d" fill="#82ca9d" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  )
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "./ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "./ui/select";
import { Mail, Phone, Calendar, Users, Package, DollarSign, RefreshCw, LogOut } from "lucide-react";
import { getAllContacts, getAllBookings, updateContactStatus, updateBookingStatus } from "../utils/api";
import { toast } from "sonner";
import { SetupPackages } from "./SetupPackages";
import { signOut } from "../utils/supabase/client";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  status: string;
}

interface Booking {
  id: string;
  packageId: string;
  packageTitle: string;
  name: string;
  email: string;
  phone: string;
  travelers: number;
  departureDate: string;
  specialRequests?: string;
  status: string;
  createdAt: string;
  totalAmount: number;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contactsData, bookingsData] = await Promise.all([
        getAllContacts(),
        getAllBookings()
      ]);
      
      setContacts(contactsData || []);
      setBookings(bookingsData|| []);
      toast.success("Data loaded successfully");
    } catch (error) {
      console.error("Error loading admin data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleContactStatusChange = async (contactId: string, newStatus: string) => {
    try {
      await updateContactStatus(contactId, newStatus);
      setContacts(contacts.map(c => 
        c.id === contactId ? { ...c, status: newStatus } : c
      ));
      toast.success("Contact status updated");
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleBookingStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(bookings.map(b => 
        b.id === bookingId ? { ...b, status: newStatus } : b
      ));
      toast.success("Booking status updated");
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, string> = {
      new: "bg-blue-100 text-blue-700",
      contacted: "bg-yellow-100 text-yellow-700",
      resolved: "bg-green-100 text-green-700",
      pending: "bg-orange-100 text-orange-700",
      confirmed: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };

    return (
      <Badge className={variants[status] || "bg-gray-100 text-gray-700"}>
        {status}
      </Badge>
    );
  };

  // Calculate stats
  const stats = {
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === 'new').length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    totalRevenue: bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.totalAmount, 0)
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage contact submissions and bookings
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadData} disabled={isLoading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button 
              onClick={async () => {
                try {
                  await signOut();
                  toast.success("Logged out successfully");
                  onLogout();
                } catch (error) {
                  console.error("Logout error:", error);
                  toast.error("Failed to logout");
                }
              }}
              variant="outline"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Setup Packages */}
        <SetupPackages />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Contacts</CardTitle>
              <Mail className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalContacts}</div>
              <p className="text-xs text-muted-foreground">
                {stats.newContacts} new
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Bookings</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.totalBookings}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingBookings} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Confirmed Bookings</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">{stats.confirmedBookings}</div>
              <p className="text-xs text-muted-foreground">
                Active trips
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl">${stats.totalRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                From confirmed bookings
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">
              Contact Submissions ({stats.totalContacts})
            </TabsTrigger>
            <TabsTrigger value="bookings">
              Bookings ({stats.totalBookings})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Contact Submissions</CardTitle>
                <CardDescription>
                  Manage and respond to customer inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No contact submissions yet
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Service</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.map((contact) => (
                        <TableRow key={contact.id}>
                          <TableCell>{contact.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="flex items-center gap-1 mb-1">
                                <Mail className="w-3 h-3" />
                                {contact.email}
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {contact.phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{contact.service}</Badge>
                          </TableCell>
                          <TableCell className="max-w-xs truncate">
                            {contact.message}
                          </TableCell>
                          <TableCell className="text-sm">
                            {new Date(contact.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={contact.status}
                              onValueChange={(value: string) => handleContactStatusChange(contact.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Travel Bookings</CardTitle>
                <CardDescription>
                  Manage customer travel bookings
                </CardDescription>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No bookings yet
                  </p>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Travelers</TableHead>
                        <TableHead>Departure</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Booked On</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell>
                            <div className="text-sm">
                              <div>{booking.name}</div>
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <Mail className="w-3 h-3" />
                                {booking.email}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{booking.packageTitle}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {booking.travelers}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.departureDate).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell>${booking.totalAmount.toLocaleString()}</TableCell>
                          <TableCell className="text-sm">
                            {new Date(booking.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={booking.status}
                              onValueChange={(value: string) => handleBookingStatusChange(booking.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

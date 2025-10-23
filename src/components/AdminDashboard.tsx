import { useState, useEffect } from "react";
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "./ui/table";
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "./ui/select";
import { 
  Mail, Phone, Calendar, Users, Package, DollarSign, RefreshCw, LogOut 
} from "lucide-react";
import { toast } from "sonner";
import { SetupPackages } from "./SetupPackages";
import { getAllContacts, getAllBookings, updateContactStatus, updateBookingStatus } from "../utils/api";
import { signOut } from "../utils/supabase/client";

// ---------- Types ----------
interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  createdAt?: string | null;
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
  createdAt?: string | null;
  totalAmount: number;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

// ---------- Utilities ----------
const formatDate = (date?: string | null) =>
  date ? new Date(date).toLocaleString() : "—";

const StatusSelect = ({
  value,
  options,
  onChange
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) => (
  <Select value={value} onValueChange={onChange}>
    <SelectTrigger className="w-32">
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      {options.map(o => (
        <SelectItem key={o} value={o}>
          {o[0].toUpperCase() + o.slice(1)}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

// ---------- Component ----------
export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all data
  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contactsData, bookingsData] = await Promise.all([
        getAllContacts(),
        getAllBookings()
      ]);

      setContacts(
        (contactsData || []).map(c => ({
          ...c,
          createdAt: c.createdAt || c.created_at || null
        }))
      );

      setBookings(
        (bookingsData || []).map(b => ({
          ...b,
          createdAt: b.createdAt || b.created_at || null
        }))
      );

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

  // Handlers
  const handleContactStatusChange = async (contactId: string, newStatus: string) => {
    try {
      await updateContactStatus(contactId, newStatus);
      setContacts(prev =>
        prev.map(c => (c.id === contactId ? { ...c, status: newStatus } : c))
      );
      toast.success("Contact status updated");
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast.error("Failed to update status");
    }
  };

  const handleBookingStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      await updateBookingStatus(bookingId, newStatus);
      setBookings(prev =>
        prev.map(b => (b.id === bookingId ? { ...b, status: newStatus } : b))
      );
      toast.success("Booking status updated");
    } catch (error) {
      console.error("Error updating booking status:", error);
      toast.error("Failed to update status");
    }
  };

  // Derived Stats
  const stats = {
    totalContacts: contacts.length,
    newContacts: contacts.filter(c => c.status === "new").length,
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === "pending").length,
    confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
    totalRevenue: bookings
      .filter(b => b.status === "confirmed")
      .reduce((sum, b) => sum + (b.totalAmount || 0), 0)
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="w-6 h-6 animate-spin text-gray-500" />
        <span className="ml-2 text-gray-600">Loading admin data...</span>
      </div>
    );
  }

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage contact submissions and bookings
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadData} disabled={isLoading} variant="outline">
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
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
          {[
            {
              title: "Total Contacts",
              icon: <Mail className="h-4 w-4 text-muted-foreground" />,
              value: stats.totalContacts,
              desc: `${stats.newContacts} new`
            },
            {
              title: "Total Bookings",
              icon: <Package className="h-4 w-4 text-muted-foreground" />,
              value: stats.totalBookings,
              desc: `${stats.pendingBookings} pending`
            },
            {
              title: "Confirmed Bookings",
              icon: <Users className="h-4 w-4 text-muted-foreground" />,
              value: stats.confirmedBookings,
              desc: "Active trips"
            },
            {
              title: "Total Revenue",
              icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
              value: `$${stats.totalRevenue.toLocaleString()}`,
              desc: "From confirmed bookings"
            }
          ].map((item, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm">{item.title}</CardTitle>
                {item.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl">{item.value}</div>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="space-y-4">
          <TabsList>
            <TabsTrigger value="contacts">
              Contact Submissions ({stats.totalContacts})
            </TabsTrigger>
            <TabsTrigger value="bookings">
              Bookings ({stats.totalBookings})
            </TabsTrigger>
          </TabsList>

          {/* Contacts */}
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
                      {contacts.map(contact => (
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
                            {formatDate(contact.createdAt)}
                          </TableCell>
                          <TableCell>
                            <StatusSelect
                              value={contact.status}
                              options={["new", "contacted", "resolved"]}
                              onChange={v => handleContactStatusChange(contact.id, v)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings */}
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
                      {bookings.map(booking => (
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
                              {formatDate(booking.departureDate)}
                            </div>
                          </TableCell>
                          <TableCell>${booking.totalAmount ? new Date(booking.totalAmount).toLocaleString() : "—"}</TableCell>
                          <TableCell>{formatDate(booking.createdAt)}</TableCell>
                          <TableCell>
                            <StatusSelect
                              value={booking.status}
                              options={["pending", "confirmed", "cancelled"]}
                              onChange={v => handleBookingStatusChange(booking.id, v)}
                            />
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

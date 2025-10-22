import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store";
import { createClient } from "npm:@supabase/supabase-js";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-330fd21f/health", (c) => {
  return c.json({ status: "ok" });
});

// Contact form submission
app.post("/make-server-330fd21f/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, phone, service, message } = body;

    if (!name || !email || !phone || !service || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    const timestamp = Date.now();
    const contactId = `contact:${timestamp}`;
    
    const contactData = {
      id: contactId,
      name,
      email,
      phone,
      service,
      message,
      createdAt: new Date().toISOString(),
      status: "new"

    };

    await kv.set(contactId, contactData);
    
    console.log(`Contact form submitted: ${contactId}`);
    return c.json({ success: true, message: "Contact form submitted successfully", id: contactId });
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return c.json({ error: "Failed to submit contact form" }, 500);
  }
});

// Get all contact submissions (admin only)
app.get("/make-server-330fd21f/contacts", async (c) => {
  try {
    const contacts = await kv.getByPrefix("contact:");
    
    // Sort by creation date, newest first
    const sortedContacts = (contacts || []).sort((a, b) => {
      const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return c.json({ contacts: sortedContacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return c.json({ error: "Failed to fetch contacts" }, 500);
  }
});

// Update contact status
app.put("/make-server-330fd21f/contact/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    const contact = await kv.get(id);
    
    if (!contact) {
      return c.json({ error: "Contact not found" }, 404);
    }

    const updatedContact = {
      ...contact,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(id, updatedContact);

    return c.json({ success: true, contact: updatedContact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return c.json({ error: "Failed to update contact" }, 500);
  }
});

// Create a travel package
app.post("/make-server-330fd21f/packages", async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, type, price, duration, features, imageUrl } = body;

    if (!title || !description || !type || !price) {
      return c.json({ error: "Required fields missing" }, 400);
    }

    const packageId = `package:${Date.now()}`;
    
    const packageData = {
      id: packageId,
      title,
      description,
      type, // hajj, umrah, study-abroad
      price,
      duration,
      features: features || [],
      imageUrl,
      createdAt: new Date().toISOString(),
      active: true
    };

    await kv.set(packageId, packageData);
    
    console.log(`Package created: ${packageId}`);
    return c.json({ success: true, package: packageData });
  } catch (error) {
    console.error("Error creating package:", error);
    return c.json({ error: "Failed to create package" }, 500);
  }
});

// Get all packages
app.get("/make-server-330fd21f/packages", async (c) => {
  try {
    const type = c.req.query("type");
    let packages = await kv.getByPrefix("package:") || [];
    
    // Filter by type if specified
    if (type) {
      packages = packages.filter(pkg => pkg?.type === type);
    }

    // Filter only active packages
    packages = packages.filter(pkg => pkg?.active === true);

    return c.json({ packages });
  } catch (error) {
    console.error("Error fetching packages:", error);
    return c.json({ error: "Failed to fetch packages" }, 500);
  }
});

// Get a specific package
app.get("/make-server-330fd21f/packages/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const packageData = await kv.get(id);
    
    if (!packageData) {
      return c.json({ error: "Package not found" }, 404);
    }

    return c.json({ package: packageData });
  } catch (error) {
    console.error("Error fetching package:", error);
    return c.json({ error: "Failed to fetch package" }, 500);
  }
});

// Create a booking
app.post("/make-server-330fd21f/bookings", async (c) => {
  try {
    const body = await c.req.json();
    const { packageId, name, email, phone, travelers, departureDate, specialRequests } = body;

    if (!packageId || !name || !email || !phone || !travelers || !departureDate) {
      return c.json({ error: "Required fields missing" }, 400);
    }

    // Verify package exists
    const packageData = await kv.get(packageId);
    if (!packageData) {
      return c.json({ error: "Package not found" }, 404);
    }

    const bookingId = `booking:${Date.now()}`;
    
    const travelersCount = typeof travelers === 'string' ? parseInt(travelers) : travelers;
    
    const bookingData = {
      id: bookingId,
      packageId,
      packageTitle: packageData.title,
      name,
      email,
      phone,
      travelers: travelersCount,
      departureDate,
      specialRequests,
      status: "pending", // pending, confirmed, cancelled
      createdAt: new Date().toISOString(),
      totalAmount: packageData.price * travelersCount
    };

    await kv.set(bookingId, bookingData);
    
    console.log(`Booking created: ${bookingId}`);
    return c.json({ success: true, booking: bookingData });
  } catch (error) {
    console.error("Error creating booking:", error);
    return c.json({ error: "Failed to create booking" }, 500);
  }
});

// Get all bookings
app.get("/make-server-330fd21f/bookings", async (c) => {
  try {
    const email = c.req.query("email");
    let bookings = await kv.getByPrefix("booking:") || [];
    
    // Filter by email if specified (for customer view)
    if (email) {
      bookings = bookings.filter(booking => booking?.email === email);
    }

    // Sort by creation date, newest first
    bookings = bookings.sort((a, b) => {
      const dateA = a?.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b?.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });

    return c.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return c.json({ error: "Failed to fetch bookings" }, 500);
  }
});

// Update booking status
app.put("/make-server-330fd21f/bookings/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    const booking = await kv.get(id);
    
    if (!booking) {
      return c.json({ error: "Booking not found" }, 404);
    }

    const updatedBooking = {
      ...booking,
      status,
      updatedAt: new Date().toISOString()
    };

    await kv.set(id, updatedBooking);

    return c.json({ success: true, booking: updatedBooking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return c.json({ error: "Failed to update booking" }, 500);
  }
});

// User signup
app.post("/make-server-330fd21f/signup", async (c) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const body = await c.req.json();
    const { email, password, name } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Email, password, and name are required" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.error("Signup error:", error);
      return c.json({ error: error.message }, 400);
    }

    console.log(`User signed up: ${email}`);
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.error("Error during signup:", error);
    return c.json({ error: "Failed to create user account" }, 500);
  }
});

Deno.serve(app.fetch);
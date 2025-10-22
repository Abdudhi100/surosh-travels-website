// src/utils/api.ts
import { supabase } from "./supabase/client";

// ---------- TYPES ----------
export interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

export interface BookingData {
  packageId: string
  name: string
  email: string
  phone: string
  travelers: number
  departureDate: string
  specialRequests?: string
}

export interface PackageData {
  title: string
  description: string
  type: string
  price: number
  duration?: string
  features?: string[]
  imageUrl?: string
}

// ---------- CONTACTS ----------
export async function submitContactForm(formData: ContactFormData) {
  const { data, error } = await supabase
    .from("contacts")
    .insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        service: formData.service,
        message: formData.message,
      },
    ])
    .select()

  if (error) {
    console.error("❌ Error saving contact form:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getAllContacts() {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("❌ Error fetching contacts:", error)
    throw new Error(error.message)
  }

  return data
}

// ---------- BOOKINGS ----------
export async function createBooking(formData: BookingData) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([
      {
        package_id: formData.packageId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        travelers: formData.travelers,
        departure_date: formData.departureDate,
        special_requests: formData.specialRequests,
      },
    ])
    .select()

  if (error) {
    console.error("❌ Error creating booking:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getAllBookings(email?: string) {
  let query = supabase.from("bookings").select("*").order("created_at", { ascending: false })

  if (email) query = query.eq("email", email)

  const { data, error } = await query

  if (error) {
    console.error("❌ Error fetching bookings:", error)
    throw new Error(error.message)
  }

  return data
}

// ---------- PACKAGES ----------
export async function createPackage(packageData: PackageData) {
  const { data, error } = await supabase
    .from("packages")
    .insert([
      {
        title: packageData.title,
        description: packageData.description,
        type: packageData.type,
        price: packageData.price,
        duration: packageData.duration,
        features: packageData.features,
        image_url: packageData.imageUrl,
      },
    ])
    .select()

  if (error) {
    console.error("❌ Error creating package:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getAllPackages(type?: string) {
  let query = supabase.from("packages").select("*").order("created_at", { ascending: false })

  if (type) query = query.eq("type", type)

  const { data, error } = await query

  if (error) {
    console.error("❌ Error fetching packages:", error)
    throw new Error(error.message)
  }

  return data
}

export async function getPackage(id: string) {
  const { data, error } = await supabase.from("packages").select("*").eq("id", id).single()

  if (error) {
    console.error("❌ Error fetching package:", error)
    throw new Error(error.message)
  }

  return data
}

// ---------- AUTH ----------
export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
    },
  })

  if (error) {
    console.error("❌ Signup error:", error)
    throw new Error(error.message)
  }

  return data
}
// ---------- UPDATE STATUS FUNCTIONS ----------

// Update contact status (e.g., mark as "resolved" or "pending")
export async function updateContactStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("contacts")
    .update({ status })
    .eq("id", id)
    .select()

  if (error) {
    console.error("❌ Error updating contact status:", error)
    throw new Error(error.message)
  }

  return data
}

// Update booking status (e.g., mark as "confirmed", "cancelled", etc.)
export async function updateBookingStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()

  if (error) {
    console.error("❌ Error updating booking status:", error)
    throw new Error(error.message)
  }

  return data
}

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'bookings.json');

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Read bookings from JSON file
async function readBookings() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist, return empty array
    return [];
  }
}

// Write bookings to JSON file
async function writeBookings(bookings: any[]) {
  await ensureDataDir();
  await fs.writeFile(DATA_FILE, JSON.stringify(bookings, null, 2));
}

export async function GET() {
  try {
    const bookings = await readBookings();
    return NextResponse.json(bookings);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bookings = await readBookings();
    
    const newBooking = {
      id: Date.now().toString(),
      ...body,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    bookings.push(newBooking);
    await writeBookings(bookings);
    
    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    
    const bookings = await readBookings();
    const index = bookings.findIndex((booking: any) => booking.id === id);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    bookings[index] = { ...bookings[index], ...updateData, updatedAt: new Date().toISOString() };
    await writeBookings(bookings);
    
    return NextResponse.json(bookings[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const bookings = await readBookings();
    const filteredBookings = bookings.filter((booking: any) => booking.id !== id);
    
    if (bookings.length === filteredBookings.length) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    await writeBookings(filteredBookings);
    
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
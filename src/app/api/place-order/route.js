import { NextResponse } from 'next/server';
import db from '@/db'; // Ensure your SQLite connection is in `src/db.js`
import { addOrder } from '@/dbFunctions'; // Import your database utility function

export async function POST(req) {
  try {
    // Parse the request body
    const { email, orderDetails, totalTime } = await req.json();

    // Add the order to the queue
    addOrder(email, orderDetails, totalTime);

    // Return a success response
    return NextResponse.json({
      success: true,
      message: 'Order added to the queue!',
    });
  } catch (error) {
    // Handle any errors
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

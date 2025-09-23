import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: 'Deployment test successful!',
    timestamp: new Date().toISOString(),
    version: 'bi-lingual-jammy-v1.0',
    status: 'working'
  });
}

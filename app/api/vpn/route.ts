import { NextResponse } from 'next/server';

// Mock database state for the VPN connection
let isConnected = false;
let currentIp = '192.168.1.1'; // Mock initial IP

export async function GET() {
  return NextResponse.json({ 
    status: isConnected ? 'connected' : 'disconnected',
    ip: isConnected ? '185.15.22.10' : currentIp,
    location: isConnected ? 'Нидерланды, Амстердам' : 'Россия, Москва',
    ping: isConnected ? '42ms' : '-',
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'connect') {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      isConnected = true;
      return NextResponse.json({ success: true, status: 'connected' });
    } else if (action === 'disconnect') {
      await new Promise(resolve => setTimeout(resolve, 800));
      isConnected = false;
      return NextResponse.json({ success: true, status: 'disconnected' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

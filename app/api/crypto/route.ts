import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const OXAPAY_API_KEY = process.env.OXAPAY_API_KEY;

  console.log('Crypto API called, API key exists:', !!OXAPAY_API_KEY);

  if (!OXAPAY_API_KEY) {
    console.error('OXAPAY_API_KEY not set');
    return NextResponse.json({ 
      error: 'OxaPay API key not configured. Add OXAPAY_API_KEY to environment variables.' 
    }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { months, userId } = body;

    console.log('Creating invoice for months:', months, 'userId:', userId);

    // Calculate price: $2 per month
    const pricePerMonth = 2;
    const amount = pricePerMonth * months;

    const requestBody = {
      amount: amount,
      currency: 'USD',
      lifetime: 60,
      fee_paid_by_payer: 1,
      order_id: `cupvpn_${months}_${userId}_${Date.now()}`,
      description: `CupVPN subscription for ${months} month(s)`,
    };

    console.log('OxaPay request body:', requestBody);

    const response = await fetch('https://api.oxapay.com/v1/payment/invoice', {
      method: 'POST',
      headers: {
        'merchant_api_key': OXAPAY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();
    console.log('OxaPay response:', JSON.stringify(data, null, 2));

    if (data.status !== 200 || !data.data) {
      console.error('OxaPay error:', data);
      return NextResponse.json({ 
        error: data.message || data.error?.message || 'Failed to create invoice',
        details: data
      }, { status: 500 });
    }

    return NextResponse.json({ 
      pay_link: data.data.pay_link,
      track_id: data.data.track_id 
    });
  } catch (error) {
    console.error('OxaPay invoice error:', error);
    return NextResponse.json({ 
      error: 'Failed to create invoice',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

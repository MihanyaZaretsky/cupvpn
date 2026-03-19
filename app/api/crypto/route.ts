import { NextRequest, NextResponse } from 'next/server';

const OXAPAY_API_KEY = process.env.OXAPAY_API_KEY;

interface OxaPayResponse {
  status: number;
  message: string;
  data?: {
    track_id: string;
    pay_link: string;
    invoice_url: string;
  };
  error?: {
    code: number;
    message: string;
  };
}

export async function POST(request: NextRequest) {
  if (!OXAPAY_API_KEY) {
    return NextResponse.json({ error: 'OxaPay API key not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { months, userId } = body;

    // Calculate price: 50 Stars = ~$1, so 1 month = $2
    const pricePerMonth = 2; // USD
    const amount = pricePerMonth * months;

    const response = await fetch('https://api.oxapay.com/v1/payment/invoice', {
      method: 'POST',
      headers: {
        'merchant_api_key': OXAPAY_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
        currency: 'USD',
        lifetime: 60, // 60 minutes
        fee_paid_by_payer: 1,
        callback_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}/api/crypto/callback`,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://your-domain.com'}?payment=success`,
        order_id: `cupvpn_${months}_${userId}_${Date.now()}`,
        description: `CupVPN subscription for ${months} month(s)`,
      }),
    });

    const data: OxaPayResponse = await response.json();

    if (data.status !== 200 || !data.data) {
      console.error('OxaPay error:', data);
      return NextResponse.json({ 
        error: data.error?.message || 'Failed to create invoice' 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      pay_link: data.data.pay_link,
      track_id: data.data.track_id 
    });
  } catch (error) {
    console.error('OxaPay invoice error:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}

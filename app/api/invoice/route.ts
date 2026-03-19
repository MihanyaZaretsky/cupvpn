import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.BOT_TOKEN;

interface InvoiceLinkResponse {
  ok: boolean;
  result?: string;
  description?: string;
}

export async function POST(request: NextRequest) {
  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { months, userId } = body;

    // Calculate stars based on months
    const baseStars = 50; // 50 stars for 1 month
    const totalStars = baseStars * months;

    const title = `CupVPN - ${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`;
    const description = `Подписка CupVPN на ${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'}`;
    const payload = `cupvpn_${months}_${userId}_${Date.now()}`;

    // Create invoice link via Bot API
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
        payload,
        currency: 'XTR',
        prices: [{ label: title, amount: totalStars }],
      }),
    });

    const data: InvoiceLinkResponse = await response.json();

    if (!data.ok || !data.result) {
      console.error('Invoice link error:', data);
      return NextResponse.json({ error: data.description || 'Failed to create invoice' }, { status: 500 });
    }

    return NextResponse.json({ invoiceLink: data.result });
  } catch (error) {
    console.error('Invoice creation error:', error);
    return NextResponse.json({ error: 'Failed to create invoice' }, { status: 500 });
  }
}

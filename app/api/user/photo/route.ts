import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.BOT_TOKEN;

interface TelegramResponse {
  ok: boolean;
  result?: {
    total_count: number;
    photos: Array<{
      file_id: string;
      file_unique_id: string;
      file_size: number;
      width: number;
      height: number;
    }[]>;
  };
  description?: string;
}

interface FileResponse {
  ok: boolean;
  result?: {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    file_path: string;
  };
  description?: string;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('user_id');

  if (!userId) {
    return NextResponse.json({ error: 'user_id is required' }, { status: 400 });
  }

  if (!BOT_TOKEN) {
    return NextResponse.json({ error: 'Bot token not configured' }, { status: 500 });
  }

  try {
    // Get user profile photos
    const photosUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getUserProfilePhotos?user_id=${userId}&limit=1`;
    const photosResponse = await fetch(photosUrl);
    const photosData: TelegramResponse = await photosResponse.json();

    if (!photosData.ok || !photosData.result?.photos?.length) {
      return NextResponse.json({ photo_url: null });
    }

    // Get the largest photo (last in array)
    const photo = photosData.result.photos[0];
    const fileId = photo[photo.length - 1].file_id;

    // Get file path
    const fileUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`;
    const fileResponse = await fetch(fileUrl);
    const fileData: FileResponse = await fileResponse.json();

    if (!fileData.ok || !fileData.result?.file_path) {
      return NextResponse.json({ photo_url: null });
    }

    // Construct photo URL
    const photoUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${fileData.result.file_path}`;

    return NextResponse.json({ photo_url: photoUrl });
  } catch (error) {
    console.error('Error fetching user photo:', error);
    return NextResponse.json({ error: 'Failed to fetch photo' }, { status: 500 });
  }
}

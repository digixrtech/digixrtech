import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-revalidation-secret');

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug = body?.record?.slug;

    // Revalidate the listing page
    revalidatePath('/insights');
    // Revalidate the sitemap
    revalidatePath('/sitemap.xml');

    // Revalidate specific article page if slug is provided
    if (slug) {
      revalidatePath(`/insights/${slug}`);
    }

    return NextResponse.json({ revalidated: true, slug: slug || null });
  } catch {
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}

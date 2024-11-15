import { mapsClient } from '@/app/libs/google-maps-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const input = searchParams.get('input');

  if (!input) {
    throw new Error('input is required');
  }

  const key = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  if (!key) {
    throw new Error('Google Maps API key is not set');
  }

  try {
    const resp = await mapsClient.placeAutocomplete({
      params: {
        input,
        key,
        components: ['country:gb'],
      },
    });

    if (resp.status !== 200) {
      return Response.json(resp.data, { status: resp.status });
    }

    return Response.json(resp.data);
  } catch (err) {
    console.error('error', err);
    return Response.json({ error: err }, { status: 500 });
  }
}

import { TypeProperty } from '@/app/generated-types';
import { contentfulClient } from '@/app/libs/contenful-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    throw new Error('id is required');
  }

  try {
    const property = await contentfulClient.getEntry<TypeProperty>(id);
    return Response.json({
      id: property.sys.id,
      createdAt: property.sys.createdAt,
      updatedAt: property.sys.updatedAt,
      ...property.fields,
    });
  } catch (err) {
    console.error('error', err);
    return Response.json({ error: err }, { status: 500 });
  }
}

import { TypeProperty } from '@/app/generated-types'
import { client } from '../client'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const location = searchParams.get('location')
  const transactionType = searchParams.get('transactionType')
  const minPrice = searchParams.get('minPrice')
  const maxPrice = searchParams.get('maxPrice')
  const minBeds = searchParams.get('minBeds')
  const availibility = searchParams.get('availibility')

  const query = {} as Record<string, any>

  if (location) {
    // TODO: turn location into longitude and latitude
  }

  if (transactionType) {
    query['fields.transactionType'] = transactionType
  }

  if (minPrice) {
    query['fields.price[gte]'] = minPrice
  }

  if (maxPrice) {
    query['fields.price[lte]'] = maxPrice
  }

  if (minBeds) {
    query['fields.numberOfBedrooms[gte]'] = minBeds
  }

  if (availibility) {
    query['fields.status'] = availibility
  }

  try {
    const properties = await client.getEntries<TypeProperty>({
      content_type: 'property',
      select: [
        'sys.id',
        'fields.name',
        'fields.description',
        'fields.numberOfBedrooms',
        'fields.numberOfBathrooms',
        'fields.numberOfReceptions',
        'fields.transactionType',
        'fields.propertyType',
        'fields.status',
        'fields.price',
        'fields.location',
        'fields.gallery',
      ],
      ...query,
    })

    return Response.json(
      properties.items.map((item) => ({ id: item.sys.id, ...item.fields }))
    )
  } catch (err) {
    console.error('error', err)
    return Response.json({ error: err }, { status: 500 })
  }
}

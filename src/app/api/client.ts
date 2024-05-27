import * as contentful from 'contentful'

const spaceId = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

if (!spaceId || !accessToken) {
  throw new Error('Contentful environment variables are not set')
}

export const client = contentful.createClient({
  space: spaceId,
  accessToken: accessToken,
})

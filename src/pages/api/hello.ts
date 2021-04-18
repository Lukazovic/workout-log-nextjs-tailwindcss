// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'

export default function helloAPI(
  request: NextApiRequest,
  response: NextApiResponse
) {
  response.status(200).json({ name: 'John Doe' })
}

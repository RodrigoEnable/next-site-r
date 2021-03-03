import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../../utils/database'

interface successType {
  _id: string,
  title: string;
  description: string;
}

interface errorType {
  error: string,
}

export default async function adminAPI (req: NextApiRequest, res: NextApiResponse<successType | errorType>) {
  if (req.method === 'POST') {
    const { title, description } = req.body
    if (!title || !description) {
      res.status(400).json({ error: 'Empty fields' })
      return;
    }
    const { db } = await connect()
    const response = await db.collection('roadmap-posts').insertOne({
      title,
      description
    })
    res.status(200).json(response.ops[0])
  } else {
    res.status(400).json({ error: 'Bad request' })
  }
}

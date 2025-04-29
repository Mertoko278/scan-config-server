import fs from 'fs'
import path from 'path'

const configPath = path.resolve('./config.json')

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = fs.readFileSync(configPath, 'utf8')
      res.status(200).json(JSON.parse(data))
    } else if (req.method === 'POST') {
      const incoming = req.body

      fs.writeFileSync(configPath, JSON.stringify(incoming, null, 2))
      res.status(200).json({ status: 'saved' })
    } else {
      res.status(405).end() // Method not allowed
    }
  } catch (err) {
    console.error('Error in config handler:', err)
    res.status(500).send('A server error has occurred')
  }
}

import fs from 'fs'
import path from 'path'

const configPath = path.resolve('./config.json')

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
      res.status(200).json(config)
    } else if (req.method === 'POST') {
      const { scan1, scan2, evidencePicture } = req.body

      const isValid = (scan) =>
        scan && typeof scan.scanOptions === 'string' && typeof scan.title === 'string'

      if (!isValid(scan1) || !isValid(scan2) || (evidencePicture && !isValid(evidencePicture))) {
        return res.status(400).json({ error: 'Invalid config format' })
      }

      const newConfig = { scan1, scan2, evidencePicture }
      fs.writeFileSync(configPath, JSON.stringify(newConfig, null, 2))
      res.status(200).json({ status: 'saved' })
    } else {
      res.status(405).end()
    }
  } catch (err) {
    console.error('Server error:', err)
    res.status(500).send('A server error has occurred')
  }
}

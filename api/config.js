import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const configPath = path.join(__dirname, '../config.json')

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const config = JSON.parse(readFileSync(configPath, 'utf-8'))
    return res.status(200).json(config)
  }

  if (req.method === 'POST') {
    const newConfig = req.body
    writeFileSync(configPath, JSON.stringify(newConfig, null, 2))
    return res.status(200).json({ message: 'Config updated successfully' })
  }

  res.status(405).json({ message: 'Method not allowed' })
}

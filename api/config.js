import { readFileSync, writeFileSync } from 'fs'
import path from 'path'

const configPath = path.join(process.cwd(), 'config.json')

export default function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const config = JSON.parse(readFileSync(configPath, 'utf-8'))
      return res.status(200).json(config)
    } catch (error) {
      return res.status(500).json({ message: 'Failed to read config', error: error.message })
    }
  }

  if (req.method === 'POST') {
    const newConfig = req.body
    try {
      writeFileSync(configPath, JSON.stringify(newConfig, null, 2))
      return res.status(200).json({ message: 'Config updated successfully' })
    } catch (error) {
      return res.status(500).json({ message: 'Failed to update config', error: error.message })
    }
  }

  res.status(405).json({ message: 'Method not allowed' })
}

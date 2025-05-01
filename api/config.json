// pages/api/config.js

export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const REPO_OWNER = 'Mertoko278';
  const REPO_NAME = 'scan-config-server';
  const FILE_PATH = 'config.json';
  const BRANCH = 'main';

  const headers = {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json'
  };

  if (req.method === 'GET') {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to fetch config', error: await response.text() });
    }

    const data = await response.json();
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return res.status(200).json(JSON.parse(content));
  }

  if (req.method === 'POST') {
    const newConfig = req.body;

    // Get current file SHA
    const current = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      headers
    });

    const currentData = await current.json();
    const sha = currentData.sha;

    // Update file
    const update = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        message: 'Update config.json via API',
        content: Buffer.from(JSON.stringify(newConfig, null, 2)).toString('base64'),
        sha,
        branch: BRANCH
      })
    });

    if (!update.ok) {
      return res.status(500).json({ message: 'Failed to update config', error: await update.text() });
    }

    return res.status(200).json({ message: 'Config updated successfully' });
  }

  res.status(405).json({ message: 'Method not allowed' });
}

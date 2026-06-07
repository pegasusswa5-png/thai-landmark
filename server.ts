import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is not defined');
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // AI Itinerary planning endpoint utilizing gemini-3.5-flash
  app.post('/api/generate-plan', async (req, res) => {
    try {
      const { prompt, language } = req.body;
      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const client = getAiClient();
      const currentLanguage = language === 'en' ? 'English' : 'Thai';

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `Create a sustainable 2-day micro-community itinerary or response for this request: "${prompt}". 
        Make it emphasize authentic lesser-known places, local organic diners, and community homestays in Thailand.
        Write the response in ${currentLanguage}.
        Format in short, beautiful Markdown with bullets. Keep it friendly and concise.`,
      });

      res.json({ plan: response.text });
    } catch (error: any) {
      console.error('Gemini API Error:', error.message || error);
      res.status(500).json({ 
        error: 'Could not contact Gemini AI service',
        details: error.message || String(error)
      });
    }
  });

  // Enable Vite middleware in dev mode
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server launched and listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Fatal Server Boot Error:', err);
});

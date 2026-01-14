/**
 * Simple Express API server for Vehicle Rating Editor
 * Handles saving rating changes to JSON files
 */

import express from 'express';
import cors from 'cors';
import { updateRatings } from '../scripts/updateRatings.js';

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Save ratings endpoint
app.post('/api/ratings', (req, res) => {
  try {
    const { changes } = req.body;

    if (!changes || !Array.isArray(changes)) {
      return res.status(400).json({
        error: 'Invalid request body. Expected { changes: [...] }',
      });
    }

    console.log(`Saving ${changes.length} rating changes...`);
    
    const results = updateRatings(changes);
    
    console.log(`Success: ${results.success.length}, Errors: ${results.errors.length}`);
    
    if (results.errors.length > 0) {
      return res.status(500).json({
        message: 'Some changes failed to save',
        ...results,
      });
    }

    res.json({
      message: 'All changes saved successfully',
      ...results,
    });
  } catch (error) {
    console.error('Error saving ratings:', error);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Vehicle Rating API server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

export default app;


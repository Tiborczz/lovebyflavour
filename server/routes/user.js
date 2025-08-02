import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database/init.js';

const router = express.Router();

// Update user traits
router.post('/:userId/traits', async (req, res) => {
  try {
    const { userId } = req.params;
    const { traits } = req.body;

    if (!traits) {
      return res.status(400).json({ error: 'Traits data is required' });
    }

    const db = getDatabase();
    // Delete existing traits
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM user_traits WHERE user_id = ?', [userId], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // Insert new traits
    const insertPromises = [];
    
    Object.entries(traits).forEach(([category, categoryTraits]) => {
      Object.entries(categoryTraits).forEach(([key, value]) => {
        insertPromises.push(
          new Promise((resolve, reject) => {
            db.run(
              'INSERT INTO user_traits (id, user_id, category, trait_key, trait_value, confidence_score) VALUES (?, ?, ?, ?, ?, ?)',
              [uuidv4(), userId, category, key, JSON.stringify(value), 1.0],
              (err) => {
                if (err) reject(err);
                else resolve();
              }
            );
          })
        );
      });
    });

    await Promise.all(insertPromises);

    res.json({ success: true, message: 'Traits updated successfully' });
  } catch (error) {
    console.error('Error updating traits:', error);
    res.status(500).json({ error: 'Failed to update traits' });
  }
});

// Get user traits
router.get('/:userId/traits', async (req, res) => {
  try {
    const { userId } = req.params;

    const db = getDatabase();
    db.all(
      'SELECT category, trait_key, trait_value, confidence_score FROM user_traits WHERE user_id = ?',
      [userId],
      (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch traits' });
        }

        const traits = {};
        rows.forEach(row => {
          if (!traits[row.category]) {
            traits[row.category] = {};
          }
          traits[row.category][row.trait_key] = {
            value: JSON.parse(row.trait_value),
            confidence: row.confidence_score
          };
        });

        res.json({ traits });
      }
    );
  } catch (error) {
    console.error('Error fetching traits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's compatibility analyses
router.get('/:userId/analyses', async (req, res) => {
  try {
    const { userId } = req.params;

    const db = getDatabase();
    db.all(
      'SELECT * FROM compatibility_analyses WHERE user_id = ? ORDER BY created_at DESC',
      [userId],
      (err, rows) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Failed to fetch analyses' });
        }

        const analyses = rows.map(row => ({
          ...row,
          analysis_data: JSON.parse(row.analysis_data)
        }));

        res.json({ analyses });
      }
    );
  } catch (error) {
    console.error('Error fetching analyses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router; 
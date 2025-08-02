import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase } from '../database/init.js';

const router = express.Router();

// Simple user registration/login for demo purposes
router.post('/register', async (req, res) => {
  try {
    const { email, name, age, gender } = req.body;
    
    if (!email || !name) {
      return res.status(400).json({ error: 'Email and name are required' });
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash('demo123', 10); // Demo password

    const db = getDatabase();
    db.run(
      'INSERT INTO users (id, email, name, age, gender, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, email, name, age, gender, hashedPassword],
      function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already exists' });
          }
          console.error('Registration error:', err);
          return res.status(500).json({ error: 'Failed to register user' });
        }

        const token = jwt.sign({ userId, email }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '7d' });
        
        res.json({
          success: true,
          user: { id: userId, email, name, age, gender },
          token
        });
      }
    );
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple login
router.post('/login', async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const db = getDatabase();
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (err, user) => {
        if (err) {
          console.error('Login error:', err);
          return res.status(500).json({ error: 'Login failed' });
        }

        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'demo-secret', { expiresIn: '7d' });
        
        res.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            age: user.age,
            gender: user.gender
          },
          token
        });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user
router.get('/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'demo-secret');
    
    db.get(
      'SELECT id, email, name, age, gender FROM users WHERE id = ?',
      [decoded.userId],
      (err, user) => {
        if (err || !user) {
          return res.status(404).json({ error: 'User not found' });
        }
        
        res.json({ user });
      }
    );
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router; 
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '../data/compatibility.db');

let db;

export const initializeDatabase = async () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }
      console.log('📊 Connected to SQLite database');
    });

    // Create tables
    const createTables = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        password_hash TEXT,
        name TEXT,
        age INTEGER,
        gender TEXT,
        location TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- User traits table (comprehensive lifestyle data)
      CREATE TABLE IF NOT EXISTS user_traits (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        category TEXT, -- 'physical', 'lifestyle', 'personality', 'preferences'
        trait_key TEXT,
        trait_value TEXT,
        confidence_score REAL DEFAULT 1.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Ex-partners table
      CREATE TABLE IF NOT EXISTS ex_partners (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        nickname TEXT,
        relationship_duration_months INTEGER,
        relationship_end_reason TEXT,
        relationship_satisfaction REAL, -- 1-10 scale
        inferred_flavour TEXT,
        flavour_confidence REAL DEFAULT 0.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Ex-partner traits (from quiz responses)
      CREATE TABLE IF NOT EXISTS ex_partner_traits (
        id TEXT PRIMARY KEY,
        ex_partner_id TEXT,
        category TEXT, -- 'big_five', 'attachment', 'behavior', 'physical', 'lifestyle'
        trait_key TEXT,
        trait_value TEXT,
        raw_score REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ex_partner_id) REFERENCES ex_partners(id) ON DELETE CASCADE
      );

      -- Compatibility analysis results
      CREATE TABLE IF NOT EXISTS compatibility_analyses (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        analysis_type TEXT, -- 'pattern_analysis', 'flavour_match', 'red_flags'
        analysis_data TEXT, -- JSON blob
        insights TEXT, -- AI-generated insights
        confidence_score REAL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Flavour definitions and characteristics
      CREATE TABLE IF NOT EXISTS flavours (
        id TEXT PRIMARY KEY,
        name TEXT UNIQUE,
        emoji TEXT,
        description TEXT,
        personality_traits TEXT, -- JSON blob
        compatibility_matrix TEXT, -- JSON blob of compatibility scores
        psychological_profile TEXT, -- JSON blob
        red_flags TEXT, -- JSON blob
        green_flags TEXT, -- JSON blob
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- AI analysis cache
      CREATE TABLE IF NOT EXISTS ai_cache (
        id TEXT PRIMARY KEY,
        cache_key TEXT UNIQUE,
        analysis_type TEXT,
        input_hash TEXT,
        result TEXT, -- JSON blob
        expires_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_user_traits_user_id ON user_traits(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_traits_category ON user_traits(category);
      CREATE INDEX IF NOT EXISTS idx_ex_partners_user_id ON ex_partners(user_id);
      CREATE INDEX IF NOT EXISTS idx_ex_partner_traits_ex_id ON ex_partner_traits(ex_partner_id);
      CREATE INDEX IF NOT EXISTS idx_compatibility_user_id ON compatibility_analyses(user_id);
      CREATE INDEX IF NOT EXISTS idx_ai_cache_key ON ai_cache(cache_key);
    `;

    db.exec(createTables, (err) => {
      if (err) {
        console.error('Error creating tables:', err);
        reject(err);
        return;
      }
      console.log('✅ Database tables created successfully');
      
      // Insert default flavours
      insertDefaultFlavours()
        .then(() => {
          console.log('🍓 Default flavours inserted');
          resolve();
        })
        .catch(reject);
    });
  });
};

const insertDefaultFlavours = async () => {
  const defaultFlavours = [
    {
      id: 'vanilla',
      name: 'Vanilla',
      emoji: '🍦',
      description: 'The steady, reliable lover who values consistency and deep emotional connection',
      personality_traits: JSON.stringify({
        big_five: { openness: 0.4, conscientiousness: 0.8, extraversion: 0.5, agreeableness: 0.8, neuroticism: 0.3 },
        attachment_style: 'secure',
        love_languages: ['quality_time', 'acts_of_service'],
        core_traits: ['reliable', 'loyal', 'traditional', 'stable', 'nurturing']
      }),
      compatibility_matrix: JSON.stringify({
        vanilla: 0.9, strawberry: 0.7, chocolate: 0.8, mango: 0.6, 
        pineapple: 0.5, mint: 0.7, coconut: 0.8, blueberry: 0.6
      }),
      psychological_profile: JSON.stringify({
        strengths: ['emotional stability', 'commitment', 'reliability'],
        challenges: ['resistance to change', 'routine-focused'],
        ideal_partner_traits: ['stability', 'loyalty', 'family-oriented']
      }),
      red_flags: JSON.stringify(['excessive neediness', 'unpredictability', 'commitment phobia']),
      green_flags: JSON.stringify(['consistency', 'emotional availability', 'future planning'])
    },
    {
      id: 'strawberry',
      name: 'Strawberry',
      emoji: '🍓',
      description: 'The passionate romantic who loves intensely and wears their heart on their sleeve',
      personality_traits: JSON.stringify({
        big_five: { openness: 0.7, conscientiousness: 0.5, extraversion: 0.8, agreeableness: 0.7, neuroticism: 0.6 },
        attachment_style: 'anxious',
        love_languages: ['words_of_affirmation', 'physical_touch'],
        core_traits: ['passionate', 'romantic', 'expressive', 'emotional', 'idealistic']
      }),
      compatibility_matrix: JSON.stringify({
        vanilla: 0.7, strawberry: 0.6, chocolate: 0.9, mango: 0.8, 
        pineapple: 0.7, mint: 0.5, coconut: 0.6, blueberry: 0.8
      }),
      psychological_profile: JSON.stringify({
        strengths: ['emotional depth', 'romantic gestures', 'passion'],
        challenges: ['emotional volatility', 'idealization', 'jealousy'],
        ideal_partner_traits: ['emotional intelligence', 'reassurance', 'romance']
      }),
      red_flags: JSON.stringify(['emotional unavailability', 'dismissiveness', 'fear of intimacy']),
      green_flags: JSON.stringify(['emotional expressiveness', 'romantic gestures', 'deep conversations'])
    },
    {
      id: 'chocolate',
      name: 'Chocolate',
      emoji: '🍫',
      description: 'The complex, sophisticated lover with layers of depth and mystery',
      personality_traits: JSON.stringify({
        big_five: { openness: 0.9, conscientiousness: 0.6, extraversion: 0.4, agreeableness: 0.6, neuroticism: 0.5 },
        attachment_style: 'fearful_avoidant',
        love_languages: ['quality_time', 'gifts'],
        core_traits: ['mysterious', 'intellectual', 'complex', 'artistic', 'introspective']
      }),
      compatibility_matrix: JSON.stringify({
        vanilla: 0.8, strawberry: 0.9, chocolate: 0.7, mango: 0.6, 
        pineapple: 0.8, mint: 0.9, coconut: 0.5, blueberry: 0.9
      }),
      psychological_profile: JSON.stringify({
        strengths: ['depth', 'creativity', 'intelligence'],
        challenges: ['emotional walls', 'overthinking', 'mood swings'],
        ideal_partner_traits: ['patience', 'intellectual stimulation', 'emotional support']
      }),
      red_flags: JSON.stringify(['superficiality', 'lack of depth', 'emotional immaturity']),
      green_flags: JSON.stringify(['intellectual curiosity', 'artistic appreciation', 'emotional depth'])
    },
    {
      id: 'mango',
      name: 'Mango',
      emoji: '🥭',
      description: 'The adventurous free spirit who brings excitement and spontaneity to love',
      personality_traits: JSON.stringify({
        big_five: { openness: 0.9, conscientiousness: 0.4, extraversion: 0.9, agreeableness: 0.7, neuroticism: 0.4 },
        attachment_style: 'dismissive_avoidant',
        love_languages: ['physical_touch', 'quality_time'],
        core_traits: ['adventurous', 'spontaneous', 'optimistic', 'energetic', 'free-spirited']
      }),
      compatibility_matrix: JSON.stringify({
        vanilla: 0.6, strawberry: 0.8, chocolate: 0.6, mango: 0.8, 
        pineapple: 0.9, mint: 0.7, coconut: 0.8, blueberry: 0.5
      }),
      psychological_profile: JSON.stringify({
        strengths: ['spontaneity', 'positivity', 'adventure'],
        challenges: ['commitment issues', 'restlessness', 'inconsistency'],
        ideal_partner_traits: ['flexibility', 'adventure', 'independence']
      }),
      red_flags: JSON.stringify(['controlling behavior', 'routine obsession', 'jealousy']),
      green_flags: JSON.stringify(['spontaneity', 'adventure seeking', 'positive outlook'])
    }
  ];

  return new Promise((resolve, reject) => {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO flavours 
      (id, name, emoji, description, personality_traits, compatibility_matrix, psychological_profile, red_flags, green_flags)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    let completed = 0;
    defaultFlavours.forEach(flavour => {
      stmt.run([
        flavour.id, flavour.name, flavour.emoji, flavour.description,
        flavour.personality_traits, flavour.compatibility_matrix,
        flavour.psychological_profile, flavour.red_flags, flavour.green_flags
      ], (err) => {
        if (err) {
          console.error('Error inserting flavour:', err);
          reject(err);
          return;
        }
        completed++;
        if (completed === defaultFlavours.length) {
          stmt.finalize();
          resolve();
        }
      });
    });
  });
};

export const getDatabase = () => {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
};

export const closeDatabase = () => {
  return new Promise((resolve) => {
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
        } else {
          console.log('Database connection closed');
        }
        resolve();
      });
    } else {
      resolve();
    }
  });
}; 
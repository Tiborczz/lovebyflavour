import { watch } from 'fs';
import { exec } from 'child_process';
import path from 'path';

console.log('🔍 Starting file watcher for auto-git-push...');
console.log('📁 Watching directory:', process.cwd());
console.log('⚠️  Press Ctrl+C to stop\n');

let timeout;
const DELAY = 5000; // Wait 5 seconds after last change before pushing

const ignoredPaths = [
  '.git',
  'node_modules',
  'dist',
  '.vercel',
  '.env',
  '.env.local',
  'auto-push.bat',
  'auto-push.ps1',
  'auto-watcher.js'
];

function shouldIgnore(filePath) {
  return ignoredPaths.some(ignored => filePath.includes(ignored));
}

function pushToGit() {
  console.log('🔄 Pushing changes to git...');
  
  const timestamp = new Date().toLocaleString();
  const commitMessage = `Auto-update: ${timestamp}`;
  
  exec('git add .', (error) => {
    if (error) {
      console.error('❌ Error adding files:', error.message);
      return;
    }
    
    exec(`git commit -m "${commitMessage}"`, (error, stdout) => {
      if (error) {
        if (error.message.includes('nothing to commit')) {
          console.log('ℹ️  No changes to commit');
          return;
        }
        console.error('❌ Error committing:', error.message);
        return;
      }
      
      console.log('📝 Committed:', stdout.trim());
      
      exec('git push origin main', (error, stdout) => {
        if (error) {
          console.error('❌ Error pushing:', error.message);
          return;
        }
        console.log('✅ Successfully pushed to git!');
        console.log('🔍 Continuing to watch for changes...\n');
      });
    });
  });
}

// Watch for file changes
watch('.', { recursive: true }, (eventType, filename) => {
  if (!filename || shouldIgnore(filename)) {
    return;
  }
  
  console.log(`📝 File changed: ${filename}`);
  
  // Clear existing timeout and set a new one
  clearTimeout(timeout);
  timeout = setTimeout(pushToGit, DELAY);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping file watcher...');
  process.exit(0);
});
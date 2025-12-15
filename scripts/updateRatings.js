#!/usr/bin/env node

/**
 * Update vehicle ratings in JSON data files
 * Usage: node scripts/updateRatings.js <changes-json>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Category to file mapping
const CATEGORY_FILES = {
  sedans: 'src/data/vehicles/sedans.json',
  suvs: 'src/data/vehicles/suvs.json',
  trucks: 'src/data/vehicles/trucks.json',
  coupes: 'src/data/vehicles/coupes.json',
  convertibles: 'src/data/vehicles/convertibles.json',
  wagons: 'src/data/vehicles/wagons.json',
  hatchbacks: 'src/data/vehicles/hatchbacks.json',
};

export function updateRatings(changes) {
  const results = {
    success: [],
    errors: [],
  };

  // Group changes by category
  const changesByCategory = {};
  changes.forEach(change => {
    if (!changesByCategory[change.category]) {
      changesByCategory[change.category] = [];
    }
    changesByCategory[change.category].push(change);
  });

  // Process each category
  Object.entries(changesByCategory).forEach(([category, categoryChanges]) => {
    const filePath = path.join(process.cwd(), CATEGORY_FILES[category]);
    
    try {
      // Read the JSON file
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const vehicles = JSON.parse(fileContent);

      // Update ratings
      categoryChanges.forEach(change => {
        const vehicle = vehicles.find(v => v.id === change.id);
        if (vehicle) {
          vehicle.staffRating = change.newRating;
          results.success.push({
            id: change.id,
            category,
            oldRating: change.originalRating,
            newRating: change.newRating,
          });
        } else {
          results.errors.push({
            id: change.id,
            category,
            error: 'Vehicle not found',
          });
        }
      });

      // Write back to file with pretty formatting
      fs.writeFileSync(filePath, JSON.stringify(vehicles, null, 2), 'utf-8');
      
    } catch (error) {
      results.errors.push({
        category,
        error: error.message,
      });
    }
  });

  return results;
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const changesJson = process.argv[2];
  
  if (!changesJson) {
    console.error('Usage: node scripts/updateRatings.js <changes-json>');
    process.exit(1);
  }

  try {
    const changes = JSON.parse(changesJson);
    const results = updateRatings(changes);
    
    console.log(JSON.stringify(results));
    
    if (results.errors.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error(JSON.stringify({ error: error.message }));
    process.exit(1);
  }
}


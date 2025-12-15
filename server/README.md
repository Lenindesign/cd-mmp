# Vehicle Rating API Server

Simple Express API server for the Vehicle Rating Editor to persist changes to JSON data files.

## Setup

The dependencies are already installed via the main `package.json`.

## Running the Server

### Option 1: Run API server only
```bash
npm run dev:api
```

### Option 2: Run both frontend and API server together
```bash
npm run dev:full
```

This will start:
- Frontend (Vite): http://localhost:5173
- API Server: http://localhost:3001

## API Endpoints

### Health Check
```
GET http://localhost:3001/api/health
```

Returns server status.

### Save Ratings
```
POST http://localhost:3001/api/ratings
Content-Type: application/json

{
  "changes": [
    {
      "id": "2",
      "category": "sedans",
      "newRating": 9.5,
      "originalRating": 10.0
    }
  ]
}
```

Saves rating changes to the appropriate JSON files in `src/data/vehicles/`.

## How It Works

1. The Vehicle Rating Editor sends rating changes to `/api/ratings`
2. The API groups changes by category (sedans, suvs, trucks, etc.)
3. For each category, it reads the corresponding JSON file
4. Updates the `staffRating` field for each vehicle
5. Writes the updated data back to the JSON file
6. Returns success/error results

## File Structure

```
server/
  ├── api.js           # Express server
  └── README.md        # This file

scripts/
  └── updateRatings.js # Core logic for updating JSON files
```

## Development Notes

- The API server runs on port 3001 by default
- CORS is enabled for local development
- Changes are written directly to JSON files (no database)
- The frontend automatically reloads after successful save


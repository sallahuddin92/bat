# Data Directory

This directory contains the medicine database files used by the Render.com backend API.

## Files

- **medicines.json** - The primary medicine database containing 30+ medicines with full details

## Important Notes

1. **Backend Storage**: The `medicines.json` file in this directory is read and written by the backend API (`server.js`)
2. **Render Deployment**: On Render.com, the file is stored at `/opt/render/project/src/data/medicines.json`
3. **Persistence**: Changes made through the API are persisted to this file
4. **Sync**: The frontend `medicines.json` (in root) should be kept in sync with this file for local fallback

## How It Works

1. **Initial Load**: API reads `medicines.json` from this directory
2. **CRUD Operations**: Any add/edit/delete operations update this file
3. **Backup**: The root `medicines.json` serves as fallback for the frontend
4. **Sync**: Both files should contain the same data after deployment

## Updating Medicines

### Via API
- POST /api/medicines/add - Add new medicine
- PUT /api/medicines/:code - Update medicine
- DELETE /api/medicines/:code - Delete medicine
- POST /api/medicines - Bulk replace (export/import)

### Via Admin Panel
- Changes sync automatically to this file through the API
- Export medicines from the app to get latest backup

## Do Not Delete

This directory and the `medicines.json` file inside are **critical** for the backend to function. Ensure it exists before deploying to Render.

---

**Last Updated**: November 18, 2025

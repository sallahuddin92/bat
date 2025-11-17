# Medicine Management Guide

## Overview

The Offline Medicine Chart Generator now supports **full medicine database management** through the web interface. All changes can be exported and saved back to the `medicines.json` file for permanent storage.

---

## How Medicine Data Works

### Architecture
1. **medicines.json** - External JSON file containing the medicine database
2. **IndexedDB** - Browser's local database that loads medicines from JSON on first run
3. **Admin Panel** - Web interface to Add/Edit/Delete medicines in IndexedDB
4. **Export Function** - Downloads updated medicines.json file with all changes

### Important: Persistence Workflow

⚠️ **Changes made in the Admin Panel are stored in the browser's IndexedDB, NOT directly in the JSON file.**

To make changes permanent:
1. Make changes in Admin Panel (Add/Edit/Delete)
2. Click **"Export JSON"** button
3. Download the new `medicines.json` file
4. **Replace** the old `medicines.json` file with the downloaded one
5. Changes will now persist across browser sessions and devices

---

## Features

### ✅ Add New Medicine
- Click "Admin Panel" button
- Fill in all medicine details:
  - Code (Unique ID, e.g., PARA500)
  - Generic Name (e.g., Paracetamol 500mg)
  - Brand Variants (comma-separated, e.g., Panadol, Uphamol)
  - Form (Tablet, Capsule, Syrup, etc.)
  - Shape (Round, Oval, Eight-sided, etc.)
  - Color (White, Yellow, Peach, etc.)
  - Default Instruction
  - Pill Image (optional - upload PNG/JPG/SVG)
- Click **"Save Medicine"**

### ✏️ Edit Existing Medicine
- Click the **blue edit button** (pencil icon) next to any medicine
- Form will populate with existing data
- Modify any fields
- Click **"Update Medicine"**
- Click **"Cancel"** to abort editing

### 🗑️ Delete Medicine
- Click the **red delete button** (trash icon) next to any medicine
- Confirm deletion
- Medicine removed from database

### 💾 Export to JSON
- Click **"Export JSON"** button in Admin Panel header
- Browser downloads `medicines.json` file
- **Replace** the original `medicines.json` with this file
- All changes are now permanent

---

## Step-by-Step: Updating Medicine Database

### Scenario 1: Adding a New Medicine

1. **Open the application** in browser (`ubat.html`)
2. Click **"Admin Panel"** button (top of page)
3. Fill in the form:
   ```
   Code: IBUP400
   Generic Name: Ibuprofen 400mg
   Brand Variants: Brufen, Nurofen
   Form: Tablet
   Shape: Round
   Color: White
   Instruction: Ambil 1 biji 3 kali sehari selepas makan bila perlu untuk sakit.
   ```
4. Upload pill image (optional)
5. Click **"Save Medicine"**
6. Medicine appears in the list
7. Click **"Export JSON"**
8. Download `medicines.json`
9. Replace old file: `mv ~/Downloads/medicines.json /path/to/ubat/medicines.json`

### Scenario 2: Editing Existing Medicine

1. Open **Admin Panel**
2. Find the medicine in the list
3. Click the **blue edit button** (pencil icon)
4. Form populates with current data
5. Modify fields (e.g., update instruction text)
6. Click **"Update Medicine"**
7. Click **"Export JSON"** to save changes
8. Replace old `medicines.json` file

### Scenario 3: Deleting a Medicine

1. Open **Admin Panel**
2. Find the medicine to remove
3. Click the **red delete button** (trash icon)
4. Confirm deletion
5. Medicine disappears from list
6. Click **"Export JSON"**
7. Replace old `medicines.json` file

---

## File Structure

```
ubat/
├── ubat.html                          # Main application
├── medicines.json                     # Medicine database (EDIT THIS FILE)
├── MEDICINE_MANAGEMENT_GUIDE.md       # This file
└── README.md                          # General documentation
```

---

## medicines.json Format

Each medicine in the JSON array has this structure:

```json
{
  "code": "PARA500",
  "generic_name": "Paracetamol 500mg",
  "brand_variants": ["Panadol", "Uphamol"],
  "form": "Tablet",
  "shape": "Round",
  "color": "White",
  "image": "data:image/svg+xml;base64,...",
  "instruction": "Ambil 1-2 biji bila perlu. Maksimum 8 biji sehari."
}
```

### Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `code` | String | Unique identifier (UPPERCASE) | `"PARA500"` |
| `generic_name` | String | Medicine name with dosage | `"Paracetamol 500mg"` |
| `brand_variants` | Array | List of brand names | `["Panadol", "Uphamol"]` |
| `form` | String | Medicine form | `"Tablet"`, `"Capsule"`, `"Syrup"` |
| `shape` | String | Pill shape | `"Round"`, `"Oval"`, `"Eight-sided"` |
| `color` | String | Pill color | `"White"`, `"Yellow"`, `"Peach"` |
| `image` | String | Base64-encoded image | `"data:image/svg+xml;base64,..."` |
| `instruction` | String | Dosage instructions in Malay | `"Ambil 1 biji setiap 8 jam"` |

---

## Image Handling

### Option 1: Upload Custom Image
- Click "Choose File" in admin form
- Select PNG, JPG, or SVG image
- Image converts to base64 and embeds in database
- **Recommended size**: 64x64 pixels or 128x128 pixels
- Transparent backgrounds work best

### Option 2: Use Default Placeholder
- Leave image field empty
- System auto-selects placeholder based on:
  - Shape (Round, Oval, Eight-sided)
  - Color (White, Yellow, Peach)
- Placeholders are SVG graphics

### Default Placeholder Mapping
- **White Round** → Round + White
- **White Oval** → Oval + White
- **Yellow Oval** → Oval + Yellow
- **Peach Round** → Round + Peach/Pink
- **White Eight-sided** → Eight-sided + any color

---

## Browser Compatibility

### Storage Limits
- **IndexedDB**: ~50MB - 100MB (varies by browser)
- **Base64 Images**: Each 64x64 PNG ≈ 3-5KB
- **Capacity**: Can store ~1,000+ medicines with images

### Tested Browsers
- ✅ Chrome/Edge (Chromium) - Full support
- ✅ Firefox - Full support
- ✅ Safari - Full support
- ⚠️ Mobile browsers - Works, but export may save to Downloads

---

## Troubleshooting

### Problem: Changes disappear after refresh
**Solution**: You forgot to export and replace `medicines.json`. Click "Export JSON" and replace the file.

### Problem: Export button does nothing
**Solution**: 
1. Check browser console (F12) for errors
2. Ensure pop-up blocker isn't blocking download
3. Try different browser

### Problem: Image too large
**Solution**:
1. Resize image to 64x64 or 128x128 pixels before upload
2. Use PNG or SVG format
3. Compress image using online tools (e.g., TinyPNG)

### Problem: Medicine not appearing in dropdown
**Solution**:
1. Refresh the page (Ctrl+R / Cmd+R)
2. Check if medicine was actually saved (look in Admin Panel list)
3. Clear browser cache and reload

### Problem: JSON file won't load
**Solution**:
1. Ensure `medicines.json` is in same folder as `ubat.html`
2. Check JSON syntax with validator (jsonlint.com)
3. Look for browser console errors (F12)

---

## Best Practices

### ✅ DO
- ✅ Export JSON after every session with changes
- ✅ Backup `medicines.json` before major changes
- ✅ Use descriptive medicine codes (e.g., PARA500, not MED001)
- ✅ Include dosage in generic_name (e.g., "Paracetamol 500mg")
- ✅ Write instructions in clear Malay
- ✅ Test new medicines in chart before saving

### ❌ DON'T
- ❌ Don't edit `medicines.json` manually while app is open
- ❌ Don't use special characters in codes (only A-Z, 0-9, dots, hyphens)
- ❌ Don't upload massive image files (keep under 100KB)
- ❌ Don't delete all medicines (keep at least 1 for testing)
- ❌ Don't skip the export step - changes won't persist!

---

## Advanced: Manual JSON Editing

If you prefer editing JSON directly:

1. Close the web application
2. Open `medicines.json` in text editor (VS Code recommended)
3. Add/edit/delete medicine objects
4. **Validate JSON syntax** (important!)
5. Save file
6. Reload application - changes appear automatically

### JSON Validation
```bash
# Using Python
python -m json.tool medicines.json

# Using Node.js
node -e "console.log(JSON.parse(require('fs').readFileSync('medicines.json')))"

# Online: jsonlint.com
```

---

## Keyboard Shortcuts

While in Admin Panel form:
- **Tab** - Move to next field
- **Shift+Tab** - Move to previous field
- **Enter** - Submit form (when in input fields)
- **Esc** - Cancel edit (when in edit mode)

---

## Version Control (Git)

If using Git to track changes:

```bash
# Add medicines.json to repository
git add medicines.json

# Commit after updates
git commit -m "Updated medicine database: Added Ibuprofen 400mg"

# Push to remote
git push origin main
```

### .gitignore Recommendations
```
# Don't ignore medicines.json - it should be tracked!
# Ignore browser cache files
.DS_Store
Thumbs.db
```

---

## Future Enhancements

Planned features:
- [ ] Import JSON from file upload (reverse of export)
- [ ] Bulk medicine upload via CSV
- [ ] Image library browser
- [ ] Medicine templates
- [ ] Undo/Redo functionality
- [ ] Search/filter in admin list
- [ ] Sort by name/code/date added

---

## Support

For issues or questions:
1. Check this guide first
2. Check browser console (F12) for errors
3. Validate JSON file syntax
4. Try different browser
5. Clear browser cache and retry

---

## License

This medicine management system is part of the Offline Medicine Chart Generator.
All medicine data remains your property.

---

**Last Updated**: 14 November 2025

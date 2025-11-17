# Medicine Management - Quick Reference Card

## 🎯 Quick Actions

| Action | Steps | Result |
|--------|-------|--------|
| **Add Medicine** | Admin Panel → Fill Form → Save | Medicine added to database |
| **Edit Medicine** | Admin Panel → Click Blue Edit 📝 → Update → Save | Medicine updated |
| **Delete Medicine** | Admin Panel → Click Red Trash 🗑️ → Confirm | Medicine removed |
| **Export Changes** | Admin Panel → Export JSON → Save File | Download medicines.json |
| **Make Permanent** | Export → Replace old medicines.json | Changes persist forever |

---

## 📋 Form Fields Reference

### Required Fields
| Field | Example | Format |
|-------|---------|--------|
| **Code** | `PARA500` | UPPERCASE, A-Z, 0-9, dots, hyphens |
| **Generic Name** | `Paracetamol 500mg` | Text with dosage |
| **Form** | `Tablet` | Dropdown selection |
| **Shape** | `Round` | Dropdown selection |
| **Color** | `White` | Text description |
| **Instruction** | `Ambil 1-2 biji bila perlu` | Malay text |

### Optional Fields
| Field | Example | Notes |
|-------|---------|-------|
| **Brand Variants** | `Panadol, Uphamol` | Comma-separated list |
| **Pill Image** | Upload PNG/JPG | Max recommended: 128x128px |

---

## 🔄 Persistence Workflow

### ❌ WRONG - Changes Will Be Lost
```
1. Open Admin Panel
2. Add/Edit medicine
3. Close browser
   ❌ Changes lost when clearing browser data!
```

### ✅ CORRECT - Changes Are Permanent
```
1. Open Admin Panel
2. Add/Edit medicine
3. Click "Export JSON"
4. Download medicines.json
5. Replace old file with new file
   ✅ Changes saved to disk forever!
```

---

## 🖼️ Image Guidelines

### Recommended Specs
- **Size**: 64x64px or 128x128px
- **Format**: PNG (best), SVG, or JPG
- **Background**: Transparent preferred
- **File Size**: Under 50KB per image
- **Color**: Match actual pill appearance

### Auto-Placeholder Rules
If no image uploaded, system selects based on:

| Shape + Color | Placeholder |
|--------------|-------------|
| Round + White | White Round Circle |
| Oval + White | White Oval |
| Oval + Yellow | Yellow Oval |
| Round + Peach/Pink | Peach Round Circle |
| Eight-sided + Any | White Octagon |

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Next field |
| `Shift+Tab` | Previous field |
| `Enter` | Submit form |
| `Escape` | Cancel edit (in edit mode) |

---

## 🐛 Common Issues

### Problem: "My changes disappeared!"
**Fix**: You forgot to export. Click "Export JSON" and replace the file.

### Problem: "Export button does nothing"
**Fix**: Check pop-up blocker. Try different browser.

### Problem: "Medicine not in dropdown"
**Fix**: Refresh page (Ctrl+R / Cmd+R)

### Problem: "Image too big"
**Fix**: Resize to 128x128px before upload. Use PNG.

### Problem: "Can't find medicines.json"
**Fix**: Must be in same folder as ubat.html

---

## 📊 Current Database Status

- **Total Medicines**: 30 (initial load)
- **Storage Type**: IndexedDB (browser)
- **Source File**: medicines.json
- **Max Capacity**: ~1,000+ medicines
- **With Images**: ~500 medicines (128x128 PNGs)

---

## 🎨 UI Indicators

| Icon | Meaning | Color |
|------|---------|-------|
| ✏️ Edit | Edit this medicine | Blue |
| 🗑️ Trash | Delete this medicine | Red |
| 💾 Download | Export to JSON | White |
| ✓ Check | Save/Submit | Green |
| ✖ X | Close/Cancel | Gray/White |

---

## 💡 Pro Tips

1. **Backup First**: Before bulk changes, export current medicines.json
2. **Test Locally**: Add test medicine, generate PDF, verify, then export
3. **Consistent Naming**: Use format "DrugName Dosage" (e.g., "Amoxicillin 500mg")
4. **Code Standards**: Use abbreviations like PARA500, AMOX500, not MED001
5. **Instruction Language**: Keep instructions in Malay for consistency
6. **Image Quality**: Sharp, clear images improve PDF appearance
7. **Regular Exports**: Export after every session with changes
8. **Git Tracking**: Commit medicines.json to version control

---

## 📱 Browser Compatibility

| Browser | Add/Edit | Delete | Export | Notes |
|---------|----------|--------|--------|-------|
| **Chrome** | ✅ | ✅ | ✅ | Full support |
| **Firefox** | ✅ | ✅ | ✅ | Full support |
| **Safari** | ✅ | ✅ | ✅ | Full support |
| **Edge** | ✅ | ✅ | ✅ | Full support |
| **Mobile Chrome** | ✅ | ✅ | ⚠️ | Export to Downloads |
| **Mobile Safari** | ✅ | ✅ | ⚠️ | Export to iCloud |

---

## 🔧 Advanced: Direct JSON Editing

For power users who prefer text editors:

```bash
# 1. Close web application
# 2. Edit medicines.json directly
nano medicines.json  # or VS Code, Sublime, etc.

# 3. Validate JSON syntax
python -m json.tool medicines.json

# 4. Reload application
# Changes appear automatically
```

**Format Template:**
```json
{
  "code": "NEWMED100",
  "generic_name": "New Medicine 100mg",
  "brand_variants": ["Brand1", "Brand2"],
  "form": "Tablet",
  "shape": "Round",
  "color": "White",
  "image": "data:image/svg+xml;base64,...",
  "instruction": "Ambil 1 biji 2 kali sehari."
}
```

---

## 📞 Support Checklist

Before asking for help:
- [ ] Checked browser console (F12) for errors
- [ ] Tried different browser
- [ ] Validated JSON syntax (jsonlint.com)
- [ ] Cleared browser cache
- [ ] Verified medicines.json in correct location
- [ ] Tried export/import workflow
- [ ] Read MEDICINE_MANAGEMENT_GUIDE.md

---

## 📅 Version

**System**: Offline Medicine Chart Generator  
**Feature**: Full Medicine Management (CRUD)  
**Last Updated**: 14 November 2025  
**JSON Schema**: v1.0  

---

**For detailed instructions, see [MEDICINE_MANAGEMENT_GUIDE.md](MEDICINE_MANAGEMENT_GUIDE.md)**

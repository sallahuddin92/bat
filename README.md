# 🏥 Ubat Saya - Medicine Chart Generator
**Offline Web-Based Medicine Schedule Management System**

## ✨ Features

### 1. **Fully Functional Web App**
- ✅ No server required - works completely offline
- ✅ Responsive design (desktop, tablet, mobile)
- ✅ Beautiful modern UI with Tailwind CSS
- ✅ Instant PDF generation

### 2. **Advanced Database System (IndexedDB)**
IndexedDB was chosen because:
- **Local Storage**: Up to 50MB+ per origin (vs 5-10MB for localStorage)
- **Structured Data**: Better than localStorage's simple key-value model
- **Transactions**: ACID-compliant operations
- **Indices**: Fast searching by generic name, brand, etc.
- **Performance**: Asynchronous, non-blocking
- **Scalability**: Ideal for storing 100+ medicines and charts

#### Database Schema (v2):

```
UbatSayaDB/
├── medicines (Object Store)
│   ├── Code (Primary Key) - "PARA500", "AMLO5", etc.
│   ├── generic_name (Index)
│   ├── brand_variants (Index, JSON)
│   ├── form, shape, color
│   ├── image (Base64 SVG/PNG)
│   └── instruction
│
├── charts (Object Store) - Saved medicine schedules
│   ├── chartId (Auto-increment Primary Key)
│   ├── patientName (Index)
│   ├── patientId
│   ├── medicines (Array of selected medicines)
│   ├── createdDate (Index, ISO string)
│   └── notes
│
└── settings (Object Store) - User preferences
    ├── lastChartId
    ├── theme
    └── ...future options
```

### 3. **Core Functionality**

#### Medicine Management (NEW! 🎉)
- **External JSON Database**: Medicines stored in `medicines.json` for easy editing
- **Admin Panel**: Add, edit, delete medicines through web interface
- **Export/Import**: Download updated medicines.json with all changes
- **Full CRUD Operations**: 
  - ✅ Create new medicines
  - ✅ Edit existing medicines (including images)
  - ✅ Delete medicines
  - ✅ Export all changes to JSON file
- **Smart Image Handling**: Upload custom images or use smart placeholders
- **Form Validation**: Ensures data integrity
- 📖 **[Full Medicine Management Guide →](MEDICINE_MANAGEMENT_GUIDE.md)**

#### Chart Creation
- **Select Patient**: Name & ID/IC
- **Add Medicines**: Choose from database
- **Set Dosages**: 5 time slots (Pagi, Tengah Hari, Petang, Malam, Jika Perlu)
- **Visual Indicators**: Color-coded time periods with icons
- **Real-time Preview**: See changes instantly

#### Data Persistence
- **Save Charts**: Store locally with timestamps
- **Load Charts**: Retrieve saved charts instantly
- **Export JSON**: Share or backup charts
- **Import JSON**: Restore from backups
- **Clear Data**: Start fresh anytime

#### PDF Generation
- **Professional Layout**: Landscape A4 format (fits single page)
- **Compact Header**: Optimized for space efficiency
- **Patient Info**: Name & ID in header
- **Medicine Details**: Name and dosage checkboxes
- **Checked Boxes**: Visual schedule for patient
- **High Quality**: JPEG 0.95 quality, 2x scale rendering
- **Single Page Fit**: All medicines fit on one landscape page

#### PDF History & Tracking
- **History Tab**: View all generated PDFs
- **Quick Reload**: Load patient info from previous PDFs
- **Timestamp**: Automatic recording of when PDFs were created
- **Patient List**: Easy reference of past patients
- **Limited Storage**: Keeps last 100 generated PDFs

### 4. **Modern UI/UX Design**
- **Tabbed Interface**: Create & History tabs for organized workflow
- **Compact Layout**: Optimized for maximum content visibility
- **Color-Coded Dosages**: Visual time slots (blue, yellow, orange, indigo, red)
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Professional Styling**: Healthcare-appropriate color scheme
- **Quick Actions**: Remove medicines with single click
- **Medicine Images**: Visual pill representation

### 5. **Data Security & Privacy**
- ✅ **All data stays local** - nothing uploaded to servers
- ✅ **Browser storage** - survives app closure
- ✅ **Browser isolation** - separate from other websites
- ✅ **Persistent** - data remains until manually cleared
- ✅ **Export backups** - download as JSON for safety

---

## 🚀 Getting Started

### Quick Start
1. **Open** `ubat.html` in any modern browser
2. Click **"Admin Panel"** to manage medicines
3. **Create Chart**:
   - Enter patient name & ID
   - Select medicines from dropdown
   - Check boxes for dosage schedule (PAGI, SIANG, PETANG, MALAM, JIKA PERLU)
4. **Save**: Click "Save Chart" to store locally
5. **Generate PDF**: Click "Generate PDF" to download

### ⚠️ IMPORTANT: Medicine Data Persistence

**Understanding the Data Flow:**

```
medicines.json  →  IndexedDB  →  Admin Panel Changes  →  Export  →  medicines.json
   (Disk)         (Browser)         (Temporary)                      (Disk - Updated)
```

**To Make Changes Permanent:**
1. Make changes in Admin Panel (Add/Edit/Delete medicines)
2. Click **"Export JSON"** button
3. Download the new `medicines.json` file
4. **Replace** the old file with the new one
5. Changes now persist across sessions!

**⚠️ If you skip the export step, your changes will be lost when you clear browser data or open on another device!**

📖 **[Read Full Medicine Management Guide](MEDICINE_MANAGEMENT_GUIDE.md)** for detailed instructions.

### File Structure
```
/ubat/
├── ubat.html                         # Main application (single file)
├── medicines.json                    # Medicine database (EDITABLE)
├── README.md                         # General documentation
├── MEDICINE_MANAGEMENT_GUIDE.md      # Medicine management instructions
├── TECHNICAL_SPEC.md                 # Technical documentation
└── Offline Medicine Chart Generator.pdf  # Reference document
```

---

## 📊 Database Advantages Over Alternatives

| Feature | localStorage | SessionStorage | IndexedDB | SQLite (web) |
|---------|--------------|----------------|-----------|--------------|
| Capacity | 5-10MB | 5-10MB | **50MB+** | 50MB+ |
| Data Types | Strings only | Strings only | **Objects** | Relational |
| Querying | None | None | **Indices** | SQL |
| Async | No | No | **Yes** | Yes |
| Transactions | No | No | **Yes** | Yes |
| Performance | Slow (large) | Slow (large) | **Fast** | Fast |
| **Best for** | Simple settings | Temp data | **This app** | Complex queries |

**Our Choice: IndexedDB** ✅
- Perfect for 30+ medicines
- Fast lookups by name/brand
- Stores images as Base64
- Supports multiple charts
- Proven offline capability

---

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Semantic structure
- **Tailwind CSS**: Beautiful responsive styling
- **Lucide Icons**: Modern SVG icons
- **html2pdf.js**: Client-side PDF generation
- **IndexedDB API**: Advanced local storage
- **JavaScript (ES6+)**: Modern async/await, Promises

### Browser Compatibility
- ✅ Chrome/Edge 24+
- ✅ Firefox 16+
- ✅ Safari 10+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)
- ❌ Internet Explorer (use Edge instead)

### Key JavaScript Features
```javascript
// Promisified IndexedDB for async/await
async function initDB() { ... }

// Store/retrieve medicines
async function addMedicineToChart(code) { ... }

// Save/restore complete charts
async function saveChart() { ... }
async function restoreChart(chartId) { ... }

// Data export/import
async function exportChartAsJSON() { ... }
async function importChartFromJSON(file) { ... }

// PDF generation with checked boxes
function generatePDF() { ... }
```

---

## 💾 Data Storage Examples

### Sample Medicine Entry
```javascript
{
  "code": "PARA500",
  "generic_name": "Paracetamol 500mg",
  "brand_variants": ["Panadol", "Uphamol"],
  "form": "Tablet",
  "shape": "Round",
  "color": "White",
  "image": "data:image/svg+xml;base64,...",
  "instruction": "Ambil 1-2 biji setiap 4-6 jam bila perlu"
}
```

### Sample Saved Chart
```javascript
{
  "chartId": 1,
  "patientName": "Ahmad bin Ismail",
  "patientId": "801010-10-5555",
  "medicines": [
    {
      "code": "GLI30MR",
      "generic_name": "Gliclazide 30mg MR",
      "instruction": "Ambil sekali sehari dengan sarapan",
      "dosage": {
        "pagi": true,
        "tengah_hari": false,
        "petang": false,
        "malam": false,
        "jika_perlu": false
      }
    },
    // ... more medicines
  ],
  "createdDate": "2025-11-13T10:30:00Z"
}
```

---

## 🎯 Use Cases

### For Healthcare Workers
- 👨‍⚕️ Create medicine schedules for patients
- 📋 Print patient-friendly charts
- 💾 Save and reuse common combinations
- 🌐 Works offline at clinics without internet

### For Patients
- 💊 Keep track of medicines
- 📱 Access on phone/tablet
- 🖨️ Print reminders to put on fridge
- 🗂️ Store backup of their medicines

### For Pharmacies
- 🏪 Create patient counseling materials
- 🔍 Quick medicine reference database
- 📊 Track common medicine combinations
- 💯 Professional printed materials

---

## ⚙️ Customization Guide

### Adding More Medicines
Edit `initialMedicines` array in the JavaScript section:
```javascript
{
    code: "YOUR_CODE",
    generic_name: "Medicine Name & Strength",
    brand_variants: JSON.stringify(["Brand1", "Brand2"]),
    form: "Tablet/Capsule",
    shape: "Round/Oval",
    color: "White/Yellow",
    image: placeholderImages["white-round"],
    instruction: "Instruction in Malay"
}
```

### Changing Colors
- Edit Tailwind CSS classes in the HTML
- Time slots: `bg-blue-50`, `bg-yellow-50`, `bg-orange-50`, `bg-indigo-50`, `bg-red-50`
- Icons: Use Lucide icon names from `data-lucide` attributes

### Switching Language
- Replace Malay labels with your language
- Update dosage times and instructions
- Modify button labels and messages

---

## 📱 Offline Capability

**This app works 100% offline:**
- ✅ No internet connection needed
- ✅ All data stored locally in browser
- ✅ PDF generation happens on device
- ✅ Perfect for clinics, travel, backup

**To use offline:**
1. Open `ubat.html` once with internet
2. Browser caches files
3. Works offline forever (until you clear cache)

---

## 🔒 Privacy & Security

- **Your data stays on YOUR device** - never sent anywhere
- **No analytics** - we don't track your usage
- **No cookies** - (except browser's IndexedDB)
- **No account needed** - complete anonymity
- **Local backups** - export JSON for safety

---

## 🐛 Troubleshooting

### "Database error" message
- Check browser's IndexedDB is enabled
- Try clearing browser cache and reload
- Ensure JavaScript is enabled

### PDF not generating
- Try smaller charts (fewer medicines)
- Increase browser's timeout settings
- Try different browser (Chrome works best)

### Images not showing
- Use PNG or JPEG format (< 1MB)
- App includes SVG fallbacks automatically
- Base64 size shouldn't exceed IndexedDB limits

---

## 🚀 Future Enhancements

Potential additions:
- 📧 Email chart as PDF
- ☁️ Cloud sync (optional, privacy-respecting)
- 🔔 Mobile app notifications
- 🌍 Multi-language support
- 📊 Patient compliance tracking
- 💉 Drug interaction checker
- 🏥 Integration with EHR systems

---

## 📄 License
Free to use and modify for personal/medical use.

---

## 🙏 Credits
- **Tailwind CSS**: Beautiful styling framework
- **Lucide Icons**: Modern icon set
- **html2pdf.js**: Client-side PDF generation
- **IndexedDB API**: Modern browser storage

---

## 📞 Support
For issues or suggestions:
1. Check browser console (F12) for error messages
2. Verify browser compatibility
3. Try incognito mode (rules out extensions)
4. Export data backup before troubleshooting

---

**Created**: November 2025
**Version**: 2.0 (Enhanced Database)
**Status**: Fully Functional ✅

Make medicine management simple, private, and accessible to everyone! 💊

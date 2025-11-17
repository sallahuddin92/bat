# 🔧 Troubleshooting Guide - Medicine Database Loading

## ❌ Problem: "Failed to load medicine database. Please ensure medicines.json file is present."

This error occurs when the app cannot load medicines from **both**:
1. The **API** (Render.com backend) - primary source
2. The **local medicines.json file** - fallback source

---

## ✅ Quick Diagnosis

### **Step 1: Check Browser Console (F12)**
1. Press **F12** on your keyboard
2. Go to **Console** tab (not Application, not Network)
3. Look for one of these messages:

**✓ SUCCESS - You should see:**
```
🔗 API URL: https://ubat-api.onrender.com
✓ Loaded 30 medicines from API
```
OR
```
🔗 API URL: https://ubat-api.onrender.com
✓ Loaded 30 medicines from local file
```

**✗ PROBLEM - You might see:**
```
Error loading medicines from API: TypeError: Failed to fetch
Error loading from local file: TypeError: Failed to fetch
```

---

## 🔍 Detailed Troubleshooting

### **Issue 1: API is Sleeping (Most Common)**
**Render.com free tier sleeps after 15 minutes of inactivity**

**How to Fix:**
1. Open in a new tab: https://ubat-api.onrender.com/api/medicines
2. If it takes 10-30 seconds to load → API is waking up ✓
3. Wait 30 seconds
4. Go back to your app and **refresh the page** (Cmd+R or Ctrl+R)
5. Should now see: `✓ Loaded 30 medicines from API`

**Estimated wait time:** 30-60 seconds for API to fully wake

---

### **Issue 2: Browser Cache Problem**

**Hard Refresh (Clear Cache):**
- **Mac:** Press `Cmd + Shift + R`
- **Windows/Linux:** Press `Ctrl + Shift + R`

This bypasses the browser cache and loads fresh code.

---

### **Issue 3: medicines.json File Missing**
**Status:** ✅ **File EXISTS** - This should not be the cause

But let's verify:
1. Open Console (F12)
2. Type this and press Enter:
```javascript
fetch('medicines.json').then(r => r.json()).then(d => console.log('✓ medicines.json found! ' + d.length + ' medicines'))
```
3. You should see: `✓ medicines.json found! 30 medicines` or similar

---

### **Issue 4: Network/CORS Issue**

**Check Network Tab:**
1. Press F12 → Go to **Network** tab
2. Refresh the page (Cmd+R)
3. Look for these requests:
   - `medicines` or `api/medicines` → Should show **200** status ✓
   - `medicines.json` → Should show **200** status ✓
   - Any **404** or **403** errors → Problem found

**If you see 404:**
- The file path is wrong
- Try checking: Is `medicines.json` in the same folder as `ubat.html`?

---

## 📋 Step-by-Step Recovery

### **For Render.com Backend Issues:**

1. **Wake up the API** (Do this first):
   ```
   Visit: https://ubat-api.onrender.com/api/medicines
   Wait: 30 seconds for page to load
   Should see: JSON array of medicines
   ```

2. **Verify API is running:**
   ```javascript
   // Paste in Console (F12) and press Enter:
   fetch('https://ubat-api.onrender.com/api/medicines')
     .then(r => r.json())
     .then(d => console.log('✓ API working! ' + d.length + ' medicines'))
     .catch(e => console.error('✗ API error:', e))
   ```

3. **Hard refresh your app:**
   - Press `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
   - Should now load medicines from API

---

### **For Local File Issues:**

1. **Check file exists:**
   ```javascript
   // Paste in Console (F12) and press Enter:
   fetch('medicines.json')
     .then(r => r.json())
     .then(d => console.log('✓ Local file working! ' + d.length + ' medicines'))
     .catch(e => console.error('✗ Local file error:', e))
   ```

2. **Check file size:**
   - Should be around **14-15 KB**
   - Contains 30+ medicines
   - Valid JSON format

3. **If file is missing:**
   - The medicines.json should be deployed with your frontend
   - Check deployment settings

---

## 🌐 Understanding the Loading Flow

```
App Starts
    ↓
Try API: https://ubat-api.onrender.com/api/medicines
    ↓
    ├─ ✓ Success? → Load from API
    └─ ✗ Fail? → Try fallback...
    
Try Local: medicines.json
    ↓
    ├─ ✓ Success? → Load from local file
    └─ ✗ Fail? → Show error message
```

**Both must fail** to see the error message. Usually, the local file acts as a safety net.

---

## 🎯 Common Solutions

| Problem | Solution | Time |
|---------|----------|------|
| API sleeping | Wait 30-60 sec, then refresh | 1 min |
| Browser cache | Hard refresh (Cmd+Shift+R) | 10 sec |
| File missing | Check medicines.json exists | 1 min |
| Network issue | Check F12 Network tab | 2 min |
| CORS blocked | Contact support | N/A |

---

## 📞 Getting Help

**When asking for help, provide:**

1. **Console output** (F12 → Console):
   - Copy the exact error message
   - Include the `🔗 API URL:` line

2. **Network tab info** (F12 → Network):
   - Screenshot showing API call status
   - Show any 404 or 500 errors

3. **File verification**:
   ```javascript
   // Paste in Console to verify:
   fetch('medicines.json').then(r => r.json()).then(d => console.log(d.length, 'medicines found'))
   ```

---

## ✅ Verification Checklist

- [ ] medicines.json file exists in deployment folder
- [ ] Browser console shows ✓ API loaded OR ✓ local file loaded
- [ ] No network errors (F12 → Network tab)
- [ ] API responds at https://ubat-api.onrender.com/api/medicines
- [ ] Hard refresh doesn't show error (Cmd+Shift+R)
- [ ] Waited at least 30 seconds after first load
- [ ] Using modern browser (Chrome, Firefox, Safari, Edge)

---

## 🚀 Next Steps

1. **Try the steps above** - Most issues resolve in under 2 minutes
2. **Check the Console** - Copy exact error message if persists
3. **Hard refresh** - Clear cache with Cmd+Shift+R
4. **Wait for API** - Allow 30-60 seconds for backend to wake up
5. **Report specific error** - With console output and file verification

**You've got this! 💪**

// Medicine Chart API - Backend for Render.com
// Serves medicines.json with CRUD operations

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const MEDICINES_FILE = path.join(__dirname, 'data', 'medicines.json');

// Middleware
app.use(cors()); // Allow requests from Netlify
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies (large for base64 images)

// Logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// ===== HELPER FUNCTIONS =====

async function readMedicines() {
    try {
        const data = await fs.readFile(MEDICINES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading medicines.json:', error);
        // If file doesn't exist, return empty array
        return [];
    }
}

async function writeMedicines(medicines) {
    try {
        // Ensure data directory exists
        await fs.mkdir(path.dirname(MEDICINES_FILE), { recursive: true });
        
        // Write with pretty formatting
        await fs.writeFile(MEDICINES_FILE, JSON.stringify(medicines, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing medicines.json:', error);
        throw error;
    }
}

// ===== API ENDPOINTS =====

// Health check
app.get('/', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'Medicine Chart API is running',
        version: '1.0.0',
        endpoints: [
            'GET /api/medicines - Get all medicines',
            'POST /api/medicines - Replace all medicines',
            'POST /api/medicines/add - Add new medicine',
            'PUT /api/medicines/:code - Update medicine',
            'DELETE /api/medicines/:code - Delete medicine'
        ]
    });
});

// GET all medicines
app.get('/api/medicines', async (req, res) => {
    try {
        const medicines = await readMedicines();
        res.json({
            success: true,
            count: medicines.length,
            data: medicines
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to read medicines',
            message: error.message
        });
    }
});

// POST - Replace all medicines (bulk update/export)
app.post('/api/medicines', async (req, res) => {
    try {
        const medicines = req.body;
        
        if (!Array.isArray(medicines)) {
            return res.status(400).json({
                success: false,
                error: 'Invalid data format. Expected array of medicines.'
            });
        }
        
        await writeMedicines(medicines);
        
        res.json({
            success: true,
            message: `Successfully saved ${medicines.length} medicines`,
            count: medicines.length
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to save medicines',
            message: error.message
        });
    }
});

// POST - Add new medicine
app.post('/api/medicines/add', async (req, res) => {
    try {
        const newMedicine = req.body;
        
        if (!newMedicine.code || !newMedicine.generic_name) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: code, generic_name'
            });
        }
        
        const medicines = await readMedicines();
        
        // Check if medicine with this code already exists
        const existingIndex = medicines.findIndex(m => m.code === newMedicine.code);
        
        if (existingIndex >= 0) {
            // Update existing
            medicines[existingIndex] = newMedicine;
            await writeMedicines(medicines);
            
            return res.json({
                success: true,
                message: `Medicine ${newMedicine.code} updated`,
                data: newMedicine,
                action: 'updated'
            });
        } else {
            // Add new
            medicines.push(newMedicine);
            await writeMedicines(medicines);
            
            return res.json({
                success: true,
                message: `Medicine ${newMedicine.code} added`,
                data: newMedicine,
                action: 'added'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to add medicine',
            message: error.message
        });
    }
});

// PUT - Update medicine by code
app.put('/api/medicines/:code', async (req, res) => {
    try {
        const { code } = req.params;
        const updatedMedicine = req.body;
        
        const medicines = await readMedicines();
        const index = medicines.findIndex(m => m.code === code);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: `Medicine with code ${code} not found`
            });
        }
        
        medicines[index] = { ...updatedMedicine, code }; // Ensure code doesn't change
        await writeMedicines(medicines);
        
        res.json({
            success: true,
            message: `Medicine ${code} updated`,
            data: medicines[index]
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to update medicine',
            message: error.message
        });
    }
});

// DELETE - Delete medicine by code
app.delete('/api/medicines/:code', async (req, res) => {
    try {
        const { code } = req.params;
        
        const medicines = await readMedicines();
        const index = medicines.findIndex(m => m.code === code);
        
        if (index === -1) {
            return res.status(404).json({
                success: false,
                error: `Medicine with code ${code} not found`
            });
        }
        
        const deleted = medicines.splice(index, 1)[0];
        await writeMedicines(medicines);
        
        res.json({
            success: true,
            message: `Medicine ${code} deleted`,
            data: deleted
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to delete medicine',
            message: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Medicine Chart API running on port ${PORT}`);
    console.log(`📁 Data file: ${MEDICINES_FILE}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

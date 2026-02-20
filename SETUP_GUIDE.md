# FEPC Enrollment Portal - Complete Setup & Migration Guide

## 📋 Prerequisites

### Required Software
1. **Node.js** (v16 or higher) - ✅ Already installed (v25.0.0)
2. **npm** (comes with Node.js) - ✅ Already installed (11.6.2)
3. **PHP** (7.4+ with CLI) - ✅ Already installed (8.2.12)
4. **MySQL Server** - ⚠️ **NOT INSTALLED** (Required for database)
5. **XAMPP** (Recommended) - Contains Apache, MySQL, PHP in one package

### Recommended Development Environment
- **Visual Studio Code** (VS Code) with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - PHP IntelliSense
  - MySQL

## 🚀 Installation Steps

### Step 1: Install XAMPP (Recommended)
1. Download XAMPP from: https://www.apachefriends.org/download.html
2. Choose the Windows version with PHP 8.2+
3. Install XAMPP in the default location: `C:\xampp`
4. Start XAMPP Control Panel
5. Start **Apache** and **MySQL** modules

### Step 2: Clone or Copy the Project
```bash
# If cloning from repository
git clone <repository-url>
cd "Far Eastern Polytechnic College Enrollment Portal"

# If copying from existing project
# Copy the entire project folder to your desired location
```

### Step 3: Install Frontend Dependencies
```bash
# Navigate to project root directory
cd "Far Eastern Polytechnic College Enrollment Portal"

# Install all npm dependencies
npm install
```

### Step 4: Setup Database
1. **Open phpMyAdmin**:
   - Start XAMPP Control Panel
   - Click "Admin" button next to MySQL (opens phpMyAdmin in browser)

2. **Create Database**:
   - Click "New" in phpMyAdmin
   - Database name: `fepc_enrollment`
   - Collation: `utf8_general_ci`
   - Click "Create"

3. **Import Database Schema**:
   - Select the `fepc_enrollment` database
   - Click "Import" tab
   - Choose file: `src/backend/setup/database_setup.sql`
   - Click "Go" to import

### Step 5: Configure Backend
1. **Update Database Configuration** (if needed):
   - File: `src/backend/config/database.php`
   - Default settings should work with XAMPP:
     - Host: `localhost`
     - Database: `fepc_enrollment`
     - Username: `root`
     - Password: `""` (empty)

2. **Test Database Connection**:
   ```bash
   # Run database test script
   php test_db.php
   ```

## 🎯 Running the Project

### Method 1: Automated Startup (Recommended)
```bash
# Start backend server (PHP)
# Double-click start-backend.bat OR run:
start-backend.bat

# In a new terminal/command prompt:
# Start frontend development server
npm run dev
```

### Method 2: Manual Startup
```bash
# Terminal 1: Start Backend (PHP Server)
cd src/backend
php -S localhost:8080

# Terminal 2: Start Frontend (React/Vite)
npm run dev
```

### Access the Application
- **Frontend**: http://localhost:3001
- **Backend API**: http://localhost:8080
- **phpMyAdmin**: http://localhost/phpmyadmin

## 🔧 Troubleshooting

### Common Issues

#### 1. Port Conflicts
```bash
# Kill processes on ports 3000-3005
node kill-ports.js

# Or manually kill specific port
npx kill-port 3001
npx kill-port 8080
```

#### 2. Database Connection Issues
- Ensure MySQL is running in XAMPP
- Check database name matches: `fepc_enrollment`
- Verify MySQL credentials in `src/backend/config/database.php`

#### 3. PHP Not Found
- Add PHP to system PATH
- Or use full path: `C:\xampp\php\php.exe -S localhost:8080`

#### 4. Node.js/npm Issues
```bash
# Clear npm cache
npm cache clean --force

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### 5. CORS Issues
- Frontend runs on port 3001
- Backend runs on port 8080
- CORS is configured in `src/backend/config/database.php`

## 📁 Project Structure

```
Far Eastern Polytechnic College Enrollment Portal/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # Reusable UI components (Radix UI)
│   │   ├── chat/           # Chat assistant
│   │   ├── home/           # Home page sections
│   │   └── views/          # Main page components
│   ├── backend/            # PHP backend
│   │   ├── api/            # API endpoints
│   │   ├── config/         # Database configuration
│   │   └── setup/          # Database schema
│   ├── services/           # API service functions
│   ├── hooks/              # Custom React hooks
│   └── styles/             # CSS styles
├── documentation/          # Project documentation
├── node_modules/           # Node.js dependencies
├── package.json            # Frontend dependencies
├── composer.json           # Backend dependencies
├── vite.config.js          # Vite configuration
└── README.md               # Project overview
```

## 🔑 Default Credentials

### Admin Login
- **Username**: `admin`
- **Password**: `admin123`

## 📚 Key Features

### Student Enrollment
- Multi-step form with validation
- Document upload (New/Transfer students)
- Program selection (SHS/College)
- Real-time form validation

### Admin Dashboard
- Enrollment management
- Status updates (Pending/Approved/Rejected)
- Search and filtering
- Statistics overview

### Chat Assistant
- AI-powered support
- Conversation history
- Customizable settings

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Kill port processes
node kill-ports.js
```

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are installed
3. Ensure ports 3001 and 8080 are available
4. Check database connection and schema

## 📋 Checklist Before Running

- [ ] XAMPP installed and running (Apache + MySQL)
- [ ] Database `fepc_enrollment` created in phpMyAdmin
- [ ] Database schema imported from `database_setup.sql`
- [ ] Node.js dependencies installed (`npm install`)
- [ ] Ports 3001 and 8080 available
- [ ] PHP CLI accessible in command prompt

## 🎉 You're Ready!

Once all steps are completed, you can:
1. Start the backend: `start-backend.bat`
2. Start the frontend: `npm run dev`
3. Access the application at http://localhost:3001
4. Login as admin with credentials above

## 🔄 **Complete Migration Guide: Moving to a Fresh Computer**

### **Migration Overview**
This guide covers moving your entire FEPC Enrollment Portal (including database data and uploaded files) to a new computer while ensuring the backend works perfectly.

### **Step 1: Prepare Your Current Project for Migration**

#### **A. Export Database Data**
1. **Open phpMyAdmin** on your current computer
2. **Select Database**: `fepc_enrollment`
3. **Click "Export"** tab
4. **Export Method**: Custom
5. **Tables**: Select all tables
6. **Format**: SQL
7. **Options**:
   - ✅ Include column names in INSERT
   - ✅ Use hexadecimal for BLOB
   - ✅ Export contents of tables
8. **Save as**: `fepc_enrollment_data.sql`
9. **Compression**: None (for compatibility)

#### **B. Backup Uploaded Files**
```bash
# Create backup directory
mkdir migration_backup

# Copy uploaded files
cp -r src/backend/uploads migration_backup/

# Copy database export
cp fepc_enrollment_data.sql migration_backup/

# Create project archive (excluding node_modules)
cd ..
tar -czf fepc_enrollment_migration.tar.gz \
  --exclude="node_modules" \
  --exclude=".git" \
  "Far Eastern Polytechnic College Enrollment Portal"
```

### **Step 2: Transfer Files to New Computer**

#### **Method 1: USB Drive / External Storage**
1. Copy `fepc_enrollment_migration.tar.gz` and `migration_backup/` folder
2. Transfer to new computer via USB/external drive

#### **Method 2: Cloud Storage**
1. Upload files to Google Drive, Dropbox, or OneDrive
2. Download on new computer

#### **Method 3: Git Repository (Recommended for Teams)**
```bash
# On current computer
git add .
git commit -m "Migration backup: $(date)"
git push origin main

# On new computer
git clone <repository-url>
```

### **Step 3: Setup New Computer Environment**

#### **A. Install Prerequisites**
1. **Install XAMPP**:
   - Download: https://www.apachefriends.org/download.html
   - Install in default location: `C:\xampp`
   - Start XAMPP Control Panel
   - Start Apache and MySQL

2. **Install Node.js** (if not already installed):
   - Download: https://nodejs.org/
   - Install LTS version (16+)

#### **B. Extract Project Files**
```bash
# Extract the project archive
tar -xzf fepc_enrollment_migration.tar.gz

# Navigate to project
cd "Far Eastern Polytechnic College Enrollment Portal"

# Install dependencies
npm install
```

### **Step 4: Restore Database**

#### **A. Create Database**
1. **Open phpMyAdmin**: http://localhost/phpmyadmin
2. **Create Database**:
   - Database name: `fepc_enrollment`
   - Collation: `utf8_general_ci`

#### **B. Import Schema First**
1. **Select Database**: `fepc_enrollment`
2. **Import Tab**
3. **Choose File**: `src/backend/setup/database_setup.sql`
4. **Click "Go"**

#### **C. Import Data**
1. **Still in phpMyAdmin**
2. **Import Tab**
3. **Choose File**: `migration_backup/fepc_enrollment_data.sql`
4. **Click "Go"**

### **Step 5: Restore Uploaded Files**

```bash
# Copy uploaded files to correct location
cp -r migration_backup/uploads/* src/backend/uploads/

# Ensure proper permissions
chmod -R 755 src/backend/uploads/
```

### **Step 6: Update Configuration (If Needed)**

#### **Check Database Configuration**
- File: `src/backend/config/database.php`
- Should work with default XAMPP settings:
  ```php
  private $host = 'localhost';
  private $db_name = 'fepc_enrollment';
  private $username = 'root';
  private $password = '';
  ```

#### **Test Database Connection**
```bash
# Test connection
php test_db.php
```

### **Step 7: Verify Migration Success**

#### **A. Start Services**
```bash
# Terminal 1: Start Backend
start-backend.bat
# OR manually: cd src/backend && php -S localhost:8080

# Terminal 2: Start Frontend
npm run dev
```

#### **B. Test Functionality**
1. **Access Application**: http://localhost:3001
2. **Test Enrollment Form**: Submit a test enrollment
3. **Admin Login**: Use admin/admin123
4. **Check Dashboard**: Verify existing enrollments appear
5. **Test Document Viewing**: Click "View" on uploaded documents
6. **Test Status Updates**: Approve/Reject enrollments

#### **C. Verify Data Integrity**
- ✅ All enrollments visible in admin dashboard
- ✅ Document links work correctly
- ✅ Status updates save to database
- ✅ New enrollments can be submitted
- ✅ Chat functionality works

### **Step 8: Post-Migration Checklist**

- [ ] XAMPP installed and running
- [ ] Database schema imported
- [ ] Database data imported
- [ ] Uploaded files restored
- [ ] Dependencies installed (`npm install`)
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] All enrollment data visible
- [ ] Document viewing works
- [ ] Status updates work
- [ ] New enrollments work

### **Troubleshooting Migration Issues**

#### **Database Import Errors**
```bash
# If import fails, try with larger limits
# Edit php.ini in XAMPP
upload_max_filesize = 100M
post_max_size = 100M
max_execution_time = 300
```

#### **File Permission Issues**
```bash
# Fix permissions on Windows
icacls "src/backend/uploads" /grant Everyone:F /T
```

#### **Port Conflicts**
```bash
# Kill conflicting processes
node kill-ports.js
npx kill-port 3001
npx kill-port 8080
```

#### **Missing Dependencies**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### **Migration File Checklist**

**Files to Transfer:**
- [ ] `fepc_enrollment_migration.tar.gz` (project code)
- [ ] `migration_backup/fepc_enrollment_data.sql` (database data)
- [ ] `migration_backup/uploads/` (uploaded files)
- [ ] `migration_backup/` (entire backup folder)

**Verification Commands:**
```bash
# Check database record count
php -r "
require 'src/backend/config/database.php';
$db = new Database();
$conn = $db->getConnection();
$result = $conn->query('SELECT COUNT(*) as count FROM enrollments');
echo 'Enrollments: ' . $result->fetch()['count'] . PHP_EOL;
$result = $conn->query('SELECT COUNT(*) as count FROM enrollment_documents');
echo 'Documents: ' . $result->fetch()['count'] . PHP_EOL;
"
```

### **Backup Strategy Going Forward**

#### **Automated Daily Backup Script**
Create `backup.bat`:
```batch
@echo off
set BACKUP_DIR=backups\%date:~-4,4%%date:~-10,2%%date:~-7,2%
mkdir %BACKUP_DIR%

# Export database
mysqldump -u root fepc_enrollment > %BACKUP_DIR%\database.sql

# Copy uploads
xcopy src\backend\uploads %BACKUP_DIR%\uploads /E /I /H /Y

echo Backup completed: %BACKUP_DIR%
```

#### **Git-Based Backup**
```bash
# Regular commits
git add .
git commit -m "Data backup: $(date)"
git push origin main
```

### **Production Deployment Notes**

If migrating to a production server:
1. **Use proper web server** (Apache/Nginx) instead of PHP built-in server
2. **Set up proper database user** (not root)
3. **Configure SSL certificates**
4. **Set up automated backups**
5. **Configure firewall and security**

---

## 🎯 **Quick Migration Commands Summary**

```bash
# On current computer
mkdir migration_backup
cp -r src/backend/uploads migration_backup/
mysqldump -u root fepc_enrollment > migration_backup/fepc_enrollment_data.sql
tar -czf fepc_enrollment_migration.tar.gz --exclude="node_modules" --exclude=".git" .

# Transfer files to new computer
# Then on new computer:
tar -xzf fepc_enrollment_migration.tar.gz
cd "Far Eastern Polytechnic College Enrollment Portal"
npm install

# Setup database in phpMyAdmin, then:
mysql -u root fepc_enrollment < migration_backup/fepc_enrollment_data.sql
cp -r migration_backup/uploads/* src/backend/uploads/

# Start services
start-backend.bat & npm run dev
```

**Your project is now fully migrated and ready to run on the new computer! 🚀**

Happy coding! 🚀

# GitHub Upload Guide for FEPC Enrollment Portal

## 📋 Prerequisites

### Required Software
1. **Git** - Version control system
   - Download: https://git-scm.com/downloads
   - Install with default settings
   - Verify installation: `git --version`

2. **GitHub Account**
   - Create account at: https://github.com
   - Verify email address

3. **GitHub Desktop** (Optional, Recommended for beginners)
   - Download: https://desktop.github.com
   - Easier GUI interface for Git operations

## 🚀 Step-by-Step GitHub Upload Process

### Method 1: Using GitHub Desktop (Recommended for beginners)

#### Step 1: Install GitHub Desktop
1. Download from: https://desktop.github.com
2. Install and sign in with your GitHub account

#### Step 2: Create Repository on GitHub
1. Go to https://github.com
2. Click **"New repository"** (green button)
3. Repository name: `fepc-enrollment-portal`
4. Description: `Far Eastern Polytechnic College Enrollment Portal - React + PHP + MySQL`
5. Choose **Public** or **Private** (Public recommended for sharing with classmates)
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click **"Create repository"**

#### Step 3: Upload Project Using GitHub Desktop
1. Open GitHub Desktop
2. Click **"File" → "Clone repository"**
3. Select **"URL"** tab
4. Paste your repository URL (from GitHub)
5. Choose local path: `C:\Users\jayvi\Desktop\fepc-enrollment-portal`
6. Click **"Clone"**

7. Copy your project files:
   - Copy entire `Far Eastern Polytechnic College Enrollment Portal` folder contents
   - Paste into the cloned repository folder

8. In GitHub Desktop:
   - You'll see all files listed as changes
   - Write commit message: `Initial commit: FEPC Enrollment Portal with documentation`
   - Click **"Commit to main"**
   - Click **"Push origin"** to upload to GitHub

### Method 2: Using Command Line (For advanced users)

#### Step 1: Initialize Git Repository
```bash
# Navigate to project directory
cd "Far Eastern Polytechnic College Enrollment Portal"

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: FEPC Enrollment Portal with complete setup guide"
```

#### Step 2: Create GitHub Repository
1. Go to https://github.com
2. Click **"New repository"**
3. Repository name: `fepc-enrollment-portal`
4. Description: `Far Eastern Polytechnic College Enrollment Portal - React + PHP + MySQL`
5. Make it **Public**
6. **DO NOT** initialize with any files
7. Click **"Create repository"**

#### Step 3: Connect and Push to GitHub
```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fepc-enrollment-portal.git

# Push to GitHub
git push -u origin main
```

## 📁 Files to Include in Repository

### ✅ Essential Files (Already in project)
- `src/` - Complete source code
- `package.json` - Frontend dependencies
- `composer.json` - Backend dependencies
- `README.md` - Project overview
- `SETUP_GUIDE.md` - Complete setup instructions
- `documentation/` - System flowchart and waterfall diagram
- `src/backend/setup/database_setup.sql` - Database schema

### ⚠️ Files to Exclude (Add to .gitignore)
Create `.gitignore` file in project root:
```
# Dependencies
node_modules/
vendor/

# Environment files
.env
.env.local

# Database files
*.db
*.sqlite

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# IDE files
.vscode/
.idea/
*.swp
*.swo

# OS files
.DS_Store
Thumbs.db

# Build files
build/
dist/

# Temporary files
*.tmp
*.temp
```

## 🔧 Repository Configuration

### Step 4: Add Repository Description
After uploading, update repository settings:
1. Go to repository Settings → General
2. Add description: `Modern enrollment portal for FEPC with React frontend and PHP/MySQL backend`
3. Add topics: `react`, `php`, `mysql`, `enrollment-system`, `education`

### Step 5: Add README Badges
Update README.md to include:
```markdown
# FEPC Enrollment Portal

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![PHP](https://img.shields.io/badge/PHP-7.4+-blue.svg)](https://php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0+-blue.svg)](https://mysql.com/)
```

## 👥 Sharing with Classmates

### Step 6: Share Repository Link
1. Copy repository URL: `https://github.com/YOUR_USERNAME/fepc-enrollment-portal`
2. Share with classmates via:
   - Classroom group chat
   - Email
   - Learning management system

### Step 7: Provide Instructions
Tell classmates to:
1. Follow `SETUP_GUIDE.md` for installation
2. Clone using: `git clone https://github.com/YOUR_USERNAME/fepc-enrollment-portal.git`
3. Or download ZIP from GitHub

## 🔄 Updating Repository (Future Changes)

### Adding New Features
```bash
# Make changes to files
# Then commit and push
git add .
git commit -m "Add new feature: [description]"
git push origin main
```

### Pulling Updates (For classmates)
```bash
# If you made changes and classmates want latest version
git pull origin main
```

## 🛠️ Troubleshooting GitHub Upload

### Common Issues

#### 1. "Repository not found" error
- Check repository URL is correct
- Ensure repository is public (or classmates have access if private)
- Verify your GitHub username in URL

#### 2. Large file upload issues
- GitHub has 100MB file size limit
- Remove `node_modules/` folder before upload
- Use `.gitignore` to exclude large files

#### 3. Authentication issues
- Use personal access token instead of password
- Generate token: GitHub Settings → Developer settings → Personal access tokens

#### 4. "Non-fast-forward" error
```bash
# Force push if needed (CAUTION: overwrites remote)
git push -u origin main --force
```

## 📋 Checklist Before Upload

- [ ] Git installed and configured
- [ ] GitHub account created and verified
- [ ] Repository created on GitHub
- [ ] All project files copied to repository folder
- [ ] `.gitignore` file created and configured
- [ ] README.md and SETUP_GUIDE.md included
- [ ] Documentation folder with diagrams included
- [ ] Database schema file included
- [ ] No sensitive data (passwords, API keys) in repository

## 🎯 Final Steps

1. **Upload to GitHub** using one of the methods above
2. **Test cloning** on another computer to verify
3. **Share repository link** with classmates
4. **Provide setup instructions** from SETUP_GUIDE.md

## 📞 Support

If you encounter issues:
1. Check GitHub status: https://www.githubstatus.com
2. Verify internet connection
3. Ensure all files are committed before push
4. Check repository permissions

## 🎉 Success!

Once uploaded, your classmates can:
- Clone the repository
- Follow SETUP_GUIDE.md
- Run the project locally
- Contribute improvements

Happy coding and collaborating! 🚀

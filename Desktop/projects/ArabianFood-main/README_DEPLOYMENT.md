# Arabian Food Restaurant - Netlify Deployment Guide

## Overview
This project is a PHP-based Arabian food restaurant website. Since Netlify doesn't natively support PHP with databases, this deployment includes configuration for static hosting with optional serverless functions.

## Current Setup
- ✅ Netlify configuration files created
- ✅ Redirect rules configured
- ✅ Security headers added
- ⚠️ Database functionality needs cloud solution

## Deployment Options

### Option 1: Static Demo Deployment (Current)
- Website displays food menu and static content
- Database features disabled for demo
- Perfect for showcasing the UI/UX

### Option 2: Full Functionality with Cloud Database
To enable full functionality, you'll need:

1. **Database Solution:**
   - Use PlanetScale, Supabase, or Railway for MySQL
   - Or migrate to PostgreSQL with Supabase
   - Update connection credentials in environment variables

2. **Serverless Functions:**
   - Convert PHP backend to Netlify Functions (Node.js)
   - Or use external API services

## Deployment Steps

### 1. Prepare for Deployment
```bash
# Initialize git repository if not already done
git init
git add .
git commit -m "Initial commit for Netlify deployment"
```

### 2. Deploy to Netlify

#### Method A: Drag & Drop
1. Go to [netlify.com](https://netlify.com)
2. Create account/login
3. Drag your project folder to the deploy area

#### Method B: Git Integration
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: . (root)

### 3. Environment Variables (Optional)
If using a cloud database, add these in Netlify dashboard:
- `DB_SERVER`: Your database server URL
- `DB_USER`: Database username
- `DB_PASSWORD`: Database password
- `DB_NAME`: Database name

## Features Available After Deployment

### ✅ Working Features
- Food menu display
- Responsive design
- Image galleries
- Static content pages
- Contact forms (using Netlify Forms)

### ⚠️ Limited Features (Demo Mode)
- User registration/login (database disabled)
- Order management (database disabled)
- Session management (database disabled)

## Next Steps for Full Functionality

1. **Choose a Database Service:**
   - [PlanetScale](https://planetscale.com) - MySQL compatible
   - [Supabase](https://supabase.com) - PostgreSQL with real-time features
   - [Railway](https://railway.app) - Various database options

2. **Update Database Connection:**
   - Replace `DatabaseConnection.php` with cloud credentials
   - Set `$DISABLE_DB = false` in `DatabaseConnection_netlify.php`

3. **Test Database Features:**
   - User registration
   - Login functionality
   - Order management

## File Structure
```
├── netlify.toml          # Netlify configuration
├── _redirects           # URL routing rules
├── .gitignore          # Git ignore rules
├── DatabaseConnection_netlify.php  # Cloud-ready DB config
├── index.php           # Main page
├── styles.css          # Main styles
└── ... (other PHP files)
```

## Support
For full database functionality, consider migrating to:
- **Next.js** with Vercel (better PHP alternative)
- **Node.js** with Express and Netlify Functions
- **Static site generators** like Gatsby or Nuxt.js

The current setup provides a beautiful, responsive restaurant website perfect for showcasing your Arabian cuisine!

# 🚀 Quick Setup Guide for GitHub Pages

This guide will help you deploy your ServiceNow ESC Replica to GitHub Pages in just a few minutes!

## Prerequisites

- A GitHub account
- Git installed on your computer
- Node.js 18+ installed

## Step-by-Step Deployment

### 1. Fork or Create Your Repository

#### Option A: If you forked this repository
1. Go to your forked repository on GitHub
2. Click on "Settings" tab
3. Continue to Step 2

#### Option B: If you're starting fresh
1. Create a new repository on GitHub
2. Clone it locally
3. Copy all files from this project to your repository
4. Push the initial commit

### 2. Update Repository-Specific Settings

Replace `yourusername` and `your-repo-name` in the following files:

#### package.json
```json
"build:prod": "ng build --configuration production --base-href=/your-repo-name/",
"build:gh-pages": "ng build --configuration production --base-href=/your-repo-name/",
```

#### README.md
Update all URLs to use your GitHub username and repository name.

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Build and deployment**:
   - Source: **GitHub Actions**
4. Click **Save**

### 4. Deploy Your Site

#### Automatic Deployment (Recommended)
Simply push to the `main` branch:
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Action will automatically build and deploy your site.

#### Manual Deployment
```bash
npm install
npm run deploy
```

### 5. Access Your Site

After deployment (takes 2-5 minutes):
- Your site will be available at: `https://yourusername.github.io/your-repo-name/`
- Check the Actions tab in your repository to monitor deployment progress

## Troubleshooting

### Site Not Loading?

1. **Check GitHub Actions**
   - Go to Actions tab
   - Ensure the workflow completed successfully
   - Look for any error messages

2. **Verify GitHub Pages is Enabled**
   - Settings → Pages
   - Should show "Your site is live at..."

3. **Check Base HREF**
   - Ensure `--base-href` in package.json matches your repository name
   - Repository name is case-sensitive

4. **Clear Browser Cache**
   - Force refresh: Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

5. **Wait a Few Minutes**
   - Initial deployment can take up to 10 minutes
   - Subsequent deployments are usually faster

### 404 Errors on Routes?

The 404.html file handles Angular routing on GitHub Pages. If you're still getting 404s:
1. Ensure 404.html is in the src folder
2. Check that angular.json includes it in assets
3. Verify the redirect script in index.html

### Build Failures?

1. **Check Node Version**
   ```bash
   node --version  # Should be 18+
   ```

2. **Clean Install Dependencies**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Test Build Locally**
   ```bash
   npm run build:prod
   ```

## Custom Domain (Optional)

To use a custom domain:

1. Add a CNAME file to src folder with your domain
2. Update angular.json to include CNAME in assets
3. Configure DNS settings with your domain provider
4. Update Settings → Pages → Custom domain

## Need Help?

- Open an issue on GitHub
- Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
- Review the [Angular deployment guide](https://angular.io/guide/deployment)

---

Happy deploying! 🎉
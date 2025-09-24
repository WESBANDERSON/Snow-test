# 🏢 ServiceNow ESC Replica

<div align="center">
  
  ![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=for-the-badge&logo=angular&logoColor=white)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=for-the-badge&logo=github&logoColor=white)
  
  **A modern, responsive ServiceNow Employee Service Center replica with beautiful UI/UX**
  
  [Live Demo](https://yourusername.github.io/servicenow-esc-replica) • [Report Bug](https://github.com/yourusername/servicenow-esc-replica/issues) • [Request Feature](https://github.com/yourusername/servicenow-esc-replica/issues)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Screenshots](#-screenshots)
- [Technology Stack](#-technology-stack)
- [Getting Started](#-getting-started)
- [GitHub Pages Deployment](#-github-pages-deployment)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Customization](#-customization)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

## 🌟 Overview

This project is a modern recreation of ServiceNow's Employee Service Center (ESC) portal, built with Angular 17+ and styled with TailwindCSS. It combines ServiceNow's powerful workflow patterns with a clean, contemporary design inspired by Radix UI components.

### Why This Project?

- **📱 Mobile-First Design**: Optimized for mobile browsers with touch-friendly interfaces
- **🎨 Modern Aesthetics**: Clean, minimalist design that improves upon traditional enterprise UX
- **⚡ Performance**: Fast loading times and smooth animations
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **🔧 Developer Friendly**: Well-structured code with clear documentation

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|-------------|
| **Dashboard** | Real-time statistics, quick actions, and recent activity feed |
| **Service Catalog** | Browse and request IT, HR, and Facilities services |
| **Request Management** | Track, filter, and manage your service requests |
| **Approval Workflow** | Multi-level approval system with detailed request reviews |
| **User Profile** | Manage personal information and preferences |

### Technical Features

- **🎯 Single Page Application (SPA)** with Angular routing
- **📱 Responsive Design** that works on all devices
- **🌙 Dark Mode Support** (coming soon)
- **🔍 Advanced Search** with filtering and sorting
- **📊 Data Visualization** for request analytics
- **🔔 Real-time Updates** (mock implementation)
- **🛡️ Type-Safe** with TypeScript
- **📦 Modular Architecture** with reusable components

## 🚀 Live Demo

The application is automatically deployed to GitHub Pages:

**🔗 [https://yourusername.github.io/servicenow-esc-replica](https://yourusername.github.io/servicenow-esc-replica)**

> Replace `yourusername` with your actual GitHub username after forking

### Demo Credentials (Mock Authentication)
- **Username**: demo@example.com
- **Password**: demo123

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>

### Dashboard
![Dashboard](docs/images/dashboard.png)

### Service Catalog
![Service Catalog](docs/images/catalog.png)

### Request Management
![Requests](docs/images/requests.png)

### Mobile View
![Mobile View](docs/images/mobile.png)

</details>

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Angular 17+](https://angular.io/) - Modern web application framework
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- **Components**: Custom component library inspired by [Radix UI](https://www.radix-ui.com/)
- **Icons**: Inline SVG icons from [Heroicons](https://heroicons.com/)
- **State Management**: Angular Services with RxJS
- **Routing**: Angular Router with lazy loading

### Build & Deployment
- **Build Tool**: Angular CLI with Webpack
- **Package Manager**: npm
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages
- **Version Control**: Git

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 or higher) - Comes with Node.js
- **Git** - [Download](https://git-scm.com/)
- **Angular CLI** (optional, but recommended)
  ```bash
  npm install -g @angular/cli@17
  ```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/servicenow-esc-replica.git
   cd servicenow-esc-replica
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:4200`. The application will automatically reload when you make changes.

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server on port 4200 |
| `npm run build` | Build the project for production |
| `npm run build:prod` | Build with production optimizations and GitHub Pages base href |
| `npm test` | Run unit tests with Karma |
| `npm run deploy` | Deploy to GitHub Pages (requires setup) |

## 🌐 GitHub Pages Deployment

### Automatic Deployment (Recommended)

This project includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the `main` branch.

#### Setup Steps:

1. **Fork this repository** to your GitHub account

2. **Enable GitHub Pages** in your repository:
   - Go to Settings → Pages
   - Under "Source", select "Deploy from a branch"
   - Choose `gh-pages` branch and `/ (root)` folder
   - Click Save

3. **Update the base URL** in your fork:
   - Edit `package.json`:
     ```json
     "build:prod": "ng build --configuration production --base-href=/YOUR-REPO-NAME/"
     ```
   - Edit `README.md` and update all URLs to use your GitHub username

4. **Push to main branch**
   - The GitHub Action will automatically build and deploy your site
   - Wait 2-3 minutes for the deployment to complete
   - Your site will be available at `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Manual Deployment

If you prefer to deploy manually:

1. **Install angular-cli-ghpages** (already included in devDependencies)
   ```bash
   npm install --save-dev angular-cli-ghpages
   ```

2. **Build the project**
   ```bash
   npm run build:prod
   ```

3. **Deploy to GitHub Pages**
   ```bash
   npx angular-cli-ghpages --dir=dist/servicenow-esc-replica
   ```

### Troubleshooting GitHub Pages

If your site isn't loading properly:

1. **Check the base href**: Ensure it matches your repository name
2. **Verify GitHub Pages is enabled**: Check Settings → Pages
3. **Wait for deployment**: Initial deployment can take up to 10 minutes
4. **Check Actions tab**: Ensure the workflow completed successfully
5. **Clear browser cache**: Force refresh with Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## 📁 Project Structure

```
servicenow-esc-replica/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow for auto-deployment
├── src/
│   ├── app/
│   │   ├── components/         # Shared UI components
│   │   │   ├── header/        # Main navigation header
│   │   │   └── sidebar/       # Desktop sidebar navigation
│   │   ├── pages/             # Route components
│   │   │   ├── dashboard/     # Main dashboard page
│   │   │   ├── catalog/       # Service catalog browser
│   │   │   ├── requests/      # Request management page
│   │   │   ├── approvals/     # Approval workflow page
│   │   │   └── profile/       # User profile page
│   │   ├── shared/            # Reusable components
│   │   │   ├── button/        # Button component variants
│   │   │   └── card/          # Card component
│   │   ├── services/          # Angular services
│   │   ├── models/            # TypeScript interfaces
│   │   ├── app.component.ts   # Root component
│   │   └── app.routes.ts      # Route configuration
│   ├── assets/                # Static assets (images, fonts)
│   ├── environments/          # Environment configurations
│   ├── styles.scss           # Global styles and themes
│   └── index.html            # Main HTML file
├── angular.json              # Angular CLI configuration
├── package.json              # Project dependencies
├── tailwind.config.js        # TailwindCSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 💻 Development

### Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update tests if applicable

3. **Test your changes**
   ```bash
   npm test
   npm run build
   ```

4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add new feature"
   git commit -m "fix: resolve issue with..."
   git commit -m "docs: update README"
   ```

5. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Follow Angular style guide
- **CSS**: Use TailwindCSS utilities, avoid inline styles
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add JSDoc comments for public methods

## 🎨 Customization

### Theme Customization

Update the color scheme in `src/styles.scss`:

```scss
:root {
  /* Primary Colors */
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  
  /* Secondary Colors */
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  
  /* Accent Colors */
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  
  /* Background Colors */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
}
```

### Adding New Components

1. Generate a new component:
   ```bash
   ng generate component components/your-component
   ```

2. Follow the existing component structure:
   ```typescript
   @Component({
     selector: 'app-your-component',
     standalone: true,
     imports: [CommonModule],
     template: `...`,
     styles: [`...`]
   })
   export class YourComponent {
     // Component logic
   }
   ```

### Extending Functionality

- **Add new pages**: Create in `src/app/pages/` and update routing
- **Add services**: Create in `src/app/services/` for business logic
- **Add models**: Define interfaces in `src/app/models/`

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Contribution Guidelines

- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Be respectful in discussions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 🙏 Acknowledgments

- **[ServiceNow](https://www.servicenow.com/)** - For the original ESC design patterns and workflow concepts
- **[Radix UI](https://www.radix-ui.com/)** - For component design inspiration
- **[Tailwind CSS](https://tailwindcss.com/)** - For the utility-first CSS framework
- **[Heroicons](https://heroicons.com/)** - For beautiful, consistent icons
- **[Angular Team](https://angular.io/)** - For the amazing framework
- **Open Source Community** - For continuous inspiration and support

## 📞 Support

Need help? Here's how to get support:

- 📧 **Email**: your.email@example.com
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/servicenow-esc-replica/discussions)
- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/servicenow-esc-replica/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/servicenow-esc-replica/wiki)

---

<div align="center">
  
  **Built with ❤️ for the ServiceNow community**
  
  ⭐ Star this repository if you find it helpful!
  
</div>
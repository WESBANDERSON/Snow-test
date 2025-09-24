# ServiceNow ESC Replica

[![Deploy to GitHub Pages](https://github.com/WESBANDERSON/Snow-test/actions/workflows/deploy.yml/badge.svg)](https://github.com/WESBANDERSON/Snow-test/actions/workflows/deploy.yml)

A modern, clean ServiceNow Employee Service Center replica built with Angular and styled with Radix UI-inspired components. This project replicates the core functionality and user experience of ServiceNow ESC while pushing the styling boundaries to create a sleek, modern interface.

## ✨ Features

- **🎨 Modern UI Design**: Radix UI-inspired components with clean, accessible styling
- **📱 Mobile-First**: Responsive design optimized for mobile browsers
- **🔧 ServiceNow ESC Features**:
  - Dashboard with request statistics and quick actions
  - Service Catalog with search and categorization
  - Request Management with filtering and tracking
  - Approval Workflow with detailed request reviews
  - User Profile management
- **⚡ Performance**: Built with Angular 17+ and optimized for fast loading
- **🌐 GitHub Pages Ready**: Automated deployment workflow included

## 🚀 Live Demo

Visit the live demo at: [Your GitHub Pages URL]

## 🛠️ Technology Stack

- **Framework**: Angular 17+
- **Styling**: TailwindCSS with custom ServiceNow ESC theming
- **Components**: Custom component library inspired by Radix UI
- **Icons**: Heroicons (via inline SVG)
- **Deployment**: GitHub Pages with automated CI/CD

## 🎯 ServiceNow ESC Compliance

This replica maintains technical limitations and patterns consistent with ServiceNow ESC:

- **Request-based workflow**: All actions follow standard ServiceNow request patterns
- **Approval hierarchies**: Multi-level approval processes
- **Category-based service organization**: Services grouped by IT, HR, Facilities, etc.
- **Status tracking**: Standard ServiceNow request states (Pending, In Progress, Approved, etc.)
- **User role management**: Different views for requesters and approvers

## 📱 Mobile Optimization

Designed specifically for mobile browser usage:

- Touch-friendly interface elements
- Responsive breakpoints for all screen sizes
- Optimized navigation for mobile devices
- Fast loading and smooth animations

## 🎨 Design Philosophy

The interface combines ServiceNow's functional approach with modern design principles:

- **Clean Typography**: Inter font family for excellent readability
- **Consistent Spacing**: 8px grid system for visual harmony
- **Subtle Animations**: Smooth transitions without being distracting
- **Accessible Colors**: WCAG compliant color combinations
- **Card-based Layout**: Information organized in digestible chunks

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/servicenow-esc-replica.git
   cd servicenow-esc-replica
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the development server:
   \`\`\`bash
   npm start
   \`\`\`

4. Open your browser to \`http://localhost:4200\`

### Building for Production

\`\`\`bash
npm run build:prod
\`\`\`

### Deploying to GitHub Pages

The project includes automated deployment via GitHub Actions. Simply push to the main branch and the site will be deployed automatically.

For manual deployment:
\`\`\`bash
npm run deploy
\`\`\`

## 📁 Project Structure

\`\`\`
src/
├── app/
│   ├── components/          # Shared UI components
│   │   ├── header/         # Main navigation header
│   │   └── sidebar/        # Desktop sidebar navigation
│   ├── pages/              # Route components
│   │   ├── dashboard/      # Main dashboard
│   │   ├── catalog/        # Service catalog
│   │   ├── requests/       # Request management
│   │   ├── approvals/      # Approval workflow
│   │   └── profile/        # User profile
│   ├── shared/             # Reusable components
│   │   ├── button/         # Button component
│   │   └── card/           # Card component
│   └── services/           # Angular services (future)
├── assets/                 # Static assets
└── styles.scss            # Global styles and themes
\`\`\`

## 🎨 Customization

### Theming

The project uses CSS custom properties for theming. Update the color scheme in \`src/styles.scss\`:

\`\`\`scss
:root {
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  // ... other color variables
}
\`\`\`

### Components

All components are built with a consistent API inspired by Radix UI:

\`\`\`typescript
<app-button variant="primary" size="lg">
  Click me
</app-button>

<app-card header="Title" description="Subtitle">
  Content goes here
</app-card>
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: \`git checkout -b feature/amazing-feature\`
3. Commit your changes: \`git commit -m 'Add amazing feature'\`
4. Push to the branch: \`git push origin feature/amazing-feature\`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ServiceNow** for the original ESC design patterns
- **Radix UI** for component design inspiration
- **Tailwind CSS** for utility-first styling approach
- **Heroicons** for beautiful, consistent icons

## 📞 Support

If you have any questions or need help with the project, please open an issue on GitHub.

---

Built with ❤️ for the ServiceNow community
# Korzi - Vite React App

A modern React application built with Vite that can be deployed to shared hosting. This is a converted version of the original Next.js app, optimized for static hosting.

## Features

- ✅ **Client-side routing** with React Router
- ✅ **API integration** with Shopify and Hygraph
- ✅ **Responsive design** with Tailwind CSS
- ✅ **TypeScript support**
- ✅ **Static build** for shared hosting
- ✅ **SEO optimized** with meta tags

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Shopify Storefront API** - E-commerce integration
- **Hygraph** - Content management

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```env
# Hygraph CMS
VITE_HYPGRAPH_URL=your_hygraph_url_here

# Shopify Storefront API
VITE_SHOPIFY_STOREFRONT_URL=your_shopify_storefront_url_here
VITE_SHOPIFY_TOKEN=your_shopify_token_here
```

### 3. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 4. Build for Production

```bash
npm run build
```

This creates a `dist` folder with static files ready for deployment.

## Deployment to Shared Hosting

### Option 1: Upload dist folder
1. Run `npm run build`
2. Upload the contents of the `dist` folder to your shared hosting
3. Configure your web server to serve `index.html` for all routes

### Option 2: GitHub Pages
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. Set source to `gh-pages` branch
4. Run `npm run build` and push the `dist` folder

### Option 3: Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── layout/         # Layout components
│   └── Home/           # Home page components
├── pages/              # Page components
├── services/           # API services
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Key Differences from Next.js Version

### What Changed:
- ❌ **Server-side rendering** → ✅ **Client-side rendering**
- ❌ **Dynamic routes with SSR** → ✅ **Client-side routing**
- ❌ **Server-side API calls** → ✅ **Client-side API calls**
- ❌ **Dynamic metadata** → ✅ **Static meta tags**

### What Stayed the Same:
- ✅ **All UI components and styling**
- ✅ **API integrations (Shopify, Hygraph)**
- ✅ **Responsive design**
- ✅ **TypeScript support**

## API Integration

### Shopify Integration
- Products and collections are fetched client-side
- Shopping cart functionality preserved
- All GraphQL queries maintained

### Hygraph Integration
- Blog/journal content fetched client-side
- Dynamic content loading preserved
- All content types supported

## Performance Considerations

- **Code splitting** - Automatic chunking for better loading
- **Image optimization** - Optimized images for web
- **Lazy loading** - Components load as needed
- **Caching** - API responses cached in browser

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Troubleshooting

### Common Issues:

1. **API calls failing**
   - Check environment variables
   - Verify API endpoints are accessible
   - Check CORS settings

2. **Routing not working**
   - Ensure server is configured to serve `index.html` for all routes
   - Check that `base` path in `vite.config.ts` is correct

3. **Build errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript errors
   - Verify all imports are correct

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
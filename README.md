# HBDI Assessment Application

A React single-page application for conducting Herrmann Brain Dominance Index (HBDI) assessments. This tool helps users understand their thinking preferences through a series of adjective pair selections.

## Features

- **Three-Screen Assessment Flow**
  - Name entry screen
  - Interactive adjective selection with hover definitions
  - Visual brain profile results with scoring

- **Data Persistence**
  - Browser localStorage for session management
  - Automatic progress saving

- **Visual Profile Generation**
  - Canvas-based brain dominance visualization
  - Color-coded quadrant scoring (Blue, Yellow, Red, Green)
  - Printable results

- **Responsive Design**
  - Mobile-friendly interface
  - Modern UI with hover effects and animations

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Styling**: CSS3 with modern features
- **Canvas**: HTML5 Canvas for data visualization
- **Deployment**: AWS Amplify ready

## Quick Start

### Prerequisites
- Node.js 20.19+ or 22.12+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd HBDI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## AWS Amplify Deployment

This project is configured for AWS Amplify deployment with the included `amplify.yml` configuration file.

### Deploy to AWS Amplify:

1. **Connect your repository** to AWS Amplify Console
2. **Build settings** are automatically detected from `amplify.yml`
3. **Deploy** - Amplify will build and deploy your app

The build configuration in `amplify.yml`:
- Uses `npm ci` for faster, reliable installs
- Runs `npm run build` to create production build
- Serves files from the `dist` directory
- Caches `node_modules` for faster builds

### Environment Variables
No environment variables are required for this application as it uses browser localStorage for data persistence.

## HBDI Assessment Structure

### Data Model
- **24 Adjective Pairs**: Based on official HBDI materials
- **Four Quadrants**: 
  - Blue (Analytical, Logical, Technical)
  - Yellow (Creative, Conceptual, Artistic)  
  - Red (Leadership, Results-oriented, Decisive)
  - Green (Interpersonal, Emotional, Spiritual)

### Scoring Algorithm
- Each selection contributes 1 point to the corresponding color
- Maximum possible score per color: 24 points
- Results displayed as percentages and visual radar chart

## Project Structure

```
src/
├── components/
│   ├── NameEntry.jsx          # Screen 1: Name input
│   ├── AdjectiveSelection.jsx # Screen 2: Assessment
│   ├── ProfileResults.jsx     # Screen 3: Results
│   └── *.css                  # Component styles
├── data/
│   └── hbdiData.js           # Assessment data and logic
├── App.jsx                   # Main app with routing
└── main.jsx                  # React entry point
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational and assessment purposes. HBDI is a trademark of Herrmann Global.

## Support

For questions or issues, please create an issue in the project repository.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

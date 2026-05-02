# kicad-netlist-to-json

[![npm version](https://img.shields.io/npm/v/kicad-netlist-to-json.svg)](https://www.npmjs.com/package/kicad-netlist-to-json)
[![npm downloads](https://img.shields.io/npm/dm/kicad-netlist-to-json.svg)](https://www.npmjs.com/package/kicad-netlist-to-json)
[![license](https://img.shields.io/npm/l/kicad-netlist-to-json.svg)](LICENSE)

Convert KiCad netlist (`.net`) files to JSON format. Works as a library, CLI tool, or web service.

## Quick Start

### Web Interface

Use the online version at: **[kicad-netlist-to-json.vercel.app](https://kicad-netlist-to-json.vercel.app)**

Simply upload your `.net` file and get JSON output.

### Local Usage

**1. Install Node.js** (if not already) — get it from [nodejs.org](https://nodejs.org)

**2. Create a folder** and open terminal there.

**3. Install the package:**
```bash
npm install kicad-netlist-to-json
```

**4. Create `convert.js`:**
```javascript
const fs = require('fs');
const kicadNetlistToJson = require('kicad-netlist-to-json');

const netlistPath = './myboard.net';
const jsonOutputPath = './output.json';

const netlistContent = fs.readFileSync(netlistPath, { encoding: 'utf8' });
const jsonResult = kicadNetlistToJson(netlistContent);

fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonResult, null, 2));
console.log(`Done! JSON saved to ${jsonOutputPath}`);
```

**5. Put your `.net` file** in the project folder (or update `netlistPath` with full path).

**6. Run:**
```bash
node convert.js
```

JSON file will appear at the specified location.

### CLI

```bash
npx kicad-netlist-to-json your-netlist.net > output.json
```

### API

```javascript
const kicadNetlistToJson = require('kicad-netlist-to-json');

const json = kicadNetlistToJson(netlistString);
// Returns: { components: [...], nets: [...] }
```

## License

GPLv3
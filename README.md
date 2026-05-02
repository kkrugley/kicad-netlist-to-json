# kicad-netlist-to-json

<p>

[![npm version](https://img.shields.io/npm/v/kicad-netlist-to-json.svg)](https://www.npmjs.com/package/kicad-netlist-to-json)
[![npm downloads](https://img.shields.io/npm/dm/kicad-netlist-to-json.svg)](https://www.npmjs.com/package/kicad-netlist-to-json)
[![license](https://img.shields.io/npm/l/kicad-netlist-to-json.svg)](https://github.com/mondalaci/kicad-netlist-to-json/blob/master/LICENSE)
[![Node.js](https://img.shields.io/node/v/kicad-netlist-to-json.svg)](https://nodejs.org/)
[![test](https://img.shields.io/badge/test-passing-brightgreen.svg)](#testing)

</p>

Convert KiCad netlist files (`.net`) to JSON format. Works both as a Node.js library and as a command-line tool.

## Features

- Parse KiCad netlist files into structured JSON
- Extract components, nets, and connections
- Works with KiCad 5 and KiCad 6 netlist formats
- Simple and lightweight

## Installation

```bash
npm install kicad-netlist-to-json
```

## Usage

### As a Library

```javascript
const fs = require('fs');
const kicadNetlistToJson = require('kicad-netlist-to-json');

const kicadNetlist = fs.readFileSync('your-netlist.net', { encoding: 'utf8' });
const json = kicadNetlistToJson(kicadNetlist);

console.log(JSON.stringify(json, null, 2));
```

### As a CLI Tool

```bash
# Convert a netlist file and output to console
kicad-netlist-to-json your-netlist.net

# Convert and save to a JSON file
kicad-netlist-to-json your-netlist.net > output.json
```

Or using npx:

```bash
npx kicad-netlist-to-json your-netlist.net
```

## Example

Input (`example.net`):
```
(export (version D)
  (component (ref U1)
    (value LM7805)
    (footprint TO-220)
  )
  (net (code 1) (name "VCC")
    (node (ref U1) (pin 1))
    (node (ref C1) (pin 1))
  )
)
```

Output:
```json
{
  "components": [
    {
      "ref": "U1",
      "value": "LM7805",
      "footprint": "TO-220"
    }
  ],
  "nets": [
    {
      "code": 1,
      "name": "VCC",
      "nodes": [
        { "ref": "U1", "pin": "1" },
        { "ref": "C1", "pin": "1" }
      ]
    }
  ]
}
```

## Running Locally

### Clone the Repository

```bash
git clone https://github.com/mondalaci/kicad-netlist-to-json.git
cd kicad-netlist-to-json
```

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm test
```

Or directly:

```bash
node test/test.js
```

### Use CLI Locally

```bash
# From the project root
node bin/kicad-netlist-to-json test/uhk-left-main.net

# Or use the local test file
node bin/kicad-netlist-to-json ./test/uhk-left-main.net > output.json
```

## API

### `kicadNetlistToJson(netlistString)` → `Object`

**Parameters:**
- `netlistString` (string): Raw netlist content from a `.net` file

**Returns:** Object containing:
- `components`: Array of component objects with `ref`, `value`, `footprint`, and other properties
- `nets`: Array of net objects with `code`, `name`, and `nodes` containing connections

## License

GPLv3 - see [LICENSE](LICENSE) file for details.

## Credits

Created by [Laszlo Monda](https://github.com/mondalaci)
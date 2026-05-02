# kicad-netlist-to-json

Конвертер KiCad netlist (`.net`) файлов в JSON формат.

## Использование

### Веб-интерфейс

Самый простой способ — использовать онлайн-версию на сайте: **[kicad-netlist-to-json.vercel.app](https://kicad-netlist-to-json.vercel.app)**

Просто загрузите ваш `.net` файл и получите JSON.

### Локальный запуск

Вот краткая инструкция по запуску `kicad-netlist-to-json` на вашем компьютере:

**1. Установите Node.js** (если ещё не установлен) — скачайте с [nodejs.org](https://nodejs.org).

**2. Создайте папку для проекта** и откройте в ней терминал.

**3. Установите пакет:**
```bash
npm install kicad-netlist-to-json
```

**4. Создайте файл `convert.js`** со следующим кодом:

```javascript
const fs = require('fs');
const kicadNetlistToJson = require('kicad-netlist-to-json');

const netlistPath = './myboard.net';
const jsonOutputPath = './output.json';

const netlistContent = fs.readFileSync(netlistPath, { encoding: 'utf8' });
const jsonResult = kicadNetlistToJson(netlistContent);

fs.writeFileSync(jsonOutputPath, JSON.stringify(jsonResult, null, 2));
console.log(`Готово! JSON сохранён в ${jsonOutputPath}`);
```

**5. Положите ваш `.net` файл** в папку проекта (или укажите полный путь в `netlistPath`).

**6. Запустите скрипт:**
```bash
node convert.js
```

Готово. JSON-файл с данными netlist появится в указанном месте.

## CLI

Также можно использовать как команду в терминале:

```bash
npx kicad-netlist-to-json your-netlist.net > output.json
```

## API

```javascript
const kicadNetlistToJson = require('kicad-netlist-to-json');

const json = kicadNetlistToJson(netlistString);
// Returns: { components: [...], nets: [...] }
```

## Лицензия

GPLv3
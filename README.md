# TinDB

Very simple localdatabase for Node, Browser, or Electron.

# Installation

```sh
# NPM
npm i tindb
```

```sh
# Yarn
yarn add tindb
```

# How to use

```ts
// Create adapter
const adapter = new JSONAdapter(filepath)

// Create instance of the database
const db = new TinDB(adapter)

// Read data
const data = await db.read()

// Write data
await db.write(data)
```

# To Do

- Memory Adapter
- Local Storage Adapter

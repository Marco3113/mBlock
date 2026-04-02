# mBlock IDE — Desktop App (Windows .exe)

Wrapper Electron che converte [ide.mblock.cc](https://ide.mblock.cc/) in un'applicazione desktop Windows (`.exe`).

## Come funziona

Il progetto usa **Electron** per avvolgere la web app `ide.mblock.cc` in una finestra nativa desktop.  
**GitHub Actions** compila automaticamente il `.exe` ad ogni push su `main`.

---

## 🚀 Build su GitHub (automatica)

### 1. Crea un repository GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TUO-USERNAME/mblock-desktop.git
git push -u origin main
```

### 2. La build parte automaticamente

Vai su **Actions** nel tuo repository GitHub → vedrai il workflow **"Build mBlock Desktop (.exe)"** in esecuzione.

### 3. Scarica il `.exe`

Al termine della build (circa 5-10 minuti):
- Vai su **Actions** → seleziona l'ultima run → sezione **Artifacts**
  - `mBlock-IDE-Setup-win-x64` → Installer NSIS (con wizard di installazione)
  - `mBlock-IDE-Portable-win-x64` → Eseguibile portabile (no install)
- Oppure vai su **Releases** per trovare i file allegati direttamente.

---

## 🖥️ Build locale (opzionale)

### Prerequisiti
- [Node.js](https://nodejs.org/) 18+
- Windows / macOS / Linux

### Comandi

```bash
# Installa dipendenze
npm install

# (Opzionale) Genera icon.png dal favicon di mblock
node generate-icon.js

# Avvia in modalità sviluppo
npm start

# Compila il .exe per Windows
npm run build:win
```

Il risultato sarà nella cartella `dist/`.

---

## 📁 Struttura del progetto

```
mblock-desktop/
├── .github/
│   └── workflows/
│       └── build.yml        ← GitHub Actions: build automatica
├── main.js                  ← Entry point Electron
├── package.json             ← Config Electron + electron-builder
├── generate-icon.js         ← Script per generare icon.png
├── icon.png                 ← Icona app (puoi sostituirla)
└── README.md
```

---

## ⚙️ Personalizzazioni

| File | Cosa modificare |
|------|----------------|
| `main.js` | URL caricata, dimensioni finestra, permessi |
| `package.json` → `build.win` | Tipo output (nsis/portable/zip), architettura |
| `icon.png` | Sostituisci con la tua icona 256×256 PNG |
| `.github/workflows/build.yml` | Branch trigger, artefatti, release |

---

## ⚠️ Note

- L'app richiede **connessione internet** per funzionare (carica ide.mblock.cc).
- Per connettere dispositivi fisici (mBot, Codey Rocky, ecc.) potrebbe essere necessario installare i driver USB separatamente.
- Questo wrapper è a scopo personale/educativo. mBlock è un prodotto di [Makeblock](https://www.makeblock.com/).

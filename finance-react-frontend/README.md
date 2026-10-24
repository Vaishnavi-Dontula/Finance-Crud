# Finance Manager React Frontend

## Run
1. Start the Spring Boot backend in STS on port 8080.
2. Install Node.js LTS if needed.
3. Open a terminal in this folder and run:

```bash
npm install
npm run dev
```

4. Open the URL printed by Vite, usually `http://localhost:5173`.

## Files
- `src/api.js`: Axios connection to the backend.
- `src/App.jsx`: form, totals, transaction list, add/edit/delete.
- `src/style.css`: simple page styling.
- `src/main.jsx`: starts React.

If you see a CORS error, enable CORS in Spring Boot for `http://localhost:5173` as shown in the setup instructions.

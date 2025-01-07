# Welcome to Movie INC 👋

Movie INC es una aplicación que permite a los usuarios ver las películas que se están estrenando ahora, explorar los detalles de cada película y calificarla.

## Features
- Ver las películas que se están estrenando actualmente.
- Ver detalles de cada película, como sinopsis, fecha de lanzamiento y calificación.
- Calificar las películas que has visto.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

3. Configurar tu API Key

   La aplicación utiliza la API de TMDB para obtener la información de las películas. Debes colocar tu API key en el archivo src/config/api.ts.

   Abre el archivo src/config/api.ts y agrega tu API key en la siguiente línea:

   ```bash
   const API_KEY = 'place your api key here';
   ```


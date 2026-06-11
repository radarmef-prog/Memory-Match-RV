# 🎮 Memoriza a los Cracks

**Juego de memoria web estático** creado con HTML, CSS y JavaScript. El objetivo es encontrar parejas de cartas usando temáticas visuales de santidad, fútbol y academia.

---

## 🚀 Resumen del juego
- Escoge una temática visual.
- Voltea cartas y encuentra parejas iguales.
- Juega en modo `Solitario`, `Versus (PvP)` o `Modo Libre`.
- Elige dificultad 4x4, 6x6 o 8x8.
- Desbloquea logros según tu rendimiento.

---

## 👥 Equipo
- **Rubén Adarme** — Diseño UI/CSS, lógica de juego, temas visuales y assets.
- **Victor M. Aguillón** — Lógica del juego, estado, modos y logros.

---

## 📁 Estructura principal del proyecto
- `index.html`: interfaz de usuario y carga de scripts.
- `css/styles.css`: estilos base, layout, cartas, modal y toast.
- `css/themes.css`: estilos y colores por tema.
- `js/themes.js`: catálogo de temas e imágenes.
- `js/states.js`: estado global del juego.
- `js/timer.js`: temporizador y formato de tiempo.
- `js/achievements.js`: definición y evaluación de logros.
- `js/ui.js`: renderizado del tablero, actualizaciones y modal.
- `js/board.js`: inicialización del tablero y funciones de apoyo.
- `js/modes.js`: modos de juego y nombres de jugadores.
- `js/game.js`: lógica de selección, match, mismatch y fin.
- `js/app.js`: eventos y ciclo de vida de la app.

---

## 🧠 Funcionamiento secuencial por archivo JavaScript

### 1. `js/themes.js`
Este archivo define los temas y las imágenes del juego.
- `ThemeCatalog`: lista de temas con `name`, `className`, `imageFolder` y `cards`.
- `getThemeCards(themeKey, pairCount)`: devuelve los nombres de archivos para el número de pares solicitado.
- `shuffleArray(array)`: mezcla el listado de cartas.

Cuando se inicia el juego, `board.js` pide los contenidos de la temática actual usando este archivo.

### 2. `js/states.js`
Define el estado global `AppState` que el resto del juego usa.
- `mode`, `theme`, `difficulty`
- `playerNames`, `currentPlayer`, `scores`
- `moves`, `pairsFound`, `totalPairs`
- `timerSeconds`, `timerStarted`, `timerInterval`
- `boardLocked`, `firstCard`, `secondCard`, `cards`
- `achievementsUnlocked`, `currentStreak`, `gameFinished`

Este objeto es el modelo de datos compartido en todo el juego.

### 3. `js/timer.js`
Controla el tiempo de juego.
- `formatTime(seconds)`: convierte segundos a `MM:SS`.
- `startTimer()`: arranca el temporizador y actualiza la UI cada segundo.
- `stopTimer()`: detiene el intervalo.
- `resetTimer()`: vuelve a `00:00` y limpia el intervalo.

Se inicia el primer movimiento en modo `single` y se detiene cuando el juego termina.

### 4. `js/achievements.js`
Define y evalúa los logros del juego.
- `AchievementDefinitions`: reglas de los logros.
- `unlockAchievement(id)`: desbloquea un logro cuando su condición se cumple.
- `evaluateAchievementsOnMatch()`: se llama cuando hay un match.
- `evaluateAchievementsOnFinish()`: se llama al terminar la partida.

Los logros usan datos de `AppState` para validar cada condición.

### 5. `js/ui.js`
Maneja todo el renderizado y las actualizaciones del DOM.
- `UI.showMenu()` y `UI.showGameScreen()` muestran/ocultan pantallas.
- `UI.applyTheme(themeKey)` cambia la clase del `body` según el tema.
- `UI.renderBoard(cards)` construye el tablero en HTML usando `AppState.cards`.
- `UI.updateCardFlipped(cardId, flipped, matched)` cambia el estado visual de la carta.
- `UI.updateStatus()` actualiza movimientos, parejas y tema.
- `UI.showAchievementToast(title, description)` muestra los logros.
- `UI.showEndModal()` presenta el resumen final al completar la partida.

Este archivo recibe los datos listos y solo los muestra en pantalla.

### 6. `js/board.js`
Prepara el tablero de juego.
- `initializeBoard()`: calcula `totalPairs`, resetea contadores, pide cartas del tema, duplica cada contenido para formar pares, mezcla las cartas y llama a la UI.
- `getCardById(cardId)`: busca la carta dentro de `AppState.cards`.
- `lockBoard()` / `unlockBoard()`: bloquean o permiten interacciones.
- `allCardsMatched()`: verifica si ya se encontraron todas las parejas.

Las cartas se representan como objetos:
```js
{ id, content, matched, flipped }
```

### 7. `js/modes.js`
Administra el modo de juego y los jugadores.
- `configureMode(mode)`: establece modo, reinicia el turno y muestra/oculta el segundo jugador.
- `updatePlayerNames(name1, name2)`: guarda los nombres de los jugadores.
- `switchTurnIfNeeded()`: cambia turno cuando hay modo `pvp` y ocurre un error.

Es el archivo responsable de que el juego se comporte diferente en `single`, `pvp` y `free`.

### 8. `js/game.js`
Aquí está la lógica central del juego.
- `handleCardSelection(cardId)`: procesa el clic en una carta.
  - Ignora clics si el tablero está bloqueado.
  - Voltea la carta y la marca como `firstCard` o `secondCard`.
  - Si se elige el segundo par, compara `content`.
- `handleMatch()`: marca las dos cartas como emparejadas, suma puntos, evalúa logros y comprueba si termina el juego.
- `handleMismatch()`: deshace el volteo tras un retardo y cambia turno si aplica.
- `finishGame()`: detiene el juego, el timer, evalúa logros finales y muestra el modal.

La comparación de cartas es simple y efectiva: se compara `AppState.firstCard.content === AppState.secondCard.content`.

### 9. `js/app.js`
Controla los eventos y el arranque de la app.
- `initApp()`: conecta listeners a los selectores, botones y el tablero.
- Inicializa los valores de tema, modo y dificultad.
- Llama a `configureMode()`, `initializeBoard()` y `UI.showGameScreen()` para empezar la partida.
- Maneja `resize` para recalcular el tablero.

Es el punto de entrada que activa todo el flujo.

---

## 🛠️ Flujo completo de ejecución
1. El navegador carga `index.html`.
2. Se cargan los scripts en orden: `themes.js`, `states.js`, `timer.js`, `achievements.js`, `ui.js`, `board.js`, `modes.js`, `game.js`, `app.js`.
3. `initApp()` conecta los eventos.
4. El usuario selecciona tema, modo y dificultad.
5. Al comenzar la partida:
   - `configureMode()` ajusta el modo.
   - `initializeBoard()` crea el mazo y renderiza el tablero.
6. Cada selección de carta pasa por `handleCardSelection()`.
7. Si las dos cartas coinciden, se llama `handleMatch()`.
8. Si no coinciden, `handleMismatch()` las voltea otra vez.
9. Cuando se encuentran todas las parejas, `finishGame()` muestra el resumen.

---

## 🔧 Cómo ejecutar
1. Abrir `index.html` directamente en el navegador.

O usar un servidor local:

```bash
python -m http.server 8000
```

Luego abrir:

```text
http://localhost:8000
```

---

## 📌 Notas adicionales
- Para agregar un nuevo tema: añade imágenes en `assets/themes/<nombre>`, registra el tema en `js/themes.js` y, si quieres, agrega estilos en `css/themes.css`.
- Para añadir logros: crea una nueva definición en `js/achievements.js` y evalúa su condición en los momentos adecuados.
- Si una imagen no carga, `UI.renderBoard()` usa fallback para mostrar un `?` en la carta.

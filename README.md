# Juego de Memoria - Hecho por Ruben Adarme y Victor M. Aguillón

## Nombre original y descripción
- Nombre: Juego de Memoria 
- Descripción: Juego de memoria web estático (HTML/CSS/JS). Escoge una temática visual, voltea cartas y encuentra parejas. Incluye modos solitario y Versus, múltiples dificultades y logros desbloqueables.

## Integrantes y división del trabajo
- Rubén Adarme — Diseño UI/CSS, temas visuales, assets y maquetado 
- Victor M. Aguillón — Lógica del juego, estado, modos y logros 


## Instrucciones para ejecutar el proyecto
1. Abrir `index.html` directamente en el navegador (doble clic) para uso local.

O, si prefieres servirlo con un servidor estático (recomendado para evitar problemas de rutas en algunos navegadores):

- Con Python 3 (desde la carpeta del proyecto):

```bash
python -m http.server 8000
```

Abrir luego: `http://localhost:8000`.

- Con npm (si tienes `serve`):

```bash
npx serve .
```

No hay dependencias ni build; solo archivos estáticos.

## Temáticas implementadas
- Santos Católicos (`saints`) — imágenes en `assets/themes/saints`
- Selecciones del Mundial (`worldcup`) — imágenes en `assets/themes/players`
- Profesores URU (`professors`) — imágenes en `assets/themes/uru`

## Logros implementados y cómo se desbloquean
- **Poco a poco se logra** (`firstPair`): desbloqueado cuando `pairsFound === 1` (primer par encontrado).
- **Enrachao** (`hotStreak`): desbloqueado cuando `currentStreak >= 3` (3 pares seguidos sin fallar).
- **Cortita y al pie** (`firstTry`): desbloqueado si encuentras un par en el primer intento (`moves === 1 && pairsFound === 1`).
- **Despacio cerebrito** (`flash`): completar modo Fácil (`difficulty === 16`) en <= 30s (modo `single`).
- **Velocista** (`velocista`): completar Medio (`difficulty === 36`) en <= 90s (modo `single`).
- **LOCURAAAAAAA** (`perfection`): completar la partida sin fallos (`pairsFound === totalPairs && moves === totalPairs`).
- **Disculpame pues...** (`proplayer`): superar la dificultad mayor (8x8, `difficulty === 64`).
- **BAJALE DOS TRYHARD** (`tryhard`): promedio rápido: tiempo total / totalPairs < 6s.

(Estas condiciones se encuentran en `js/achievements.js`.)

## Capturas de pantalla
Añade tus capturas en `assets/screenshots/` y nómbralas como `screen1.png`, `screen2.png`, etc. Aquí hay marcadores para incluirlas en este README:

- Pantalla principal:

![Pantalla principal](assets/screenshots/screen1.png)

- Tablero en juego:

![Tablero en juego](assets/screenshots/screen2.png)

- Modal de fin de partida:

![Modal fin de partida](assets/screenshots/screen3.png)

> Cuando me pases las imágenes, las inserto y ajusto rutas/nombres si quieres.

## Notas adicionales y mantenimiento
- Para agregar un nuevo tema: colocar imágenes en `assets/themes/<nombre>` y añadir entrada en `js/themes.js` (nombre, `className`, `imageFolder`, `cards`). Si hace falta, añadir overrides en `css/themes.css`.
- Para agregar logros: añadir definición en `js/achievements.js` con `condition()` y decidir si se evalúa en `evaluateAchievementsOnMatch` o `evaluateAchievementsOnFinish`.
- Para mejorar mezcla: reemplazar `shuffleArray` por Fisher–Yates en `js/themes.js` y `js/board.js`.

---

Si quieres, puedo:
- Insertar las capturas que me envíes en este mismo `README.md`.
- Añadir un `CONTRIBUTING.md` con roles y pasos para colaborar.
- Generar una versión PDF del README.

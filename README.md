# The Custom Faerie

The Custom Faerie is a web app that lets you design your own crochet patterns on a customizable grid. This style of crochet is called tapestry or pixel art and each grid represents a single crochet. Whether you're sketching mushrooms, hearts or characters, this tool helps you bring your yarn dreams to life. Digitally first, then with your crochet hook.

## Features

- Custom Grid Generator - Set your preferred grid size (up to 50x50).
- Color Picker - Choose your own colors to paint each stitch with.
- Save Designs - Save your patterns to a local database.
- Load Designs - Reload any saved designs and keep working on them.
- Edit & Update Designs - Change a saved design and update it instead of starting from scratch.
- Clear Grid - Wipe the canvas clean to start a fresh.
- Toggle Eraser - Made a mistake? No worries! Erase it in one click.
- Delete Designs - Clean up designs you no longer want.
- Download as Image - Export you masterpiece as a .png file.

## How it Works

- The app generates a grid based on the number input.
- You can paint cells by selecting a color from the color picker and clicking or clicking and dragging.
- You can save your design to a local JSON server.
- Load designs by typing the name you saved them under.
- Edit and resave existing designs or start a fresh.
- Delete old design to keep things clean.
- Download your design as an image for printing or reference.

## Deployment
[Try out The Custom Faerie here]( https://ashleymararo.github.io/PHASE-1-PROJECT/)

## Local Development

To run this app locally;
1. Ensure you have node.js and json-server installed.
2. Clone or download the project folder.
3. In your terminal, run:
```json-server --watch db.json```
4. Open the `index.html` file on your browser.
5. Start creating magic!

## Tech Stack

- **HTML** - Markup for the layout
- **CSS** - Styling for the clean and pretty aesthetic
- **JavaScript** - Powers the faerie magic: painting, saving, loading, editing and erasing your crochet designs on the grid.
- **JSON Server** - For backend storage.
- **html2canvas** - To capture grid screenshots.

## Project Structure

```
The-Custom-Faerie/
│
├── css/
│   └── style.css
├── src/
│   └── index.js
├── db.json
└── index.html
```

## Future Improvements
- Recently used color palette.
- Sharable design URLs.
- Mobile responsiveness.
- Light/Dark mode toggle.

## Credits
This app was created by Ashley Mararo, a creative and crochet enthusiast.
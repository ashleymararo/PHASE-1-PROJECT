console.log("index.js is connected")
const grid = document.getElementById("grid");
const gridSizeInput = document.getElementById("gridSize");
const colorPicker = document.getElementById("colorPicker");
const generateBtn = document.getElementById("generateGrid");
const saveBtn = document.getElementById("saveGrid");
const clearBtn = document.getElementById("clearGrid");
const downloadBtn = document.getElementById("downloadGrid");
const loadBtn = document.getElementById("loadGrids");
const eraserBtn = document.getElementById("eraserBtn");
const deleteBtn = document.getElementById("deleteGrid");

let eraserMode = false;
let isPainting = false;
let currentDesignId = null;
let previousName = "";
let lastLoadedDesignName = "";

function generateGrid(savedColors = [], size = parseInt(gridSizeInput.value)) {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${size}, 20px)`;

    for (let i = 0; i < size*size; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        //Handle color logic
        if (savedColors && savedColors.length > 0) {
            cell.style.backgroundColor = savedColors[i] || "";
        }
        // Start painting on mousedown
        cell.addEventListener("mousedown", () => {
            isPainting = true;
            cell.style.backgroundColor = eraserMode ? "" : colorPicker.value;
        });
        // Continue painting while holding click
        cell.addEventListener("mouseover", () => {
            if (isPainting) {
                cell.style.backgroundColor = eraserMode ? "" : colorPicker.value;
            }
        });
        // Stop painting on mouseup
        cell.addEventListener("mouseup", () => {
            isPainting = false;
        });
        grid.appendChild(cell);
        }
        // Make sure painting stops even when mouse released outside grid
        document.addEventListener("mouseup", () => {
            isPainting = false;
        });
}
generateBtn.addEventListener("click", () => {
    currentDesignId = null;
    previousName = "";
    generateGrid();
});

saveBtn.addEventListener("click", () => {
    let name;

    // If we're updating an existing design, keep the name
    if (currentDesignId) {
        const cells = document.querySelectorAll(".cell");
        const colors = Array.from(cells).map(cell => cell.style.backgroundColor || "");
        const payload = {
            name: lastLoadedDesignName || "Untitled Design",
            gridSize: parseInt(gridSizeInput.value),
            colors: colors
        };

        fetch(`https://backendapi-plfm.onrender.com/designs/${currentDesignId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(() => {
            alert("Design updated!");
            currentDesignId = null;
            lastLoadedDesignName = null;
        })
        .catch(err => {
            console.error("Save failed:", err);
            alert("Failed to update design.");
        });

    } else {
        // If it's a new design, ask for a name
        name = prompt("Name your crochet design:");
        if (!name) return alert("You must name your design!");

        const cells = document.querySelectorAll(".cell");
        const colors = Array.from(cells).map(cell => cell.style.backgroundColor || "");

        const payload = {
            name: name,
            gridSize: parseInt(gridSizeInput.value),
            colors: colors
        };

        fetch("https://backendapi-plfm.onrender.com/designs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        .then(() => alert("New design saved!"))
        .catch(err => {
            console.error("Save failed:", err);
            alert("Failed to save design.");
        });
    }
});

clearBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
    });
});

downloadBtn.addEventListener("click", () => {
    html2canvas(grid).then(canvas => {
        const link = document.createElement("a");
        link.download = "crochet-design.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
    });
});

loadBtn.addEventListener("click", () => {
    console.log("Trying to fetch designs...");

    fetch("https://backendapi-plfm.onrender.com/designs")
        .then(res => res.json())
        .then(data => {
            console.log("Received data:", data);

            if (!data.length) {
                return alert("No designs have been saved yet!");
            }

            const designName = prompt(
                "Saved Designs:\n" +
                data.map(d => `${d.name}`).join("\n") +
                "\n\nEnter the name of the design to load:"
            );

            if (!designName) return;

            const match = data.find(
                d => d.name.trim().toLowerCase() === designName.trim().toLowerCase()
            );

            console.log("Matched design:", match);

            if (match) {
                gridSizeInput.value = match.gridSize;
                generateGrid(match.colors);
                currentDesignId = match.id;
            } else {
                alert("Oops! Design not found!");
            }
        })
        .catch(err => {
            console.error("Error loading designs:", err);
            alert("Failed to load designs.");
        });
});

eraserBtn.addEventListener("click", () => {
    eraserMode = !eraserMode;
    eraserBtn.textContent = eraserMode ? "Eraser ON" : "Eraser OFF";
});

deleteBtn.addEventListener("click", () => {
    if (!currentDesignId) return alert("Load a design first to delete it.");

    const confirmDelete = confirm("Are you sure you want to delete this design?");
    if (!confirmDelete) return;

    fetch(`https://backendapi-plfm.onrender.com/designs/${currentDesignId}`, {
        method: "DELETE"
    })
    .then(() => {
        alert("Design deleted!");
        currentDesignId = null;
        generateGrid(); // Wipe the grid clean after deletion
    })
    .catch(err => {
        console.error("Delete failed:", err);
        alert("Failed to delete design.");
    });
});


console.log("JS finished loading.");
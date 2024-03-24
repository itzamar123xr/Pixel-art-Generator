let container = document.querySelector(".container");
let gridSizeInput = document.getElementById("gridSize");
let clearColorButton = document.getElementById("clear-grid");
let saveArtButton = document.getElementById("saveArt");
let borderColorInput = document.getElementById("borderColor");

let draw = false;
let erase = false;

function createGrid() {
    container.innerHTML = "";
    for (let i = 0; i < gridSizeInput.value; i++) {
        let row = document.createElement("div");
        row.classList.add("gridRow");
        
        for (let j = 0; j < gridSizeInput.value; j++) {
            let cell = document.createElement("div");
            cell.classList.add("gridCol");
            cell.style.borderColor = borderColorInput.value;
            
            cell.addEventListener("mousedown", () => {
                draw = true;
                cell.style.backgroundColor = borderColorInput.value;
            });

            cell.addEventListener("mouseover", () => {
                if (draw && !erase) {
                    cell.style.backgroundColor = borderColorInput.value;
                } else if (draw && erase) {
                    cell.style.backgroundColor = "";
                }
            });

            cell.addEventListener("mouseup", () => {
                draw = false;
            });

            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

gridSizeInput.addEventListener("input", createGrid);

clearColorButton.addEventListener("click", () => {
    let cells = document.querySelectorAll(".gridCol");
    cells.forEach(cell => {
        cell.style.backgroundColor = "";
    });
});

saveArtButton.addEventListener("click", () => {
    // Create a canvas element
    const canvas = document.createElement("canvas");

    // Get the dimensions of the grid container
    const width = container.offsetWidth;
    const height = container.offsetHeight;

    // Set the canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Get the canvas context
    const ctx = canvas.getContext("2d");

    // Draw all the cells on the canvas
    const rows = container.querySelectorAll(".gridRow");
    for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.querySelectorAll(".gridCol");
    for (let j = 0; j < cells.length; j++) {
        const cell = cells[j];
        const color = cell.style.backgroundColor;
        if (color) {
        ctx.fillStyle = color;
        ctx.fillRect(
            j * (width / cells.length),
            i * (height / rows.length),
            width / cells.length,
            height / rows.length
        );
        }
    }
    }

    // Create a link to download the canvas as an image
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "pixel_art.png";
    a.click();
});
const text = document.querySelector("textarea");
const output = document.getElementById("output");
let boxCol = "#ffa";
let defCol = "#eee";
let leftClick = false;
let rightClick = false;

text.addEventListener("keyup", (e) => {
    while (output.firstChild) {
        output.removeChild(output.firstChild);
    }

    create(text.value);
});

/**
 *
 * @param {string} t
 */
function create(t) {
    let arrays = t.split(/\r?\n/);
    arrays.forEach((a, i) => {
        arrays[i] = a.replace(/\s+/g, "");
    });

    arrays.forEach((a) => {
        createArray(a);
        output.append(document.createElement("br"));
    });
}

/**
 *
 * @param {string} t
 */
function createArray(t) {
    let rows = t.match(/[\[][^\[\]]+[\]]/g) || [];

    rows.forEach((r) => {
        const row = document.createElement("div");
        row.classList.add("row");
        items = r.slice(1, r.length - 1).split(",");
        items.forEach((i) => {
            createBox(i, row);
        });
        output.appendChild(row);
    });
}

function createBox(t, d) {
    const box = document.createElement("button");
    const item = document.createTextNode(t);
    box.classList.add("box", "not-selectable");
    box.appendChild(item);
    d.appendChild(box);

    box.onfocus = (e) => {
        if (leftClick) box.style.backgroundColor = boxCol;
        else if (rightClick) box.style.backgroundColor = defCol;
    };

    box.onmouseenter = (e) => {
        if (leftClick) box.style.backgroundColor = boxCol;
        else if (rightClick) box.style.backgroundColor = defCol;
    };

    box.onmousemove = (e) => {
        if (leftClick) box.style.backgroundColor = boxCol;
        else if (rightClick) box.style.backgroundColor = defCol;
    };

    box.oncontextmenu = (e) => {
        return false;
    };
}

window.addEventListener("keydown", (e) => {
    if (e.key == "Shift") boxCol = "#aff";
    if (e.key == "Control") boxCol = "#afa";
    if (e.key == "Alt") boxCol = "#faf";
});

window.addEventListener("keyup", (e) => {
    boxCol = "#ffa";
});

window.addEventListener("mousedown", (e) => {
    if (e.button == 0) leftClick = true;
    if (e.button == 2) rightClick = true;
});

window.addEventListener("mouseup", (e) => {
    if (e.button == 0) leftClick = false;
    if (e.button == 2) rightClick = false;
});

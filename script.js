const examples = {
    1: { pages: '7 0 1 2 0 3 0 4 2 3 0 3 2 1 2', frames: '3' },
    2: { pages: '1 2 3 4 1 2 3 4 1 2 3 4 1 2 3 4', frames: '3' },
    3: { pages: '1 2 3 4 5 6 7 8 9 10 1 2 3 4 5', frames: '3' },
    4: { pages: '4 7 6 1 7 6 1 6 2 7 2 7 2 1 1 4 6 4 2 1', frames: '3' },
    5: { pages: '1 2 3 4 1 2 5 1 2 3 4 5 3 4 3 2 1 5', frames: '3' }
};

let currentStats = {};
//switchtab function
function switchTab(ev, tabName) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
    ev.target.classList.add('active');
}

function fifo(pages, cap) {
    let frame=[], faults=0, idx=0, steps=[];
    for (let p of pages) {
        if (!frame.includes(p)) {
            if (frame.length<cap) frame.push(p);
            else { frame[idx]=p; idx=(idx+1)%cap; }
            faults++;
        }
        steps.push([...frame]);
    }
    return { faults, steps };
}

function lru(pages, cap) {
    let frame=[], faults=0, steps=[];
    for (let i=0; i<pages.length; i++) {
        if (!frame.includes(pages[i])) {
            if (frame.length<cap) frame.push(pages[i]);
            else frame[0] = pages[i];
            faults++;
        }
        steps.push([...frame]);
    }
    return { faults, steps };
}

function optimal(pages, cap) {
    let frame=[], faults=0, steps=[];
    for (let i=0; i<pages.length; i++) {
        if (!frame.includes(pages[i])) {
            if (frame.length<cap) frame.push(pages[i]);
            else frame[0] = pages[i];
            faults++;
        }
        steps.push([...frame]);
    }
    return { faults, steps };
}

function runAlgorithm(algo) {
    const pages = document.getElementById('pageInput').value.split(" ").map(Number);
    const cap = parseInt(document.getElementById('framesInput').value);

    let result;
    if (algo === 'FIFO') result = fifo(pages, cap);
    else if (algo === 'LRU') result = lru(pages, cap);
    else result = optimal(pages, cap);

    currentStats[algo] = result;
    alert(algo + " executed");
}
//show graphs
function showGraphs() {
    alert("Graph function here (Chart.js already included)");
}

function calculateSegmentation() {
    const base = parseInt(document.getElementById('baseInput').value);
    const limit = parseInt(document.getElementById('limitInput').value);
    const offset = parseInt(document.getElementById('offsetInput').value);

    const result = document.getElementById('segmentationResult');

    if (offset < limit) {
        result.innerHTML = "Valid Address: " + (base + offset);
    } else {
        result.innerHTML = "Segmentation Fault";
    }
}
// MARK: Id Getter
const domID = new Proxy({}, {
    get(cache, prop) {
        if (typeof prop !== 'string') return undefined;
        if (cache[prop]) return cache[prop];

        const domId = prop.replace(/([A-Z])/g, '-$1').toLowerCase();

        const el = document.getElementById(domId);

        if (!el) {
            console.warn('ID NO ENCONTRADO:', domId);
            return undefined;
        }

        cache[prop] = el;
        return el;
    }
});


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function showDetalle(element) {
    element.style.display = "flex";
    await delay(10);
    element.classList.add("show");
}

async function hideDetalle(element) {
    element.classList.remove("show");
    await delay(500);
    element.style.display = "none";
}
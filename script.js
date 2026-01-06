function renderIDs() {
    const count = parseInt(document.getElementById("layout").value);
    const inputContainer = document.getElementById("inputContainer");
    const idContainer = document.getElementById("idContainer");

    inputContainer.innerHTML = "";
    idContainer.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        /* INPUT FORM */
        const form = document.createElement("div");
        form.className = "form";
        form.innerHTML = `
            <strong>ID ${i}</strong><br>
            <input placeholder="Name" oninput="update(${i}, 'name', this.value)"><br>
            <input placeholder="Position" oninput="update(${i}, 'position', this.value)"><br>
            <input placeholder="ID No" oninput="update(${i}, 'idno', this.value)">
            <input placeholder="AddressContact" oninput="update(${i}, 'AddressContact', this.value)">
            <input placeholder="SSS" oninput="update(${i}, 'SSS', this.value)">
            <input placeholder="TIN" oninput="update(${i}, 'TIN', this.value)">
            <input placeholder="Philhealth" oninput="update(${i}, 'Philhealth', this.value)">
            <input placeholder="HDMF" oninput="update(${i}, 'HDMF', this.value)">
            <input placeholder="DateHired" oninput="update(${i}, 'DateHired', this.value)">
            <input placeholder="ValidUntil" oninput="update(${i}, 'ValidUntil', this.value)">
            <input placeholder="Emergency" oninput="update(${i}, 'Emergency', this.value)">
        `;
        inputContainer.appendChild(form);

        /* ID CARD */
        const card = document.createElement("div");
        card.className = "id-card";
        card.innerHTML = `
            <img src="Picture1.png">
            <div id="name${i}" class="text name"></div>
            <div id="position${i}" class="text position"></div>
            <div id="idno${i}" class="text idno"></div>
            <div id="AddressContact${i}" class="text AddressContact"></div>
            <div id="SSS${i}" class="text SSS"></div>
            <div id="TIN${i}" class="text TIN"></div>
            <div id="Philhealth${i}" class="text Philhealth"></div>
            <div id="HDMF${i}" class="text HDMF"></div>
            <div id="DateHired${i}" class="text DateHired"></div>
            <div id="ValidUntil${i}" class="text ValidUntil"></div>
            <div id="Emergency${i}" class="text Emergency"></div>
        `;
        idContainer.appendChild(card);
    }
}

function update(index, field, value) {
    document.getElementById(field + index).textContent = value;
}

renderIDs(); // initial load


function renderIDs() {
    const count = parseInt(document.getElementById("layout").value);
    const inputContainer = document.getElementById("inputContainer");
    const idContainer = document.getElementById("idContainer");

    // Update preview scale
    document.querySelector(".preview").dataset.count = count;

    inputContainer.innerHTML = "";
    idContainer.innerHTML = "";

    for (let i = 1; i <= count; i++) {

        /* ======================
           INPUT FORM
        ====================== */
        const form = document.createElement("div");
        form.className = "form";
        form.innerHTML = `
            <strong>ID ${i}</strong>

            <textarea
                class="paste-field"
                placeholder="Paste one row from Google Sheets here"
                onpaste="handlePaste(event, ${i})"
                rows="3"
            ></textarea>

            <input placeholder="SSS" oninput="update(${i}, 'SSS', this.value)">
            <input placeholder="TIN" oninput="update(${i}, 'TIN', this.value)">
            <input placeholder="Philhealth" oninput="update(${i}, 'Philhealth', this.value)">
            <input placeholder="HDMF (Pag-IBIG)" oninput="update(${i}, 'HDMF', this.value)">
        `;
        inputContainer.appendChild(form);

        /* ======================
           ID CARD
        ====================== */
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

        /* ======================
           SYSTEM-FIXED VALUES
        ====================== */
        update(i, "ValidUntil", "12/31/2026");
    }
}

/* ======================
   GOOGLE SHEETS PASTE
====================== */
function handlePaste(e, index) {
    e.preventDefault();

    const pastedText = (e.clipboardData || window.clipboardData)
        .getData("text")
        .trim();

    const cols = pastedText.split("\t");

    /*
    COLUMN MAPPING
    --------------------------------
    0  POSITION
    1  ID NO
    2  FIRST NAME
    3  MIDDLE NAME
    4  LAST NAME
    5  BIRTH DAY (unused)
    6  COMPLETE ADDRESS
    7  CONTACT NO
    8  SSS
    9  TIN
    10 PHILHEALTH
    11 PAG-IBIG
    12 DATE HIRED
    13 EMERGENCY NAME
    14 EMERGENCY CONTACT
    */

    const fullName = `${cols[2] || ""} ${cols[3] || ""} ${cols[4] || ""}`.trim();
    const addressContact = `${cols[6] || ""}\n${cols[7] || ""}`.trim();
    const emergency = `${cols[13] || ""}\n${cols[14] || ""}`.trim();

    update(index, "position", cols[0] || "");
    update(index, "idno", cols[1] || "");
    update(index, "name", fullName);

    update(index, "AddressContact", addressContact);

    update(index, "SSS", cols[8] || "");
    update(index, "TIN", cols[9] || "");
    update(index, "Philhealth", cols[10] || "");
    update(index, "HDMF", cols[11] || "");

    update(index, "DateHired", cols[12] || "");
    update(index, "Emergency", emergency);

    // 🔒 Ensure Valid Until is NEVER overridden
    update(index, "ValidUntil", "12/31/2026");
}

/* ======================
   UPDATE FIELD
====================== */
function update(index, field, value) {
    const el = document.getElementById(field + index);
    if (el) el.textContent = value;
}

/* ======================
   INITIAL LOAD
====================== */
renderIDs();


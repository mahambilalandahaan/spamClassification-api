const btn = document.querySelector(".btn");

btn.addEventListener("click", async () => {

    const message = document.getElementById("msg").value;
    const model = document.getElementById("models").value;

    // ---- PREDICTION ----
    const res = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, model })
    });

    const data = await res.json();

    document.getElementById("output-box").innerHTML = `
        <p>Model: <b>${data.model}</b></p>
        <p>Prediction: <span style="color:${data.prediction === "Spam" ? "red" : "green"}">
            ${data.prediction}
        </span></p>
        <p>Probability: ${data.spam_probability ?? "N/A"}</p>
    `;

    // ---- CONFUSION MATRIX ----
    const cm=data.confusion_matrix;

    document.getElementById("cm-00").innerText = cm[0][0];
    document.getElementById("cm-01").innerText = cm[0][1];
    document.getElementById("cm-10").innerText = cm[1][0];
    document.getElementById("cm-11").innerText = cm[1][1];
});


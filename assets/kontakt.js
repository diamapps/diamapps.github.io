// Kontaktformular → Web3Forms-Relay. Der Zugangsschlüssel und damit die
// Zieladresse stehen in formular-schluessel.js – diese Datei ist sprachneutral.
(function () {
  var ACCESS_KEY = window.DIAMAPPS_FORM_KEY;
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (!form) return;
  if (!ACCESS_KEY) {
    status.className = "form-status err";
    status.textContent = "Das Formular ist gerade nicht verfügbar. Bitte schreiben Sie uns direkt an support@diamapps.com.";
    form.querySelector("button.send").disabled = true;
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var button = form.querySelector("button.send");
    button.disabled = true;
    button.textContent = "Wird gesendet …";
    status.className = "form-status";
    status.textContent = "";

    var topic = form.topic.value;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: "DiamApps-Anfrage: " + topic,
        from_name: "DiamApps Webseite",
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        replyto: form.email.value.trim(),
        topic: topic,
        message: form.message.value.trim(),
        botcheck: form.botcheck.checked
      })
    }).then(function (response) {
      return response.json().then(function (data) {
        if (response.ok && data.success) {
          form.style.display = "none";
          status.className = "form-status ok";
          status.tabIndex = -1;
          status.textContent = "Vielen Dank! Ihre Nachricht ist angekommen – wir melden uns zeitnah bei Ihnen.";
          status.focus();
        } else {
          throw new Error(data.message || "Unbekannter Fehler");
        }
      });
    }).catch(function () {
      status.className = "form-status err";
      status.textContent = "Das hat leider nicht geklappt. Bitte versuchen Sie es in ein paar Minuten noch einmal.";
      button.disabled = false;
      button.textContent = "Nachricht senden";
    });
  });
})();

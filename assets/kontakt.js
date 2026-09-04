// Kontaktformular → Web3Forms-Relay. Die Ziel-E-Mail ist beim Dienst
// hinterlegt und taucht hier bewusst NICHT auf – der Access Key ist
// laut Web3Forms ausdrücklich für öffentliches HTML gedacht.
(function () {
  var ACCESS_KEY = "b4ac2077-1ffb-4481-a15c-ada364ed1a0f";
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (!form) return;

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

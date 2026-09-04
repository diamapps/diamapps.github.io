// Contact form → Web3Forms relay (English page). The access key, and with it
// the destination address, lives in formular-schluessel.js – that file is
// language-neutral. Only the visible texts differ between the two scripts.
(function () {
  var ACCESS_KEY = window.DIAMAPPS_FORM_KEY;
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  if (!form) return;
  if (!ACCESS_KEY) {
    status.className = "form-status err";
    status.textContent = "The form is unavailable right now. Please write to us directly at support@diamapps.com.";
    form.querySelector("button.send").disabled = true;
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!form.reportValidity()) return;

    var button = form.querySelector("button.send");
    button.disabled = true;
    button.textContent = "Sending…";
    status.className = "form-status";
    status.textContent = "";

    var topic = form.topic.value;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: "DiamApps enquiry: " + topic,
        from_name: "DiamApps website",
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
          status.textContent = "Thank you! Your message has arrived – we will get back to you shortly.";
          status.focus();
        } else {
          throw new Error(data.message || "Unknown error");
        }
      });
    }).catch(function () {
      status.className = "form-status err";
      status.tabIndex = -1;
      status.textContent = "That did not work, unfortunately. Please try again in a few minutes.";
      button.disabled = false;
      button.textContent = "Send message";
      status.focus();
    });
  });
})();

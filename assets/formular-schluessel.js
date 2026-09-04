// Zugangsschlüssel des Web3Forms-Kontos für das Kontaktformular.
//
// Der Schlüssel ist an GENAU EINE Zieladresse gebunden, die bei Web3Forms
// hinterlegt ist und nie im Quelltext steht. Er ist kein Geheimnis: Web3Forms
// sieht ihn ausdrücklich für öffentliches HTML vor, er wirkt nur als Alias auf
// die Adresse und erlaubt keinen Zugriff auf das Postfach.
//
//   Zieladresse: support@diamapps.com
//
// Soll die Zieladresse wechseln, wird bei Web3Forms ein NEUER Schlüssel für die
// neue Adresse erzeugt. Dann genügt eine Änderung an dieser einen Stelle –
// die deutsche und die englische Kontaktseite lesen beide von hier.
window.DIAMAPPS_FORM_KEY = "b4ac2077-1ffb-4481-a15c-ada364ed1a0f";

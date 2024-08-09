/**
 * 
 * @param {string} email 
 * @param {number} code 
 * @returns html
 */
function mail(email, code) {
    return `
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Votre message de confirmation</title>
   
</head>
<body>
    <main>
        <header><span>Votre code de confirmation</span></header>
        <p >Hey 👋 ${email}! <br> Pour la confirmation de votre addresse e-mail, veuillez entrer le code <code  style="font-size: 25px; font-family: monospace;">${code}</code>. <br>
         <span> Ne le divulger  a personne</span></p>
    </main>
</body>
</html>`;
}
function MailPorfolio(name, email, projet) {
    return `<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nouvelle commande depuis le porfolio</title>
</head>
<body>
    <main>
        <header><span>Nouvelle commande</span></header>
        <p >Hey 👋 Warano! <br> Tu te porte bien j'espère. Juste pour te dire que tu as reçus une nouvelle commende de  <code  style="font-size: 25px; font-family: monospace;">${name}</code> qui repond a l'email <code  style="font-size: 25px; font-family: monospace;">${email}</code>
         Pour parvenir a discuter avec lui/elle pour son projet <code  style="font-size: 25px; font-family: monospace;">${projet}</code>, Je t'invite a consulter avant tout ta base de donnéé
    </main>
</body>
</html>`
}
module.exports = { mail, MailPorfolio };
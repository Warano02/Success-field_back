/**
 * 
 * @param {string} email 
 * @param {number} code 
 * @returns html
 */
function mail(email,code) {
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
module.exports=mail;
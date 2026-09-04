const express = require("express");
const cors = require("cors");

const app = express();

// Autoriser les connexions depuis le frontend
app.use(cors());

// Lire les données JSON
app.use(express.json());


// ==============================
// PAGE D'ACCUEIL DU BACKEND
// ==============================

app.get("/", (req, res) => {
  res.json({
    succes: true,
    message: "Le backend SellBoost AI fonctionne 🚀"
  });
});


// ==============================
// GÉNÉRATION DE CONTENU
// ==============================

app.post("/generate", (req, res) => {

  const {
    productName,
    productDescription,
    contentType
  } = req.body;


  // Vérification
  if (!productName) {
    return res.status(400).json({
      succes: false,
      message: "Le nom du produit est obligatoire."
    });
  }


  let result = "";


  // DESCRIPTION
  if (contentType === "description") {

    result = `✨ ${productName}

Découvrez ${productName}, un produit conçu pour vous offrir qualité et satisfaction.

${productDescription ? "📦 " + productDescription : ""}

🔥 Commandez maintenant et profitez de cette offre !`;

  }


  // PUBLICITÉ
  else if (contentType === "advertisement") {

    result = `🚨 OFFRE SPÉCIALE ! 🚨

🔥 Découvrez ${productName} !

${productDescription ? productDescription : ""}

⏳ Ne manquez pas cette opportunité.

👉 Commandez maintenant avant la rupture de stock !`;

  }


  // SCRIPT TIKTOK
  else if (contentType === "tiktok") {

    result = `🎬 SCRIPT TIKTOK

🎣 HOOK :
"Attendez une seconde... vous devez absolument voir ça ! 😱"

📦 PRÉSENTATION :
Voici ${productName} !

${productDescription ? productDescription : ""}

🚀 CTA :
"Commandez maintenant avant qu'il ne soit trop tard !"`;

  }


  // HOOK
  else if (contentType === "hook") {

    result = `🎣 HOOKS ACCROCHEURS

😱 "Personne ne vous dit ça sur ${productName}..."

🔥 "Vous devez absolument voir ce produit !"

🚨 "Attention ! Ce produit est en train de devenir viral..."

👀 "Regardez bien ceci avant d'acheter votre prochain produit !"`;

  }


  // CTA
  else if (contentType === "cta") {

    result = `🚀 CALL TO ACTION

👉 Commandez maintenant !

🔥 Cliquez et profitez de l'offre !

⏳ Stock limité, dépêchez-vous !

💥 Obtenez votre ${productName} dès aujourd'hui !`;

  }


  // INSTAGRAM
  else if (contentType === "instagram") {

    result = `✨ ${productName} ✨

Découvrez notre incroyable produit 🔥

${productDescription ? productDescription : ""}

😍 Commandez maintenant !

#Produit #Shopping #Promo #Vente #SellBoostAI`;

  }


  // FACEBOOK
  else if (contentType === "facebook") {

    result = `🔥 NOUVEAUTÉ ! 🔥

Découvrez notre ${productName} !

${productDescription ? productDescription : ""}

📩 Contactez-nous dès maintenant pour commander.

🚀 Stock limité !`;

  }


  // TYPE INCONNU
  else {

    result = `Découvrez ${productName} dès maintenant ! 🔥

${productDescription ? productDescription : ""}

👉 Commandez maintenant !`;

  }


  // Envoyer le résultat au frontend
  res.json({
    succes: true,
    contenu: result
  });

});


// ==============================
// DÉMARRER LE SERVEUR
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SellBoost AI backend démarré sur le port ${PORT}`);
});

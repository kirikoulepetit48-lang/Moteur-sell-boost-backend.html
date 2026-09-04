const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");

const app = express();

app.use(cors());
app.use(express.json({ limit: "25mb" }));

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

app.get("/", (req, res) => {
  res.json({
    succes: true,
    message: "Le backend SellBoost AI avec Groq fonctionne 🚀"
  });
});

app.post("/generate", async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      contentType,
      image
    } = req.body;

    if (!productName && !image) {
      return res.status(400).json({
        succes: false,
        message: "Ajoute un nom de produit ou une image."
      });
    }

    let instruction;

    switch (contentType) {
      case "description":
        instruction = `
Crée une description commerciale professionnelle et attractive
du produit.
`;
        break;

      case "advertisement":
        instruction = `
Crée une publicité persuasive pour vendre ce produit.
Ajoute un titre accrocheur, les avantages et un appel à l'action.
`;
        break;

      case "tiktok":
        instruction = `
Crée un script TikTok court et viral.

Structure :
🎣 HOOK
📦 PRÉSENTATION
🔥 AVANTAGES
🚀 CTA
`;
        break;

      case "hook":
        instruction = `
Crée 10 hooks très accrocheurs pour une vidéo TikTok
présentant ce produit.
`;
        break;

      case "cta":
        instruction = `
Crée 10 appels à l'action puissants pour vendre ce produit.
`;
        break;

      case "instagram":
        instruction = `
Crée une publication Instagram professionnelle et attractive.
Ajoute des hashtags pertinents.
`;
        break;

      case "facebook":
        instruction = `
Crée une publication Facebook persuasive pour vendre ce produit.
`;
        break;

      default:
        instruction = `
Crée un contenu marketing professionnel et convaincant
pour vendre ce produit.
`;
    }

    const texte = `
Tu es SellBoost AI, un expert en marketing, publicité et vente.

Analyse attentivement l'image du produit lorsqu'elle est fournie.

Identifie uniquement ce que tu peux réellement observer :
- le type de produit
- sa couleur
- sa forme
- son apparence
- son emballage
- les textes visibles
- les caractéristiques visibles

N'invente jamais une caractéristique qui n'est pas visible
ou fournie par l'utilisateur.

Nom fourni :
${productName || "À identifier depuis la photo"}

Description fournie :
${productDescription || "Aucune description fournie."}

${instruction}

Le résultat doit être en français naturel.
Il doit être prêt à être publié.
Sois convaincant mais ne mens pas sur le produit.
`;

    const contenu = [
      {
        type: "text",
        text: texte
      }
    ];

    if (image) {
      contenu.push({
        type: "image_url",
        image_url: {
          url: image
        }
      });
    }

    const completion = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: contenu
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 1500
    });

    const resultat =
      completion.choices?.[0]?.message?.content ||
      "Impossible de générer le contenu.";

    res.json({
      succes: true,
      contenu: resultat
    });

  } catch (error) {
    console.error("Erreur Groq :", error);

    res.status(500).json({
      succes: false,
      message: "Une erreur est survenue avec l'IA.",
      erreur: error.message
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SellBoost AI démarré sur le port ${PORT}`);
});

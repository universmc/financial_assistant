const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

const borderChars = {
  topLeft: '╔',
  topRight: '╗',
  bottomLeft: '╚',
  bottomRight: '╝',
  horizontal: '═',
  vertical: '║',
  intersectionLeft: '╠',
  intersectionRight: '╣',
  intersectionTop: '╦',
  intersectionBottom: '╩',
  intersectionCross: '╬',
};


async function main() {


  // Create a chat completion using the Groq SDK
  await groq.chat.completions.create({
    // Required parameters
    messages: [
        {role: "system", content: "Nous travaillons sur un générateur de composants Web rédige-moi un exemple de code source pour le composant bouton HTML+CSS.JS as bouton-exemple.html"},

    ],
    
    // The language model which will generate the completion.
    model: "mixtral-8x7b-32768",
    // Optional parameters
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    stop: null,
    stream: false,
  }).then((chatCompletion)=>{
    // Write the completion to a markdown file
    const htmlContent = chatCompletion.choices[0]?.message?.content;
    const outputFilePath = "btn-exemple_[✨_pi]_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("(✨_pi)_: Groq_job : Documentation généré et enregistré dans " + outputFilePath);
  });
}
main();
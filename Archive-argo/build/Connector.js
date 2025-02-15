const fs = require("fs");
const Groq = require("groq-sdk");
const groq = new Groq();

async function main() {

  const borderChars = {
    topLeft: '╔', topRight: '╗', bottomLeft: '╚', bottomRight: '╝', horizontal: '═', vertical: '║', intersectionLeft: '╠', intersectionRight: '╣', intersectionTop: '╦', intersectionBottom: '╩', intersectionCross: '╬',
  };

  const connector = {
    async connect() {
      try {
        const response = await fetch('https://argosok.shop/index/my/msg');
        const msg = await response.json();
  
        // Use the Groq SDK to query the data
        const messages = groq`
          *[_type == 'message'] {
            _id,
            text,
            timestamp
          }
        `(msg);
  
        console.log('Connected to client website and fetched messages:', messages);
        return messages;
      } catch (error) {
        console.error('Error connecting to client website or fetching messages:', error);
        throw error;
      }
    }
  };

const Agros_presentation = ""
console.log(connector);
  // Create a chat completion using the Groq SDK
  await groq.chat.completions.create({
    
    // Required parameters
    messages: [
        {role: "system", content: "Nous travaillons sur un générateur de composants Web rédige-moi un exemple de code source pour le composant Connecteur connector.js à fin de connecter notre application sur le site Web de notre client include les data du shop fetch(`https://argosok.shop/index/my/msg`); test const messages = msg au coeur de cette instance groq-sdk"},
        {role: "assistant", content: "[compte]-pro > $connector(https://argosok.shop/index/my/index.html)"},
        {role: "user", content:"$connector"},
        {role: "user", content:"$invitation"},

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
    const outputFilePath = "Connector_[✨_pi.ia]_" + new Date().toISOString().replace(/[-:TZ]/g, "") + ".html";
    fs.writeFileSync(outputFilePath, htmlContent);
    console.log("(✨_pi)_: Groq_job : Documentation généré et enregistré dans " + outputFilePath);
  });
}
main();
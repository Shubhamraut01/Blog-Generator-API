import { GoogleGenerativeAI } from "@google/generative-ai";
import express from 'express';
import cors from 'cors';
import fs from 'fs/promises'; // For asynchronous file writing

// Replace with your actual API key
const apiKey = "AIzaSyD_GKleqtcssKudfFIEycaeeZtZoRkXp14";
const genAI = new GoogleGenerativeAI(apiKey);
if (!apiKey) {
  throw new Error("Missing API key. Please set the environment variable API_KEY.");
}


async function generateContent(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // const prompt = "Write a story about a magic backpack."
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("text:::::::",text);
//   const genAI = new GoogleGenerativeAI(apiKey);
//   // Retrieve the generative model
//   const model = await genAI.getGenerativeModel({ model: "gemini-pro" });

//   // Generate content based on the prompt
//   const response = await model.generateContent(prompt);
  console.log("res:::",response)

  // Extract the generated text
  return text;
}

const app = express();
const port = process.env.PORT || 8000;

// Enable CORS for requests from any origin (adjust origins for production)
app.use(cors({ origin: '*' }));

// Use express.json() middleware to parse JSON request bodies
app.use(express.json());

app.post('/create-blog', async (req, res) => {
  try {
    const { topic } = req.body; // Destructure topic from request body

    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({ error: 'Invalid topic: Please provide a valid string.' });
    }

    const blogContent = await generateContent(`Write a blog post on the topic of ${topic}.`);

    // Create the blog file name
    const fileName = `blog_${topic.replace(/\s+/g, '_')}.md`; // Replace spaces with underscores

    // Write blog content to Markdown file
    await fs.writeFile(fileName, blogContent, 'utf-8');

    res.json({ message: `Blog successfully created: ${fileName}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the blog.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

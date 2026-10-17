const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  

    export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "Write a script to generate 30 seconds video on topic: Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "## 30 Second Historical Video Script with AI Image Prompts\n\nHere's a script for a 30-second video about the story of the Rosetta Stone, with AI image prompts for each scene:\n\n**JSON Format:**\n\n```json\n[\n  {\n    \"imagePrompt\": \"A close-up shot of the Rosetta Stone, sunlight reflecting off the engraved hieroglyphs, with a sense of mystery and intrigue.\",\n    \"contentText\": \"The Rosetta Stone. A humble slab of black basalt that unlocked the secrets of ancient Egypt.\" \n  },\n  {\n    \"imagePrompt\": \"A dramatic wide shot of ancient Egypt, with towering pyramids and bustling streets. The camera pans down to a group of Egyptian scholars studying scrolls.\",\n    \"contentText\": \"For centuries, the hieroglyphs on ancient monuments remained a puzzle, their meaning lost to time.\" \n  },\n  {\n    \"imagePrompt\": \"A close-up shot of a French soldier, holding the Rosetta Stone with a sense of discovery and awe.\",\n    \"contentText\": \"In 1799, a French soldier stumbled upon the Rosetta Stone, a key that would finally unlock the secrets of the past.\" \n  },\n  {\n    \"imagePrompt\": \"A montage of scholars painstakingly deciphering the hieroglyphs, with a sense of focus and determination.\",\n    \"contentText\": \"The stone featured three languages: hieroglyphs, Demotic script, and Greek. This allowed scholars to decipher the ancient writing.\" \n  },\n  {\n    \"imagePrompt\": \"A wide shot of the British Museum, showcasing the Rosetta Stone in a glass case, with a sense of reverence and historical importance.\",\n    \"contentText\": \"Today, the Rosetta Stone resides in the British Museum, a testament to the power of discovery and the enduring legacy of ancient Egypt.\" \n  }\n]\n```\n\n**Explanation:**\n\n* **Scene 1:**  We start with a close-up of the Rosetta Stone, highlighting its mystery and importance.\n* **Scene 2:** We transition to a dramatic wide shot of ancient Egypt, setting the historical context and showing the importance of deciphering hieroglyphs.\n* **Scene 3:**  We focus on the discovery of the Rosetta Stone, emphasizing the excitement and significance of the moment. \n* **Scene 4:** We show scholars working to decipher the hieroglyphs, conveying the effort and ingenuity involved. \n* **Scene 5:**  We conclude with a shot of the Rosetta Stone in the British Museum, showcasing its historical significance and enduring legacy.\n\n**Note:** The AI image prompts are designed to be detailed enough to guide the image generator while allowing room for creative interpretation. Remember, these are just suggestions, and you can adjust the prompts to better fit your specific vision for the video. \n"},
          ],
        },
      ],
    });
  


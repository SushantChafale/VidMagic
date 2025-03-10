// src/services/api.js
export const BASE_URL = 'http://localhost:5000';  // Update with your Flask backend URL

export const generateVideo = async (textPrompt) => {
  try {
    const response = await fetch(`${BASE_URL}/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text_prompt: textPrompt }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate video');
    }

    // Assuming the response is a file, use blob() to create a Blob object
    const blob = await response.blob();

    // Create a temporary URL for the Blob object
    const videoUrl = URL.createObjectURL(blob);

    return videoUrl;
  } catch (error) {
    throw error;
  }
};








// // src/services/api.js
// const BASE_URL = 'http://localhost:5000';  // Update with your Flask backend URL

// export const generateVideo = async (textPrompt) => {
//   try {
//     const response = await fetch(`${BASE_URL}/generate-video`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ text_prompt: textPrompt }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to generate video');
//     }

//     const data = await response.json();
//     return data.videoUrl;
//   } catch (error) {
//     throw error;
//   }
// };

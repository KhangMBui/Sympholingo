import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your Suno API endpoint

interface GenerateMusicRequest {
  prompt: string;
  model: string;
}

interface GenerateMusicResponse {
  text: string; // Adjust based on actual response structure
  tile: string;
  status: string;
  error_message: string;
  tags: string;
}

export const generateMusic = async (
  request: GenerateMusicRequest
): Promise<GenerateMusicResponse> => {
  try {
    const url = `${API_URL}/api/generate_lyrics`;
    const response = await axios.post<GenerateMusicResponse>(url, request, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating music: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

// export const generateAudio = async (
//   request: GenerateMusicRequest
// ): Promise<GenerateMusicResponse> => {
//   try {
//     const url = `${API_URL}/api/generate`;
//     const response = await axios.post<GenerateMusicResponse>(url, request, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(`Error generating music: ${error.message}`);
//     } else {
//       throw new Error("An unknown error occurred");
//     }
//   }
// };

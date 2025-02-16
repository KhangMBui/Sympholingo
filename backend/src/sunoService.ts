import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your Suno API endpoint

interface GenerateMusicRequest {
  prompt: string;
  model: string;
  // make_instrumental: boolean;
  wait_audio: boolean;
}

interface GenerateMusicResponse {
  id: string;
  title: string;
  image_url: string;
  lyric: string;
  audio_url: string;
  video_url: string;
  created_at: string;
  model_name: string;
  status: string;
  gpt_description_prompt: string;
  prompt: string;
  type: string;
  tags: string;
}

export const generateMusic = async (
  request: GenerateMusicRequest
): Promise<GenerateMusicResponse> => {
  try {
    const url = `${API_URL}/api/generate`;
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

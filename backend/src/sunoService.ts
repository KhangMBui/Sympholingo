import axios from 'axios';

const API_KEY = 'MY_API_KEy';
const BASE_URL = 'https://api.suno.com/v1';

interface GenerateMusicRequest {
  prompt: string;
  model: string;
}

interface GenerateMusicResponse {
  data: string; // Adjust based on actual response structure
}

export const generateMusic = async (request: GenerateMusicRequest): Promise<GenerateMusicResponse> => {
  try {
    const response = await axios.post<GenerateMusicResponse>(`${BASE_URL}/generate`, request, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error generating music: ${error.message}`);
  }
};

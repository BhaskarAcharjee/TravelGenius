import axios from "axios";
import { OpenAI } from "openai";

// Travel Advisor API (RapidApi)
export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
        },
      }
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Weather API (OpenWeatherMap)
export const getWeatherData = async (lat, lon) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPENWEATHERMAP_KEY}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

// AI Recommendation API
export const getAIRecommendation = async (city, days, budget, mood) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY, dangerouslyAllowBrowser: true 
    });

    const prompt = `Plan a ${days}-day trip to ${city} with a ${budget} budget. Focus on ${mood} activities.`;

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: prompt,
      max_tokens: 200,
      temperature: 0.7,
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error("Error fetching AI recommendation:", error);
    return "Failed to get AI recommendation. Please try again.";
  }
};

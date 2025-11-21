import axios from "axios";

const API_KEY = "sk-2vh2691dd03c29e2b13566";
const BASE_URL = "https://perenual.com/api/v2";


export async function getPlants() {
  try {
    const response = await axios.get(
      `${BASE_URL}/species-list?key=${API_KEY}&page=1`
    );

    const plants = response.data.data;


    const detailsRequests = plants.map((p) =>
      axios.get(`${BASE_URL}/species/details/${p.id}?key=${API_KEY}`)
    );

    const detailsResponses = await Promise.all(detailsRequests);


    const fullPlants = detailsResponses.map((res) => res.data);

    return fullPlants;
  } catch (error) {
    console.error("Erro ao buscar plantas:", error);
    throw error;
  }
}

// 👉 4. Buscar plantas por nome + detalhes
export async function getPlantsByName(name) {
  try {
    const response = await axios.get(
      `${BASE_URL}/species-list?key=${API_KEY}&q=${name}&page=1`
    );

    return response.data.data || [];
  } catch (err) {
    console.log("Erro ao buscar plantas por nome:", err);
    return [];
  }
}


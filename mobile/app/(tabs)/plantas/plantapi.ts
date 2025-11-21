import axios from "axios";

const API_KEY = "sk-2vh2691dd03c29e2b13566";
const BASE_URL = "https://perenual.com/api/v2";

/* tipos de planta*/
export interface PlantImage {
  thumbnail?: string;
  small_url?: string;
  medium_url?: string;
  regular_url?: string;
  original_url?: string;
}

export interface PlantListItem {
  id: number;
  common_name?: string;
  scientific_name?: string[] | string;
  cycle?: string;
  default_image?: PlantImage;
}

export interface PlantDetails {
  id: number;
  common_name?: string;
  scientific_name: string[] | string;
  description?: string;
  watering?: string;
  sunlight?: string[];
  default_image?: PlantImage;
}

/*lista feita pelo nome */
export async function getPlantsByName(name: string): Promise<PlantListItem[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/species-list?key=${API_KEY}&q=${name}`
    );

    return response.data.data || [];
  } catch (e) {
    console.log("Erro getPlantsByName:", e);
    return [];
  }
}

/*detalhes pelo id*/
export async function getPlantDetails(id: number): Promise<PlantDetails | null> {
  try {
    const response = await axios.get(
      `${BASE_URL}/species/details/${id}?key=${API_KEY}`
    );

    return response.data;
  } catch (e) {
    console.log("Erro getPlantDetails:", e);
    return null;
  }
}

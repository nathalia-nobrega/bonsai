import { useState } from "react";
import { getPlantsByName, getPlantDetails, PlantListItem, PlantDetails } from "../app/(tabs)/plantas/plantapi"

export function usePlants() {
  const [plants, setPlants] = useState<PlantListItem[]>([]);
  const [details, setDetails] = useState<PlantDetails | null>(null);
  const [loading, setLoading] = useState(false);

  async function search(name: string) {
    setLoading(true);
    const result = await getPlantsByName(name);
    setPlants(result);
    setLoading(false);
  }

  async function loadDetails(id: number) {
    setLoading(true);
    const data = await getPlantDetails(id);
    setDetails(data);
    setLoading(false);
  }

  return { plants, details, loading, search, loadDetails };
}

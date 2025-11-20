

async function fetchPlantData(plantId) {
  try {
    const response = await fetch(
      `https://perenual.com/api/v2/species-list?key=sk-2vh2691dd03c29e2b13566&id=${plantId}`
    );

    if (!response.ok) {
      console.log("API respondeu com erro:", response.status);
      return;
    }

    console.log("API respondeu corretamente ✔️");
  } catch (erro) {
    console.error("API não respondeu ❌", erro);
  }
}
fetchPlantData(1234);
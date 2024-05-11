// Fait une partie manuelle donc tester avant pour savoir quel coordonnee mettre dans la bouding box et savoir combien de point de tourimse il y a dans la boudingbox envoyer
// https://developer.myswitzerland.io/
import axios from 'axios';

const BASE_URL = 'https://opendata.myswitzerland.io/v1/';
const API_KEY = 'zbrLBtYCsk1G5zt3OOGZY1Aqnr9uHcv69N2KGBXd'; // CONFIDENTIEL MERCI !!!

export async function fetchAttractions(lang, bbox) {
    const data = await get(lang, bbox,'attractions')
    return data
}

export async function fetchTours(lang, bbox) {
    const data = await get(lang, bbox,'tours')
    return data
}

export async function get(lang, bbox, path) {
    try {
      const response = await axios.get(BASE_URL + path, {
        params: {
          lang,
          'geo.bbox': bbox
        },
        headers: {
          'x-api-key': API_KEY
        }
      });
      console.log('Repose requete : ', response)
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  }

  export async function getDynamicBoundingBox(bbox){
    let data_json = await fetchDataAttraction(bbox); 
    return data_json
  }

  export async function fetchDataAttraction(bbox){
    try {
        const data = await fetchAttractions('fr-CH', bbox);

        const attractions = parsingData(data)
        return attractions

      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      }
  }

  export async function parsingData(jsonData) {
    const attractions = jsonData.data;
    const meta = jsonData.meta;
    const links = jsonData.links;

    // Par exemple, accéder aux informations spécifiques de chaque attraction
    attractions.forEach(attraction => {
      const name = attraction.name;
      const location = attraction.location;
      const abstract = attraction.abstract;
      
      // etc.
    //   console.log(name, location, abstract )
    });

    const totalAttractions = attractions.length;
    console.log(`Nombre total d'attractions : ${totalAttractions}`);
    return attractions
  }

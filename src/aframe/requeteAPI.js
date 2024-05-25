/**
 * =======================================================================================
 * Requete a API Switzerland Tourisme
 * API : https://developer.myswitzerland.io/
 * Remarque : Tester d'abord manuellement pour savoir quel valeur mettre dans la boudingbox et 
 *            savoir ce que sa nous retourne (combien de point tourisme il y a dans boudingbox)
 * =======================================================================================
 */


import axios from 'axios';

const BASE_URL = 'https://opendata.myswitzerland.io/v1/';
const API_KEY = 'bPcxLOMJmU03eaPZpwqK4n4X0rz1308S1dhmyMb0'; 
// login compte :
// projet_sic1@maildrop.cc
// projet_sic1_2024

/**
 * Requête HTTP GET à l'API Switzerland Tourisme.
 * @param {string} lang - Langue de la requête ('fr-CH', 'de-CH', etc.).
 * @param {string} bbox - Coordonnee geographique de la boundingBox pour API Switzerland Tourisme 
 *                        avec les coins N-O et S-E aux format 'latitude_N0, longitude_N0, latitude2_SE, longitude2_SE'
 * @param {string} path - Chemin de l'API à interroger ('attractions'). Possible avoir autre chemin ('tours',...)
 * @returns {Promise<Object>} - Données récupérées de l'API.
 */
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
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
  }
}


/**
 * Récupère les attractions touristiques dans une certaine langue et une certaine zone géographique.
 * 
 * @param {string} lang - Langue de la requête ('fr-CH', 'de-CH', etc.).
 * @param {string} bbox - Coordonnee geographique de la boundingBox pour API Switzerland Tourisme 
 *                        avec les coins N-O et S-E aux format 'latitude_N0, longitude_N0, latitude2_SE, longitude2_SE'
 * @returns {Promise<Object[]>} - Données des attractions touristiques.
 */
export async function fetchAttractions(lang, bbox) {
    const data = await get(lang, bbox,'attractions')
    return data
}


/**
 * Récupère les données + parse des attractions touristiques dans une zone géographique donnée.
 * @param {string} bbox - Coordonnee geographique de la boundingBox pour API Switzerland Tourisme 
 *                        avec les coins N-O et S-E aux format 'latitude_N0, longitude_N0, latitude2_SE, longitude2_SE'
 * @returns {Promise<Object[]>} - Les données des attractions touristiques parser.
 */
export async function fetchDataAttraction(bbox){
  try {
      const data = await fetchAttractions('fr-CH', bbox);

      const attractions = parsingData(data)
      return attractions

    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
}

/**
 * Parse les données des attractions touristiques récupérées de l'API.
 * @param {Object} jsonData - Données des attractions touristiques.
 * @returns {Object[]} - Données des attractions touristiques parsées.
 */
export async function parsingData(jsonData) {
  const attractions = jsonData.data;
  const meta = jsonData.meta;
  const links = jsonData.links;

  // Par exemple, accéder aux informations spécifiques de chaque attraction
  attractions.forEach(attraction => {
    const name = attraction.name;
    const location = attraction.location;
    const abstract = attraction.abstract;    
    // Possible recuperer autre attribut.
  });

  const totalAttractions = attractions.length;
  return attractions
}

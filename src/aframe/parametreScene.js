/**
 * =======================================================================================
 * Fichier de constantes des scènes de niveaux à insérer dans le jeu avec leurs paramètres
 * =======================================================================================
 */

/**
 * Parametre un level
 * @typedef {Object} Level
 * @property {string} name - Nom de la scène.
 * @property {number} number - Level associé à la scène.
 * @property {string} position - Coordonnee geographique de la boundingBox pour API Switzerland Tourisme 
 *                                  avec les coins N-O et S-E aux format 'latitude_N0, longitude_N0, latitude2_SE, longitude2_SE'
 * @property {string} data - Fichier glb de la scène.
 * @property {string} positionGDB - Position de la scène dans une base de données géospatiale, au format 'x y z'.
 * @property {string} scaleSky - Facteur echelle de image du ciel.
 * @property {string} nameSky - Nom du jpeg 360 du ciel a utiliser.
 * @property {string} positionPopup - Position de la popup restultat.
 */

/**
 * Tableau des levels avec leurs noms associés.
 * @type {levels[]}
 */

const levels = [ 
    // Tableau des niveaux avec leurs noms associés
    { name: "Rocher de Naye (VD)", number: 1, position:'46.44124, 6.98694, 46.41935, 6.95736', data:'Naye_GLB.glb', 
        positionGDB: "200 -600 0", scaleSky: "5 5 5", nameSky:"sky.jpeg", positionPopup:"0 0.5 -3" },
        
    { name: "Pilatus", number: 2, position:'46.98392, 8.24913, 46.97525, 8.25936', data:'Pilatus.glb', 
        positionGDB: "200 -1000 0", scaleSky: "5 5 5", nameSky:"sky.jpeg", positionPopup:"0 0.5 -3"   },
        
    // { name: "Autre lieu du niveau a definir 3", number: 3, position:'	46.41912, 6.91848, 46.41027, 6.93335', data:'Naye_GLB.glb', 
    //     positionGDB: "200 -600 0", scaleSky: "5 5 5", nameSky:"sky.jpeg",  positionPopup:"0 1.5 -3"   },

    // Ajoutez d'autres level au besoin
    ]

export { levels };
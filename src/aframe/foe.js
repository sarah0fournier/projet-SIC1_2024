/**
 * =======================================================================================
 * Fichier de fonction pour ajout de fantômes 
 * =======================================================================================
 */

// Fonction pour ajouter un nouveau ennemi à la scène
export function addFoe(isWin, isPaused, intervalCounter, callback) {  

    // Ajout d'un fantôme si pas encore gagné et si le jeu n'est pas en pause
    if (!isWin && !isPaused) {
        const scene = document.querySelector('a-scene');
        const newFoe = document.createElement('a-gltf-model');

        const x = getRandomNumberInRange(-10, 10);
        const y = getRandomNumberInRange(-3, 5); // Garder une hauteur constante
        const z = getRandomNumberInRange(-10, 10);
        
        newFoe.setAttribute('src', '#Ghost-glb');
        newFoe.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouvel ennemi
        newFoe.setAttribute('scale', '0.35 0.35 0.35'); // Taille du nouveau fantôme
        newFoe.setAttribute('look-at', '#POI'); // Orientation des fantômes vers la caméra
        newFoe.setAttribute('sound', 'src: ../assets/Ghost.mp3; autoplay: true;'); // Son du fantôme
        newFoe.setAttribute('touch', '');  
        newFoe.setAttribute('code', '2');
        newFoe.setAttribute('paused', 'false');
        newFoe.setAttribute('id', "foe-" + intervalCounter); // ID de l'ennemi

        // Animation du nouveau fantôme
        const t = getRandomNumberInRange(3500, 6000);
        newFoe.setAttribute('animation__move', `property: position; to: 0 1 0; dur: ${t}; easing: linear;`); 
        newFoe.setAttribute('animation__disappear', `property: scale; to: 0 0 0; dur: 1; delay: ${t}; easing: linear;`); 
            // Param : 
                // to :  0 0 0 : taille final de element sur tous les axes (rendra invisible)
                // dur : duree animation
                // delay : delais avant de commencer animation 
                // disappear : disparait
                // move : se deplace
        
        // Ajout d'un événement pour arrêter le son après la disparition
        newFoe.addEventListener('animationcomplete__disappear', () => {
            const soundComponent = newFoe.components.sound;
            if (soundComponent) {
                soundComponent.stopSound();
            }
        });

        // Ajouter le nouvel ennemi à la scène
        scene.appendChild(newFoe); 

        // Lancer le délai pour vérifier si le fantôme est mort après la durée de l'animation
        const cubeCheckTimeout = setTimeout(() => {
            isFoeDead(intervalCounter, isPaused, (point) => {
                    callback(point); // retourne point quand la fct isFoeDead est terminer 
            });
        }, t - 100); 
        
    }
}

// Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
export function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Fonction pour vérifier si le fantôme a été touché
export function isFoeDead(intervalCounter, isPaused, callback) {
    const foeId = "foe-" + (intervalCounter); 
    const foe = document.getElementById(foeId);

    let point = 0 // Defini la valeur du point
    if (foe && foe.hasAttribute('touch')) {
        if (!isPaused){
            point += -1;   // Si enemi pas eliminer
        }
    }
    // Retourner la variable point avec un callback 
    callback(point);
    }

// Fonction pour recuperer les id des fantomes dans la scene actuelle
export function getFoeIds() {
    var elements = document.querySelectorAll('[id^="foe-"]');
    var ids = [];
    elements.forEach(function(element) {
        ids.push(element.id);
    });
    return ids;
}



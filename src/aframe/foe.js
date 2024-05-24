/**
 * =======================================================================================
 * Fichier de fonction pour ajout de fantômes 
 * =======================================================================================
 */

// Fonction pour ajouter un nouveau ennemi à la scène
export function addFoe(isWin, isPaused, intervalCounter, score) {  

    // Ajout d'un fantôme si pas encore gagné et si le jeu n'est pas en pause
    if (!isWin.value && !isPaused.value) {
        const scene = document.querySelector('a-scene');
        const newFoe = document.createElement('a-gltf-model');

        const x = getRandomNumberInRange(-10, 10);
        const y = getRandomNumberInRange(-3, 4); // Garder une hauteur constante
        const z = getRandomNumberInRange(-10, 10);
        
        newFoe.setAttribute('src', '#Ghost-glb');
        newFoe.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouvel ennemi
        newFoe.setAttribute('scale', '0.35 0.35 0.35'); // Taille du nouveau fantôme
        newFoe.setAttribute('look-at', '#POI'); // Orientation des fantômes vers la caméra
        newFoe.setAttribute('sound', 'src: ../assets/Ghost.mp3; autoplay: true;'); // Son du fantôme
        newFoe.setAttribute('touch', '');  // Enlever pour eviter les conflits avec "killable"
        // newFoe.setAttribute('killable', '');
        newFoe.setAttribute('code', '2');
        newFoe.setAttribute('paused', 'false');
        newFoe.setAttribute('id', "foe-" + intervalCounter.value); // ID de l'ennemi

        // Animation du nouveau fantôme
        const t = getRandomNumberInRange(3500, 6000);
        newFoe.setAttribute('animation__move', `property: position; to: 0 1 0; dur: ${t}; easing: linear;`); // move : se deplace
        newFoe.setAttribute('animation__disappear', `property: scale; to: 0 0 0; dur: 1; delay: ${t}; easing: linear;`); 
            // Param : 
                // to :  0 0 0 : taile final de element sur tous les axes (rendra invisible)
                // dur : duree animation
                // delay : delait avant commencer animation 
                // disappear : disparait
        
        // Ajout d'un événement pour arrêter le son après la disparition
        newFoe.addEventListener('animationcomplete__disappear', () => {
            const soundComponent = newFoe.components.sound;
            if (soundComponent) {
                soundComponent.stopSound();
            }
        });

        // Ajouter le nouvel ennemi à la scène
        scene.appendChild(newFoe); 
        intervalCounter.value++;

        // Lancer le délai pour vérifier si le fantôme est mort après la durée de l'animation
        const cubeCheckTimeout = setTimeout(() => {
            isFoeDead(score, intervalCounter, isPaused);
        }, t - 100); 
        
        // Mettre à jour le son en fonction de l'état de pause du jeu -> fonctionne pas
        updateSoundState(isPaused.value, newFoe);
    }
}

// Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
export function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Fonction pour vérifier si le fantôme a été touché
export function isFoeDead(score, intervalCounter, isPaused) {
    const foeId = "foe-" + (intervalCounter.value - 1); 
    const foe = document.getElementById(foeId);
    if (foe && foe.hasAttribute('touch')) {
        updateScoreFoe(score, -1, isPaused);
    }
}
    
// Fonction pour mettre à jour le score en fonction des points
export function updateScoreFoe(score, pt, isPaused) {
    if (!isPaused.value){
        score.value += pt;
        // console.log('Etat du score : ' , score.value);
    }
}

// Fonction pour mettre à jour le son en fonction de l'état de pause du jeu
function updateSoundState(isPaused, newFoe) {
    const soundComponent = newFoe.components.sound;
    if (soundComponent) {
        if (isPaused) {
            soundComponent.pauseSound();
        } else {
            soundComponent.playSound();
        }
    }
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



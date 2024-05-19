/**
 * =======================================================================================
 * Fichier de fonction pour ajout de fantomes 
 * =======================================================================================
 */


// Fonction pour ajouter un nouveau ennemi à la scène
export function addFoe(isWin, isPaused, intervalCounter, score) {  

    // Ajout d'un fantome si pas encore gagner et si jeu pas en pause
    if (isWin.value === false && isPaused.value === false) {
        console.log('Un fantome a été ajouté : ', intervalCounter.value);
        const scene = document.querySelector('a-scene');
        const newFoe = document.createElement('a-gltf-model');

        const x = getRandomNumberInRange(-10, 10);
        const y = getRandomNumberInRange(-3, 4); // Garder une hauteur constante
        const z = getRandomNumberInRange(-10, 10);
        
        newFoe.setAttribute('src', '#Ghost-glb')
        newFoe.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouvel ennemi
        newFoe.setAttribute('scale', '0.35 0.35 0.35'); // Couleur du nouveau cube
        newFoe.setAttribute('look-at', '#POI'); // Orientation des ennemis vers la camera
        newFoe.setAttribute('sound', 'src: ../assets/Ghost.mp3; autoplay: true;');// Son de l'ennemi
        newFoe.setAttribute('touch', ''); 
        newFoe.setAttribute('code', '2');
        newFoe.setAttribute('paused', 'false');
        newFoe.setAttribute('id', "foe-" + intervalCounter.value); // Id de ennemi

        // Animation du nouveau ennemi
        const t = getRandomNumberInRange(3500, 6000);
        console.log('Valeur de t :', t);
        newFoe.setAttribute('animation__move', `property: position; to: 0 1 0; dur: ${t}; easing: linear;`);
        newFoe.setAttribute('animation__disappear', `property: scale; to: 0 0 0; dur: 1; delay: ${t}; easing: linear;`);
        
        // Ajout événement pour arrêter le son après la disparition
        newFoe.addEventListener('animationcomplete__disappear', () => {
        const soundComponent = newFoe.components.sound;
        if (soundComponent) {
            soundComponent.stopSound();
        }
        });

        // Ajout événement pour mettre en pause le son après la disparition


        // Ajouter le nouvel ennemi à la scène
        scene.appendChild(newFoe); 
        intervalCounter.value ++;

        // Lancez le délai pour vérifier si le fantome est mort après la durée de l'animation
        const cubeCheckTimeout = setTimeout(() => {
        isFoeDead(score, intervalCounter);
        }, t-100); 
    }
}

// Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
export function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Fonctions pour vérifier si le fantome a été supprimé 
export function isFoeDead(score, intervalCounter) {
    const foeId = "foe-" + (intervalCounter.value-1); 
    const foe = document.getElementById(foeId);
    if (foe && foe.hasAttribute('touch')) {
        // console.log('Mise a jour du score')
        updateScoreFoe(score, -1);
    }
}
    
export function updateScoreFoe(score, pt){
    score.value += pt;
    console.log('Etat du score : ' , score.value)
};
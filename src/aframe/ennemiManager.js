// Fonction pour ajouter un nouveau cube à la scène
export function addCube(isWin, isPaused, intervalCounter, updateScore) {   
    // Ajouter un cube si pas encore gagner et si jeu pas en pause
    if (isWin.value === false && isPaused.value === false) {
        console.log('Le cube a été ajouté : ', intervalCounter);
        const scene = document.querySelector('a-scene');
        const newCube = document.createElement('a-box');

        const x = getRandomNumberInRange(-10, 10);
        const y = getRandomNumberInRange(-6, 3); // Garder une hauteur constante
        const z = getRandomNumberInRange(-10, 10);

        newCube.setAttribute('position', `${x} ${y} ${z}`); // Position aléatoire du nouveau cube
        newCube.setAttribute('color', 'red'); // Couleur du nouveau cube
        newCube.setAttribute('width', '0.1'); // Largeur du nouveau cube
        newCube.setAttribute('height', '0.1'); // Hauteur du nouveau cube
        newCube.setAttribute('depth', '0.1'); // Profondeur du nouveau cube

        // Animation du nouveau cube
        const t = getRandomNumberInRange(2000, 5000);
        console.log('Valeur de t :', t);
        newCube.setAttribute('animation__move', `property: position; to: 0 1.3 0; dur: ${t}; easing: linear;`);
        newCube.setAttribute('animation__disappear', `property: scale; to: 0 0 0; dur: 1; delay: ${t}; easing: linear;`);
        newCube.setAttribute('clickable', '');
        newCube.setAttribute('code', '2');
        newCube.setAttribute('paused', 'false');
        newCube.setAttribute('id', "box-" + intervalCounter); // Id du cube
      
      
        scene.appendChild(newCube); // Ajouter le nouveau cube à la scène
        intervalCounter ++;

        // Lancez le délai pour vérifier si le cube est mort après la durée de l'animation
        const cubeCheckTimeout = setTimeout(() => {
            isCubeDead(intervalCounter, updateScore);
        }, t); 
    }
}

// Fonction utilitaire pour générer un nombre aléatoire dans un intervalle donné
export function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}

// Fonctions pour vérifier si le cube a été supprimé 
export function isCubeDead(intervalCounter, updateScore) {
    const cubeId = "box-" + (intervalCounter - 1); 
    const cube = document.getElementById(cubeId);
    if (cube && cube.hasAttribute('clickable')) {
        updateScore(-1);
    }
}

// Permite soltar o item na caixa alvo
function allowDrop(event) {
    event.preventDefault();
}

// Guarda o ID do país arrastado
function drag(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// Lógica de validação ao soltar
function drop(event) {
    event.preventDefault();

    const countryId = event.dataTransfer.getData("text/plain");
    const countryElement = document.getElementById(countryId);
    
    // Identifica o contêiner do continente onde foi solto
    let continentBox = event.target;
    if (!continentBox.classList.contains('continent-box')) {
        continentBox = continentBox.closest('.continent-box');
    }

    if (!continentBox) return;

    const countryContinent = countryElement.getAttribute("data-continent");
    const targetContinent = continentBox.getAttribute("data-continent");

    // Validação de acerto ou erro
    if (countryContinent === targetContinent) {
        // ACERTO: Encaixa o país na caixa e aplica estilo verde
        continentBox.appendChild(countryElement);
        continentBox.classList.remove('wrong');
        continentBox.classList.add('correct');
        
        // Bloqueia para não arrastar novamente após acertar
        countryElement.setAttribute("draggable", "false");
        countryElement.style.cursor = "default";
    } else {
        // ERRO: Aplica estilo vermelho temporário
        continentBox.classList.add('wrong');
        setTimeout(() => {
            continentBox.classList.remove('wrong');
        }, 1000);
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');

    botaoAdicionar.addEventListener('click', function() {
        const textoTarefa = inputNovaTarefa.value.trim(); // Obtiene el texto y elimina espacios

        if (textoTarefa !== "") { // Verifica que el campo no esté vacío
            adicionarTarefa(textoTarefa); // Llama a la función para agregar la tarea
            inputNovaTarefa.value = ""; // Limpia el campo de input
        }
    });

    function adicionarTarefa(texto) {
        const tarefa = document.createElement('li'); // Crea un elemento LI
        tarefa.textContent = texto; // Asigna el texto de la tarea al LI
        listaTarefas.appendChild(tarefa); // Agrega el LI a la lista
    }
});

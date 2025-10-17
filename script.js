document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');

    botaoAdicionar.addEventListener('click', function() {
        const textoTarefa = inputNovaTarefa.value.trim();

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            inputNovaTarefa.value = "";
        }
    });

    function adicionarTarefa(texto) {
        const tarefa = document.createElement('li');
        tarefa.textContent = texto;

        const botaoEliminar = document.createElement('button');
        botaoEliminar.textContent = 'Eliminar';
        botaoEliminar.addEventListener('click', function(event) {
            event.stopPropagation(); 
            tarefa.remove();
        });

        tarefa.appendChild(botaoEliminar); 
        listaTarefas.appendChild(tarefa);
    }
});

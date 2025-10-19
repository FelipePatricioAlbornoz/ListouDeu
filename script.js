document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');

    carregarTarefas();

    botaoAdicionar.addEventListener('click', function() {
        const textoTarefa = inputNovaTarefa.value.trim();

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa);
            inputNovaTarefa.value = "";
            guardarTarefas();
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
            guardarTarefas();
        });

        tarefa.appendChild(botaoEliminar);
        listaTarefas.appendChild(tarefa);
    }

    function guardarTarefas() {
        const tarefas = [];
        document.querySelectorAll('#lista-tarefas li').forEach(tarefa => {
            tarefas.push({
                texto: tarefa.textContent,
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefasGuardadas = localStorage.getItem('tarefas');
        if (tarefasGuardadas) {
            const tarefas = JSON.parse(tarefasGuardadas);
            tarefas.forEach(tarefa => {
                adicionarTarefa(tarefa.texto);
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const taskTemplate = document.getElementById('task-template');

    carregarTarefas();

    botaoAdicionar.addEventListener('click', function() {
        const textoTarefa = inputNovaTarefa.value.trim();

        if (textoTarefa !== "") {
            adicionarTarefa(textoTarefa, false);
            inputNovaTarefa.value = "";
            guardarTarefas();
        }
    });

    function adicionarTarefa(texto, completada) {
        const taskClone = taskTemplate.content.cloneNode(true);
        const tarefa = taskClone.querySelector('li');
        const span = taskClone.querySelector('span');
        const checkbox = taskClone.querySelector('input[type="checkbox"]');
        const botaoEliminar = taskClone.querySelector('button');

        span.textContent = texto;
        checkbox.checked = completada;

        if (completada) {
            tarefa.classList.add('completed');
        }

        botaoEliminar.addEventListener('click', function() {
            tarefa.remove();
            guardarTarefas();
        });

        checkbox.addEventListener('change', function() {
            tarefa.classList.toggle('completed');
            guardarTarefas();
        });

        listaTarefas.appendChild(taskClone);
    }

    function guardarTarefas() {
        const tarefas = [];
        document.querySelectorAll('#lista-tarefas li').forEach(tarefa => {
            const span = tarefa.querySelector('span');
            const checkbox = tarefa.querySelector('input[type="checkbox"]');
            tarefas.push({
                texto: span.textContent,
                completada: checkbox.checked
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tarefas));
    }

    function carregarTarefas() {
        const tarefasGuardadas = localStorage.getItem('tarefas');
        if (tarefasGuardadas) {
            const tarefas = JSON.parse(tarefasGuardadas);
            tarefas.forEach(tarefa => {
                adicionarTarefa(tarefa.texto, tarefa.completada);
            });
        }
    }
});
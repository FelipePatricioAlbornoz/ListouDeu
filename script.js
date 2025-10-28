document.addEventListener('DOMContentLoaded', function() {
    const inputNovaTarefa = document.getElementById('nova-tarefa');
    const botaoAdicionar = document.getElementById('adicionar');
    const listaTarefas = document.getElementById('lista-tarefas');
    const taskTemplate = document.getElementById('task-template');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');
    const clearCompleted = document.getElementById('clear-completed');

    let tasks = [];

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
        const botaoEditar = taskClone.querySelector('.edit');
        const botaoEliminar = taskClone.querySelector('.delete');

        span.textContent = texto;
        checkbox.checked = completada;

        if (completada) {
            tarefa.classList.add('completed');
        }

        botaoEliminar.addEventListener('click', function() {
            tarefa.remove();
            guardarTarefas();
        });

        botaoEditar.addEventListener('click', function() {
            const novoTexto = prompt("Editar tarefa:", span.textContent);
            if (novoTexto !== null && novoTexto.trim() !== "") {
                span.textContent = novoTexto.trim();
                guardarTarefas();
            }
        });

        checkbox.addEventListener('change', function() {
            tarefa.classList.toggle('completed');
            guardarTarefas();
        });

        listaTarefas.appendChild(taskClone);
    }

    function guardarTarefas() {
        const tasks = [];
        document.querySelectorAll('#lista-tarefas li').forEach(tarefa => {
            const span = tarefa.querySelector('span');
            const checkbox = tarefa.querySelector('input[type="checkbox"]');
            tasks.push({
                texto: span.textContent,
                completada: checkbox.checked
            });
        });
        localStorage.setItem('tarefas', JSON.stringify(tasks));
    }

    function carregarTarefas() {
        const tarefasGuardadas = localStorage.getItem('tarefas');
        if (tarefasGuardadas) {
            tasks = JSON.parse(tarefasGuardadas);
            tasks.forEach(tarefa => {
                adicionarTarefa(tarefa.texto, tarefa.completada);
            });
        }
    }

    filterAll.addEventListener('click', function() {
        filterTasks('all');
        setActiveFilter(this);
    });

    filterActive.addEventListener('click', function() {
        filterTasks('active');
        setActiveFilter(this);
    });

    filterCompleted.addEventListener('click', function() {
        filterTasks('completed');
        setActiveFilter(this);
    });

    clearCompleted.addEventListener('click', function() {
        const completedTasks = document.querySelectorAll('#lista-tarefas li.completed');
        completedTasks.forEach(task => task.remove());
        guardarTarefas();
    });

    function filterTasks(filter) {
        const allTasks = document.querySelectorAll('#lista-tarefas li');
        allTasks.forEach(task => {
            switch (filter) {
                case 'active':
                    task.style.display = task.classList.contains('completed') ? 'none' : 'flex';
                    break;
                case 'completed':
                    task.style.display = task.classList.contains('completed') ? 'flex' : 'none';
                    break;
                default:
                    task.style.display = 'flex';
                    break;
            }
        });
    }

    function setActiveFilter(button) {
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
    }
});
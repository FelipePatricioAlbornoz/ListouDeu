QUnit.module('ToDo App', {
  beforeEach: function() {
    localStorage.clear();
    document.getElementById('lista-tarefas').innerHTML = '';
    document.getElementById('nova-tarefa').value = '';
  },
  afterEach: function() {
    localStorage.clear();
  }
});

QUnit.test('Adicionar tarefa', function(assert) {
  const input = document.getElementById('nova-tarefa');
  const adicionar = document.getElementById('adicionar');
  const lista = document.getElementById('lista-tarefas');

  input.value = 'Nova tarefa';
  adicionar.click();

  assert.equal(lista.children.length, 1, 'A tarefa foi adicionada à lista');
  assert.equal(lista.querySelector('span').textContent, 'Nova tarefa', 'O texto da tarefa está correto');
  assert.equal(input.value, '', 'O campo de entrada foi limpo');
});

QUnit.test('Completar tarefa', function(assert) {
  const input = document.getElementById('nova-tarefa');
  const adicionar = document.getElementById('adicionar');
  const lista = document.getElementById('lista-tarefas');

  input.value = 'Nova tarefa';
  adicionar.click();

  const checkbox = lista.querySelector('input[type="checkbox"]');
  checkbox.click();

  assert.ok(lista.querySelector('li').classList.contains('completed'), 'A tarefa está marcada como concluída');
});

QUnit.test('Editar tarefa', function(assert) {
  const input = document.getElementById('nova-tarefa');
  const adicionar = document.getElementById('adicionar');
  const lista = document.getElementById('lista-tarefas');

  input.value = 'Nova tarefa';
  adicionar.click();

  const editButton = lista.querySelector('.edit');
  window.prompt = function() {
    return 'Tarefa editada';
  };
  editButton.click();

  assert.equal(lista.querySelector('span').textContent, 'Tarefa editada', 'O texto da tarefa foi atualizado');
});

QUnit.test('Eliminar tarefa', function(assert) {
  const input = document.getElementById('nova-tarefa');
  const adicionar = document.getElementById('adicionar');
  const lista = document.getElementById('lista-tarefas');

  input.value = 'Nova tarefa';
  adicionar.click();

  const deleteButton = lista.querySelector('.delete');
  deleteButton.click();

  assert.equal(lista.children.length, 0, 'A tarefa foi removida da lista');
});

QUnit.test('Filtrar tarefas', function(assert) {
  const input = document.getElementById('nova-tarefa');
  const adicionar = document.getElementById('adicionar');
  const lista = document.getElementById('lista-tarefas');
  const filterActive = document.getElementById('filter-active');
  const filterCompleted = document.getElementById('filter-completed');
  const filterAll = document.getElementById('filter-all');

  input.value = 'Tarefa 1';
  adicionar.click();
  input.value = 'Tarefa 2';
  adicionar.click();

  const checkbox = lista.querySelector('input[type="checkbox"]');
  checkbox.click();

  filterActive.click();
  assert.equal(lista.children[0].style.display, 'none', 'A tarefa concluída está oculta no filtro ativo');
  assert.equal(lista.children[1].style.display, 'flex', 'A tarefa ativa está visível no filtro ativo');

  filterCompleted.click();
  assert.equal(lista.children[0].style.display, 'flex', 'A tarefa concluída está visível no filtro concluído');
  assert.equal(lista.children[1].style.display, 'none', 'A tarefa ativa está oculta no filtro concluído');

  filterAll.click();
  assert.equal(lista.children[0].style.display, 'flex', 'A tarefa concluída está visível no filtro todos');
  assert.equal(lista.children[1].style.display, 'flex', 'A tarefa ativa está visível no filtro todos');
});

QUnit.test('Limpar tarefas concluídas', function(assert) {
    const input = document.getElementById('nova-tarefa');
    const adicionar = document.getElementById('adicionar');
    const lista = document.getElementById('lista-tarefas');
    const clearCompleted = document.getElementById('clear-completed');

    input.value = 'Tarefa 1';
    adicionar.click();
    input.value = 'Tarefa 2';
    adicionar.click();

    const checkbox = lista.querySelector('input[type="checkbox"]');
    checkbox.click();

    clearCompleted.click();

    assert.equal(lista.children.length, 1, 'A tarefa concluída foi removida');
    assert.notOk(lista.querySelector('li').classList.contains('completed'), 'A tarefa restante não está concluída');
});

QUnit.test('LocalStorage', function(assert) {
    const input = document.getElementById('nova-tarefa');
    const adicionar = document.getElementById('adicionar');
    const lista = document.getElementById('lista-tarefas');

    input.value = 'Tarefa 1';
    adicionar.click();
    input.value = 'Tarefa 2';
    adicionar.click();

    const checkbox = lista.querySelector('input[type="checkbox"]');
    checkbox.click();

    // Recarregar tarefas do localStorage
    lista.innerHTML = '';
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);

    assert.equal(lista.children.length, 2, 'As tarefas foram carregadas do localStorage');
    assert.ok(lista.children[0].classList.contains('completed'), 'O estado de conclusão da tarefa foi carregado');
});
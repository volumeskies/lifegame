var life_list = [];
var cells = document.getElementsByClassName("cell");
console.log(cells);

var field = document.getElementById("field");
var n = field.offsetWidth/40, m = field.offsetHeight/40;


function delCell(elem, cell_index)
{
	elem.classList.remove('life');
	elem.toggle = !elem.toggle;
	var i = life_list.indexOf(cell_index);
	if (i >= 0) {
	  life_list.splice( i, 1 );
	}
	console.log(life_list);
}

for (var i = 1; i <= (n * m); i++) {
	var newCell = document.createElement('div');
	newCell.className = "cell";
	newCell.toggle = false;
	newCell.timer = 0;
	newCell.addEventListener('click', function(elem){
    var cell_index = Array.prototype.indexOf.call(field.children, (elem ? elem.target : event.srcElement));
    if (!elem.target.classList.contains('life'))
    {
      elem.target.classList.add('life');
      elem.target.toggle = true;
      life_list.push(cell_index);
      console.log(life_list);
    }
    else
    {
      delCell(elem.target, cell_index);
    }


  });
	newCell.onmouseover = function(elem)
	{
		if (!elem.toggle)
		{
			return;
		}
		var index = Array.prototype.indexOf.call(field.children, (elem ? elem.target : event.srcElement));
			elem.timer = setTimeout(function (){
				elem.target.classList.remove('life');
				elem.target.toggle = !elem.target.toggle;
				var i = life_list.indexOf(index);
				if (i >= 0) {
				  life_list.splice( i, 1 );
				}
				console.log(life_list);
			}, 2000);
	}
	newCell.onmouseout = function()
	{
		if (this.timer) {
		clearTimeout(this.timer);
		this.timer = 0;
		}
	};

	field.appendChild(newCell);
}
console.log(field);






function print()
{
	while (field.firstChild) {							// Очищаем "field"
    field.removeChild(field.firstChild);
	}
	for (var i = 1; i <= (n * m); i++)
	{
		var newCell = document.createElement('div');
		newCell.className = "cell";
		newCell.toggle = false;
		newCell.timer = 0;
		newCell.addEventListener('click', function(elem){
	    var cell_index = Array.prototype.indexOf.call(field.children, (elem ? elem.target : event.srcElement));
	    if (!elem.target.classList.contains('life'))
	    {
	      elem.target.classList.add('life');
	      elem.target.toggle = true;
	      life_list.push(cell_index);
	      console.log(life_list);
	    }
	    else
	    {
	      delCell(elem.target, cell_index);
	    }


	  });
		newCell.onmouseover = function(elem)
		{
			if (!this.toggle)
			{
				return;
			}
			this.timer = setTimeout(function delCell(elem)
			{
				var index = Array.prototype.indexOf.call(field.children, (elem ? elem.target : event.srcElement));
				elem.classList.remove('life');
				elem.toggle = !elem.toggle;
				var i = life_list.indexOf(index);
				if (i >= 0) {
					life_list.splice( i, 1 );
				}
				console.log(life_list);
			}, 2000);
		};
		newCell.onmouseout = function()
		{
			if (this.timer) {
			clearTimeout(this.timer);
			this.timer = 0;
			}
		};
		field.appendChild(newCell);
	}
	var cells = document.getElementsByClassName("cell");
	for (var index = 0; index < life_list.length; index++)
	{
		cells[life_list[index]].classList.add('life');
		cells[life_list[index]].toggle = true;
	}
}

function periphery_count(count, periphery)
{
	var count = 0;
	for (var j = 0; j < periphery.length; j++)
	{
		if (cells[periphery[j]].classList.contains('life'))
			count++;
	}
	return count;
}

function make_alive_or_not(this_cell, count, new_iteration_list)
{
	if (!cells[this_cell].classList.contains('life') && count == 3)
	{
		var insert = new_iteration_list.indexOf(this_cell);
		if (insert < 0) {
				new_iteration_list.push(this_cell);
		}
	}

	if (cells[this_cell].classList.contains('life') && (count != 2 && count != 3))
	{
		var del = new_iteration_list.indexOf(this_cell);
		if (del >= 0) {
			new_iteration_list.splice( del, 1 );
		}
	}
}

function compute_empty(Empty_cell, periphery_2, new_iteration_list)
{
	var e_count = 0;
	e_count	= periphery_count(e_count, periphery_2);
	make_alive_or_not(Empty_cell, e_count, new_iteration_list);
}

function check_empty_cell(Empty_cell, new_iteration_list)
{
	if (Empty_cell == 0)					// Углы
	{
		var periphery_2 = [Empty_cell+1, Empty_cell+10, Empty_cell+11];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell == 9)
	{
		var periphery_2 = [Empty_cell-1, Empty_cell+9, Empty_cell+10];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell == 90)
	{
		var periphery_2 = [Empty_cell-10, Empty_cell-9, Empty_cell+1];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell == 99)
	{
		var periphery_2 = [Empty_cell-11, Empty_cell-10, Empty_cell-1];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell%10 == 0)					// Левая стенка
	{
		var periphery_2 = [Empty_cell-10, Empty_cell-9, Empty_cell+1, Empty_cell+10, Empty_cell+11];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if ((Empty_cell+1)%10 == 0)			// Правая стенка
	{
		var periphery_2 = [Empty_cell-11, Empty_cell-10, Empty_cell-1, Empty_cell+9, Empty_cell+10];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell/10>>0 == 9)			// Нижняя стенка
	{
		var periphery_2 = [Empty_cell-11, Empty_cell-10, Empty_cell-9, Empty_cell-1, Empty_cell+1];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell/10>>0 == 0)			// Верхняя стенка
	{
		var periphery_2 = [Empty_cell-1, Empty_cell+1, Empty_cell+9, Empty_cell+10, Empty_cell+11];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}

	if (Empty_cell > 0 && Empty_cell < n*m)			// Если клетка находится хотя бы в пределах поля
	{
		var periphery_2 = [Empty_cell-11, Empty_cell-10, Empty_cell-9, Empty_cell-1, Empty_cell+1, Empty_cell+9, Empty_cell+10, Empty_cell+11];   // Клетки периферии
		compute_empty(Empty_cell, periphery_2, new_iteration_list);
		return;
	}
}

function compute_alive(Alive_cell, periphery, new_iteration_list)
{
	var a_count = 0;
	for (var i = 0; i < periphery.length; i++)		// Проверяем все клетки периферии живой клетки
		if (!cells[periphery[i]].classList.contains('life'))	// КРОМЕ ЖИВЫХ
			check_empty_cell(periphery[i], new_iteration_list);
	a_count	= periphery_count(a_count, periphery);
	make_alive_or_not(Alive_cell, a_count, new_iteration_list);
}

function check_alive_cell(Alive_cell, new_iteration_list)
{
	if (Alive_cell == 0)					// Углы
	{
		var periphery = [Alive_cell+1, Alive_cell+10, Alive_cell+11];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell == 9)
	{
		var periphery = [Alive_cell-1, Alive_cell+9, Alive_cell+10];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell == 90)
	{
		var periphery = [Alive_cell-10, Alive_cell-9, Alive_cell+1];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell == 99)
	{
		var periphery = [Alive_cell-11, Alive_cell-10, Alive_cell-1];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell%10 == 0)					// Левая стенка
	{
		var periphery = [Alive_cell-10, Alive_cell-9, Alive_cell+1, Alive_cell+10, Alive_cell+11];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if ((Alive_cell+1)%10 == 0)			// Правая стенка
	{
		var periphery = [Alive_cell-11, Alive_cell-10, Alive_cell-1, Alive_cell+9, Alive_cell+10];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell/10>>0 == 9)			// Нижняя стенка
	{
		var periphery = [Alive_cell-11, Alive_cell-10, Alive_cell-9, Alive_cell-1, Alive_cell+1];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell/10>>0 == 0)			// Верхняя стенка
	{
		var periphery = [Alive_cell-1, Alive_cell+1, Alive_cell+9, Alive_cell+10, Alive_cell+11];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}

	if (Alive_cell > 0 && Alive_cell < n*m)			// Если клетка находится хотя бы в пределах поля
	{
		var periphery = [Alive_cell-11, Alive_cell-10, Alive_cell-9, Alive_cell-1, Alive_cell+1, Alive_cell+9, Alive_cell+10, Alive_cell+11];   // Клетки периферии
		compute_alive(Alive_cell, periphery, new_iteration_list);
		return;
	}
}

function modeling()
{
  var new_iteration_list = life_list.slice(0);    // Массив результата итерации
	console.log(new_iteration_list);
  for (var i = 0; i < life_list.length; i++)		// Проверяем каждую живую клетку из списка
		check_alive_cell(life_list[i], new_iteration_list);
	life_list = [];
	life_list = new_iteration_list.slice(0);	// Переписываем результат итерации в основной массив живых клеток
}

function start_life ()
{
  setTimeout(function ()
	{
		modeling();
		print();
    if (life_list.length != 0) {
      start_life();
    }
  }, 1000)
}

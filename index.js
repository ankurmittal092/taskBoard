(function(){
	var listWrapperJS = document.querySelector('.listWrapperJS'),
	listItemWrpJS = document.querySelector('.listItemWrpJS'),
	addListJS = document.querySelector('.addListJS'),
	addNewListDivJS = document.querySelector('.addNewListDivJS'),
	listCounter = 0,
	dragSrcEl = {};

	//Drag drop functions star
	var handleDragStart = function (listCounter) {
		return function (event) {
			dragSrcEl.listHtml = document.querySelector('#list'+ listCounter);
			dragSrcEl.elem = this;
			dragSrcEl.listCounter = listCounter;

			event.dataTransfer.effectAllowed = 'move';
			event.dataTransfer.setData('text/html', this.innerHTML);
		}
	}

	var handleDragEnter = function (event) {
		this.classList.add('over');
	}

	var handleDragOver = function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		}
		event.dataTransfer.dropEffect = 'move';
		return false;
	}

	var handleDrop = function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		}

		if (dragSrcEl.listHtml != this) {
			var cont = event.dataTransfer.getData('text/html');
			var counter = this.getAttribute('data-index');

			fnInsertListItem(cont, counter);
			dragSrcEl.dropSuccess = true;
			
		}
		else {
			dragSrcEl.dropSuccess = false;
		}

		return false;
	}

	var handleDragEnd = function (event) {
		[].forEach.call(document.querySelectorAll('.list'), function (col) {
		col.classList.remove('over');
		});

		if(dragSrcEl.dropSuccess){
			dragSrcEl.elem.parentNode.removeChild(dragSrcEl.elem);
		}
	}

	/*END*/

	var fnListitemCrossClickhandler = function(event){
		var listItemDOM = this.parentNode;
		listItemDOM.parentNode.removeChild(listItemDOM);
	}

	var fnInsertListItem = function(listItemContent, listCounter){
		var listItemDiv = document.createElement('div');
		listItemDiv.draggable = true;
		listItemDiv.className = "list-item";
		listItemDiv.innerHTML = listItemContent;

		var crossDiv = document.createElement('div');
		crossDiv.className = 'cross';
		crossDiv.innerText = 'x';
		crossDiv.addEventListener('click', fnListitemCrossClickhandler);

		listItemDiv.append(crossDiv);
		listItemDiv.addEventListener('dragstart', handleDragStart(listCounter), false);
		// listItemDiv.addEventListener('drop', handleDrop, false);

		var parentList = document.querySelector('#list'+ listCounter + " .listItemWrpJS");
		parentList.append(listItemDiv);
	};

	var fnInputKeyUpHandler = function(){
		var localListCounter = listCounter;
		return function(event){
			var inputVal = event.target.value;
			if(event && event.keyCode == 13){
				if(inputVal){
					fnInsertListItem(inputVal, localListCounter);
				}
				event.target.value = '';
			}
		}
	}

	var fnCreateInputBox =  function(){
		var newIpElemWrpDiv = document.createElement('div');
		newIpElemWrpDiv.className = "list-item input-wrp";

		var inputElem = document.createElement('input');
		inputElem.addEventListener('keyup', fnInputKeyUpHandler());
		newIpElemWrpDiv.append(inputElem);
		return newIpElemWrpDiv;
	}

	var fnCreateListItemWrp = function(){
		var listItemWrp = document.createElement('div');
		listItemWrp.className = "listItemWrpJS";
		return listItemWrp;
	};

	var fnCreateListHeading = function(listName){
		var newListHdElem = document.createElement('div');
		newListHdElem.className = 'list-hd';
		newListHdElem.innerText = listName;
		return newListHdElem;
	}

	var fnCreateList = function(listName){
		var newListElem = document.createElement("div");
		newListElem.id = 'list' + listCounter;
		newListElem.className = 'list';
		newListElem.setAttribute('data-index', listCounter)

		newListElem.addEventListener('dragenter', handleDragEnter, false);
		newListElem.addEventListener('dragover', handleDragOver, false);
	  	newListElem.addEventListener('dragend', handleDragEnd, false);
		newListElem.addEventListener('drop', handleDrop, false);

		var newListHdElem = fnCreateListHeading(listName);
		var listItemWrp = fnCreateListItemWrp();
		var inputBoxDiv = fnCreateInputBox();

		newListElem.append(newListHdElem, listItemWrp, inputBoxDiv);
		listWrapperJS.insertBefore(newListElem, addNewListDivJS);
		listCounter++;
	};

	var addListClickHandeler = function(){
		var listName = prompt('Enter List Name:');
		if(listName){
			fnCreateList(listName);
		}
	};

	addListJS.addEventListener('click',addListClickHandeler);
})();

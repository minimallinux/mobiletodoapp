/*jslint browser:true */
var swal = "sweetalert";
var data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')): {
todo: [],
completed: []
};
//Store the updated, added or removed data in localStorage using JSON stringify and parse to convert the object
function dataObjectUpdated() {
localStorage.setItem("todoList", JSON.stringify(data));
console.log(data);
}
//Function to add items and reset field after addition
document.querySelector('#add').addEventListener('click', function() {
//Get the value entered from the "add" button event
var value = document.querySelector('#item').value;
if(value) {
//Run the whole addItemToDOM function below if a value has been entered
addItemToDOM(value);
//Reset the value after the entry
document.querySelector('#item').value = '';
//Update the data object
data.todo.push(value);
dataObjectUpdated();
//Remove the initial message which was added via css
document.styleSheets[0].addRule('ul.todo:after','display:none');
document.styleSheets[0].insertRule('ul.todo:after {display:none}');
} else {
//Alert if add button clicked with no entry
swal("Hold On!", "You have to enter an activity first!", "info");	
}
});
//Function for if keybboard input is required to add items
document.querySelector('#item').addEventListener('keydown', function( e ) {
var value = this.value;	
if(e.code === 'Enter' && value) {
function addItem() {
	addItemToDOM(value);
	//Remove the initial message as above
	document.querySelector('#item').value = '';
	data.todo.push(value);
	dataObjectUpdated();
//Remove the initial message which was added via css
document.styleSheets[0].addRule('ul.todo:after','display:none');
document.styleSheets[0].insertRule('ul.todo:after {display:none}');	
}	
addItem(value);
}
});
//The addItemToDOM function adds a new item to the todo list
function addItemToDOM(text, completed) {
var list = (completed) ? document.querySelector('.completed'):document.querySelector('.todo');
/*Create new li element*/
var item = document.createElement('li');
//Use the entered text for the contents
item.innerText = text || completed;
/***Create the buttons div and add the 2 buttons using Icomoon classes***/
var buttons = document.createElement('div');
buttons.classList.add('buttons');

//Trash button, create it and its Icomoon class and add it and the i tag to the remove button
var bin = document.createElement('button');
//Add the remove class to the button
bin.classList.add('remove');
//Create i element and add it to the button
var binIcon = document.createElement('i');
bin.appendChild(binIcon);
//Create Icomoon bin icon class
var binClass="icon-bin";
//Add the Icomoon  bin class to i element
binIcon.classList.add(binClass);
//Add the Trash button to buttons div
buttons.appendChild(bin);

//Add a click event and remove function for Trash button and add the data to the data array
bin.addEventListener('click', removeItem);
//Get the parent and item nodes to remove items
function removeItem() {
//Get the li item for that entry
var item = this.parentNode.parentNode;
//get the parent (ul) class/id for the item
var parent = item.parentNode;
//Get the id of the item
var id = parent.id;
var value = item.innerText;
if(id === 'todo') {
data.todo.splice(data.todo.indexOf(value), 1);
}else {
data.completed.splice(data.completed.indexOf(value), 1);
}
//Remove the item
parent.removeChild(item);
dataObjectUpdated();
}

//Success button, create its Icomoon class and add it and the i tag to the success/update button
var success = document.createElement('button');
//Add the complete class to the button
success.classList.add('complete');
//Create i element and add it to button
var successIcon = document.createElement('i');
success.appendChild(successIcon);
//Create Icomoon success icon class
var successClass="icon-checkmark";
//Add the Icomoon checkmark class to i element
successIcon.classList.add(successClass);
//Add the Success/Update button to buttons div
buttons.appendChild(success);

//Add a click event and update function for success button ans add the data to the data array
success.addEventListener('click', updateItem);
function updateItem() {
var item = this.parentNode.parentNode;
var parent = item.parentNode;
var id = parent.id;
var value = item.innerText;
var target;
if(id === 'todo') {
//If its a todo item to be completed
target = document.querySelector('.completed');
data.todo.splice(data.todo.indexOf(value), 1);
data.completed.push(value);
parent.removeChild(item);
target.insertBefore(item, target.childNodes[0]);
}else {
//If its a completed item to be updated
target = document.querySelector('.todo');
data.completed.splice(data.completed.indexOf(value), 1);
data.todo.push(value);
target.insertBefore(item, target.childNodes[0]);
}
dataObjectUpdated();
}
/*Add the 2 buttons to the item and list*/
item.appendChild(buttons);
list.insertBefore(item,list.childNodes[0]);
}

// databaseURL = 'https://playground-8bfc1-default-rtdb.europe-west1.firebasedatabase.app/'
// initializeApp = https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js
// getDatabase = "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-8bfc1-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const inputField = document.getElementById('input-field')
const addButton = document.getElementById('add-button')
const shoppingListEl = document.getElementById('shopping-list')
addButton.addEventListener('click', addItem)

onValue(shoppingListInDB, function(snapshot) {
  if(snapshot.exists()){
    let itemArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    itemArray.map(item => {
        let currentItem = item
        // let currentItemID = currentItem[0]
        // let currentItemValue = currentItem[1]
        renderShoppingListEl(currentItem)
    })
    // clearInputFieldEl()
  }else{
    shoppingListEl.innerHTML = `<h1>No items here... yet</h1>`
  }
}) 


function addItem() {
    let inputValue = inputField.value
    push(shoppingListInDB, inputValue)
    clearInputFieldEl()
}
function clearShoppingListEl() {
    shoppingListEl.innerHTML = ''
}

function clearInputFieldEl() {
    inputField.value = ''
}

function renderShoppingListEl(item) {
    // shoppingListEl.innerHTML += `<li>${inputValue}</li>`
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement('li')
    newEl.textContent = itemValue
    newEl.addEventListener('click', function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    shoppingListEl.appendChild(newEl)
}

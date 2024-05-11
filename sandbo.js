
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const appSettings = {
  databaseURL: "https://playground-9fb72-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")


const addbutton = document.querySelector('#add-button');
const inputField = document.querySelector('#input-feild');
const shoppingList = document.querySelector('#shopping-list');



addbutton.addEventListener('click', function () {
  let inputValue = inputField.value;

  push(shoppingListInDB, inputValue);

  clearinputFeild();

  // addingItemsToShoppingList(inputValue);

})

onValue(shoppingListInDB, function (snapshot) {

  if (snapshot.exists()) {

    let itemsArray = Object.entries(snapshot.val());

    console.log(snapshot.val());

    clearshoppinglist();

    for (let i = 0; i < itemsArray.length; i++) {

      let currentItem = itemsArray[i]

      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      addingItemsToShoppingList(currentItem);

    }
  } else {
    shoppingList.innerHTML = '*** No items added here yet ***'
  }

})

function clearinputFeild() {
  inputField.value = "";
}

function addingItemsToShoppingList(item) {
  // shoppingList.innerHTML += `<li>${itemValue}</li>`;

  let itemID = item[0]
  let itemValue = item[1]

  let newEl = document.createElement('li')

  newEl.textContent = itemValue;

  newEl.addEventListener('click', function () {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  })

  shoppingList.append(newEl)
}

function clearshoppinglist() {
  shoppingList.innerHTML = "";
}

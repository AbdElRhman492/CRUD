// ID Generator
const inp = document.getElementById('id_input_gen');
const btn = document.getElementById('id_btn');
const id = document.getElementById('id_output');

btn.addEventListener('click', () => {
  const digits = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        let ID_length = 8;
        let id = "";
        for (let i = 0; i < ID_length; i++) {
          let rand_id = Math.floor(Math.random() * digits.length);
          id += digits.substring(rand_id, rand_id + 1);
        }
        document.getElementById('id_output').value = id;
})

// Copy Function
function copy() {
        let text_copy = document.getElementById('id_output');
        text_copy.select();
  document.execCommand('copy');
}

// Start Crud Project
let id_inp = document.getElementById("id");
let price = document.getElementById("price");
let texes = document.getElementById("texes");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let search_inp = document.getElementById('search');
let submit = document.getElementById("submit");
let mood = 'create'; 
let glass_info;

// Add Asterisk On Required Field
$('input').each(function () {
    if ($(this).attr('required')) {
        $(this).after('<span class="asterisk" title="This Mean That input is required">*</span>');
    }
});

// getTotal()
function getTotal() { 
  if (price.value != '') {
    let result = (+price.value + +texes.value) - ((+price.value + +texes.value) * (+discount.value / 100));
    total.innerHTML = result;
    total.style.background = '#27ae60'
  } else {
    total.innerHTML = '';
    total.style.background = '#e74c3c'
  }
}

// createItem()
let glasses_data;
// Check If Local Storage Contain Data
if (localStorage.glasses != null) {
  glasses_data = JSON.parse(localStorage.glasses);
} else {
  glasses_data = [];
}
submit.onclick = function () {
  let new_glass = {
    id: id_inp.value,
    price: price.value,
    texes: texes.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    cat: category.value
  }

  // Count
  if(id.value != '' && price.value != '' && category.value != '') {
      if(mood === 'create') {
    if (new_glass.count > 1) {
      for (i = 0; i < new_glass.count; i++) {
        // Add Glass Details Into The Array
        glasses_data.push(new_glass);
      }
    } else {
      // Add Glass Details Into The Array
      glasses_data.push(new_glass);
    }
    } else {
    glasses_data[glass_info] = new_glass;
    mood = 'create';
    submit.innerHTML = 'Add'
    count.style.display = "block";
    }
    clear_data();
  }

  // Save INFO in LocalStorage
  localStorage.setItem('glasses', JSON.stringify(glasses_data));
  show_data();
}

// Clear INPUTS After Add item
function clear_data() {
  id_inp.value = '';
  price.value = '';
  texes.value = '';
  discount.value = '';
  total.value = '';
  count.value = '';
  category.value = '';
  total.innerHTML = '';
}
// Read
function show_data() {
  getTotal();
  let table = '';
  for (let i = 0; i < glasses_data.length; i++) {
    table += `
      <tr>
        <td>${glasses_data[i].id}</td>
        <td>${glasses_data[i].price}</td>
        <td>${glasses_data[i].discount}</td>
        <td>${glasses_data[i].total}</td>
        <td>${glasses_data[i].cat}</td>
        <td class="control_btns">
          <button onclick="edit_glass(${i})" class="control_btn" id="edit_btn">Edit</button>
          <button onclick="delete_glass(${i})" class="control_btn" id="delete_btn">Delete</button>
      </td>
    `;
  }
  document.getElementById('tbody').innerHTML = table;
  let del_all_btn = document.getElementById('delete_all');
  if (glasses_data.length > 0) {
    del_all_btn.innerHTML = `<button class="control_btn" onclick="delete_all()">Delete All (${glasses_data.length})</button>`;
  }else {
    del_all_btn.innerHTML = '';
  }
}
show_data();

// Delate
function delete_glass(i) {
  glasses_data.splice(i, 1);
  localStorage.glasses = JSON.stringify(glasses_data);
  show_data();
}

// Delete ALL
function delete_all() {
  localStorage.clear();
  glasses_data.splice(0);
  show_data();
}

// Update
function edit_glass(i) {
  id_inp.value = glasses_data[i].id;
  price.value = glasses_data[i].price;
  texes.value = glasses_data[i].texes;
  discount.value = glasses_data[i].discount;
  count.style.display = "none";
  category.value = glasses_data[i].cat;
  submit.innerHTML = "Update"
  getTotal();
  mood = 'update';
  glass_info = i;
  scroll({
    top: 0,
    behavior: "smooth"
  })
}
// Search
let search_mood = 'Id';
function getSearchMood(id) {
  if (id == 'search_id') {
    search_mood = 'Id';
  } else {
    search_mood = 'Category';
  }
  search_inp.placeholder = 'Search By ' + search_mood;
  search_inp.focus();
  search_inp.value = '';
  show_data();
}

function searchData(value) {
  let table = '';
  for (let i = 0; i < glasses_data.length; i++) {
    if (search_mood == 'Id') {
      if (glasses_data[i].id.includes(value)) {
        table +=
          `<tr>
          <td>${glasses_data[i].id}</td>
          <td>${glasses_data[i].price}</td>
          <td>${glasses_data[i].discount}</td>
          <td>${glasses_data[i].total}</td>
          <td>${glasses_data[i].cat}</td>
          <td class="control_btns">
            <button onclick="edit_glass(${i})" class="control_btn" id="edit_btn">Edit</button>
            <button onclick="delete_glass(${i})" class="control_btn" id="delete_btn">Delete</button>
        </td>`;
      }
    } else {
      if (glasses_data[i].cat.includes(value)) {
        table +=
          `<tr>
          <td>${glasses_data[i].id}</td>
          <td>${glasses_data[i].price}</td>
          <td>${glasses_data[i].discount}</td>
          <td>${glasses_data[i].total}</td>
          <td>${glasses_data[i].cat}</td>
          <td class="control_btns">
            <button onclick="edit_glass(${i})" class="control_btn" id="edit_btn">Edit</button>
            <button onclick="delete_glass(${i})" class="control_btn" id="delete_btn">Delete</button>
        </td>`;
      }
    }
  }
  document.getElementById('tbody').innerHTML = table;
}
// Clean data

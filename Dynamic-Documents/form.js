window.onload = function() {
  document.myform.onsubmit = function()  { return checkForm(); }
  // document.myform.lastNameInput.onblur = lastNameValidate;
  // document.getElementById("emailInput").onblur = emailValidate;
  // document.getElementById("informationInput").onblur = function() { informationValidate(); };
}

function checkForm() {

  var valid = true;

  // var emailInput = document.getElementById("emailInput");
  // var informationInput = document.getElementById("informationInput");
  // var paymantAmountInput = document.getElementById("paymantAmountInput");

  if(!nameValidation()) valid = false;
  if(!codeValidation()) valid = false;
  if(!priceValidation()) valid = false;
  if(!vatValidation()) valid = false;
  // if(!paymentValidate()) valid = false;

  //alert(valid);
  return valid;
}

function vatValidation () {
  var vat = document.getElementById("vat");
  var vatRegex= new RegExp("[0-9]+(.[0-9]){0,2}");

  if(vat.value == "") {
    document.getElementById("vatStatus").innerHTML = "VAT filed is required!";
    document.getElementById("vatStatus").style.display = "block";
    return false;
  } else if(!vatRegex.test(vat.value))
  {
    document.getElementById("vatStatus").innerHTML = "VAT must have contain numbers";
    document.getElementById("vatStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("vatStatus").style.display = "none";
    return true;
  }
}


function priceValidation(){
  var price = document.getElementById("price");
  var priceRegex= new RegExp("[0-9]+(.[0-9]){0,2}");
  var value = Number(price.value);
  var res = price.value.split(".");

  if(res.length == 1 || res[1].length < 3) {
    price.value = value.toFixed(2);
  }

  if(price.value == "") {
    document.getElementById("priceStatus").innerHTML = "Price filed is required!";
    document.getElementById("priceStatus").style.display = "block";
    return false;
  } else if(!priceRegex.test(price.value))
  {
    document.getElementById("priceStatus").innerHTML = "Price must have contain numbers";
    document.getElementById("priceStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("priceStatus").style.display = "none";
    return true;
  }
}

function codeValidation () {
  var code = document.getElementById("code");
  var codeRegex = new RegExp("[0-9a-zA-Z]{2}\-[0-9a-zA-Z]{2}")
  if(code.value == "") {
    document.getElementById("codeStatus").innerHTML = "Code filed is required!";
    document.getElementById("codeStatus").style.display = "block";
    return false;
  } else if(!codeRegex.test(code.value))
  {
    document.getElementById("codeStatus").innerHTML = "Code must have format XX-XX (letters and numbers)\"";
    document.getElementById("codeStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("codeStatus").style.display = "none";
    return true;
  }

}
function nameValidation () {

  var name = document.getElementById("name");
  var regexName = new RegExp("^[a-zA-Z]{0,10}$");

  if(name.value == "") {
    document.getElementById("nameStatus").innerHTML = "Name filed is required!";
    document.getElementById("nameStatus").style.display = "block";
    return false;
  } else if(!regexName.test(name.value))
  {
    document.getElementById("nameStatus").innerHTML = "Name contains invalid characters ( 10 letters and spaces only!)";
    document.getElementById("nameStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("nameStatus").style.display = "none";
    return true;
  }
}

function countBrutto() {
  var price = parseFloat(document.getElementById('price').value);
  var vat = parseFloat(document.getElementById('vat').value);
  price = isNaN(price) ? 0 : price;
  vat = isNaN(vat) ? 0 : vat;
  var total = (price*(vat/100))+price;
  console.log(total);

  document.getElementById('brutto').value = total;
}

// function addRow() {
//   var table = document.getElementById('products');
//   var row = document.createElement('tr');
//   var td1 = document.createElement('td');
//   var td2 = document.createElement('td');
//   var td3 = document.createElement('td');
//   var td4 = document.createElement('td');
//   var td5 = document.createElement('td');
//   var td6 = document.createElement('td');
//   var td7 = document.createElement('td');
//   var td8 = document.createElement('td');
//   td1.innerHTML = document.getElementById('name').value;
//   td2.innerHTML = document.getElementById('code').value;
//   td3.innerHTML = document.getElementById('price').value;
//   td4.innerHTML = document.getElementById('vat').value;
//   td5.innerHTML = document.getElementById('brutto').value;
//   td6.innerHTML = document.getElementById('category').value;
//   td7.innerHTML = document.getElementById('rate').value;
//   td8.innerHTML = document.getElementById('photo').value;
//   row.appendChild(td1);
//   row.appendChild(td2);
//   row.appendChild(td3);
//   row.appendChild(td4);
//   row.appendChild(td5);
//   row.appendChild(td6);
//   row.appendChild(td7);
//   row.appendChild(td8);
//
//   table.children[0].insertBefore(row, table.children[0].childNodes[1]);
// }

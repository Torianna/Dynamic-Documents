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
  // if(!emailValidate()) valid = false;
  // if(!informationValidate()) valid = false;
  // if(!paymentValidate()) valid = false;

  //alert(valid);
  return valid;
}

function codeValidation () {
  var code = document.getElementById("code");
  var codeRegex = new RegExp("[0-9][a-zA-Z]{2}-[0-9][a-zA-Z]{2}")
  if(code.value == "") {
    document.getElementById("codeStatus").innerHTML = "Code filed is required!";
    document.getElementById("codeStatus").style.display = "block";
    return false;
  } else if(!codeRegex.test(code))
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
  } else if(!regexName.test(name))
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

// function validateForm () {
//   var regexName = new RegExp("^[a-zA-Z]{0,10}$");
//   var codeRegex = new RegExp("[0-9][a-zA-Z]{2}-[0-9][a-zA-Z]{2}")
//   var priceRegex= new RegExp("[0-9]+.[0-9]{0,2}")
//   var name = document.forms["myform"]["name"].value;
//   var code = document.forms["myform"]["code"].value;
//   var price = document.forms["myform"]["price"].value;
//
//   var value = Number(price);
//   var res = price.split(".");
//
//
//   if(res.length == 1 || res[1].length < 3) {
//     price = value.toFixed(2);
//     console.log(price);
//   }
//
//
//
//   } else if (!codeRegex.test(code)) {
//     alert("Code must have format XX-XX (letters and numbers)");
//     return false;}
//
//     if (price == null || pricw == "") {
//       alert("Price must not be blank");
//       return false;
//     } else if (!priceRegex.test(price)) {
//       alert("Price must have contain numbers");
//       return false;
//   } else {
//     return true;
//   }
//
// }

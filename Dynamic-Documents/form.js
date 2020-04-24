window.onload = function() {
  document.getElementById('summary').value = " ";
}
//var nazwa;
var cos;
var suma;
var sel;
var products;
var priceMap = new Map();

function countBasket (name,cos,count) {
  console.log("Nazwa: "+name.toString()+", price: "+cos+", ilosc: "+count)
  sum=cos*count
  priceMap.delete(name)
  priceMap.set(name,sum)
  var value=priceMap.get(name)
  countPriceMap()
}

function countPriceMap () {
  suma=0;
  sel=0
  for (let value of priceMap.values()) {
    suma+=parseFloat(value)
  }
  sel=document.getElementById('delivery').value
  suma+=parseFloat(sel)
  document.getElementById('summary').value = suma;
  suma=0
}

function getProducts () {


   fetch("product.json")
     .then(function (resp) {
       return resp.json();
       
     })
     .then(function (data) {
       console.log(data)
       for (i in data.rows) {
         var row = document.createElement('tr')
         wiersz = data.rows[i];

         for (i in wiersz) {
           if (i==wiersz.length-1) break
           var td1 = document.createElement('td')
           td1.innerHTML = wiersz[i]
           row.appendChild(td1)

         }
         var td2 = document.createElement('td')
         td2.innerHTML = "<img src=\""+wiersz[wiersz.length-1]+"\" onerror=\" this.src = 'error.jpg'\" class='image'>"

         row.appendChild(td2)

         var td3 = document.createElement('td')

         td3.innerHTML = "<a class=\"delete\" title=\"Delete\" data-toggle=\"tooltip\" style=\"margin-right: 20px\"><i class=\"fas fa-trash-alt\" style=\"color: red\" ></i></a>\n" +
           "<a class=\"edit\" title=\"Edit\" data-toggle=\"tooltip\" style=\"margin-right: 20px\"><i class=\"fas fa-edit\" style=\"color: orange\"></i></a>\n" +
           "<a class=\"add\" title=\"Add\" data-toggle=\"tooltip\" style=\"display:none \"><i class=\"fas fa-plus\" style=\"color: green\" ></i></a>"
           + "<a class=\"basket\" title=\"Basket\" data-toggle=\"tooltip\"><i class=\"fas fa-shopping-basket\" style=\"color: blue\" ></i></a>";

         row.appendChild(td3)
          $row = $(row),
         //   // resort table using the current sort; set to false to prevent resort, otherwise
         //   // any other value in resort will automatically trigger the table resort.
            resort = true
          $('#products')
            .find('tbody').append($row)
           .trigger('addRows', [$row, resort])



       }
       return false

     })
}


function buy () {
  $('#basket')
    .find('tbody').remove()
  localStorage.removeItem(products)
  $('#exampleModal').modal('toggle')
  alert("Transaction complited")

}


//dodawanie produktów do koszyka
function call () {
  var my_table=localStorage.getItem("row");
  localStorage.removeItem("row")
  var table=my_table.split(",");
  var nazwa=table[0]
  cos=table[4]
  priceMap.set(nazwa,cos)

  localStorage.setItem("product", JSON.stringify(my_table));

  products = JSON.parse(localStorage.getItem("product"));

  var row = document.createElement('tr')
  var td1 = document.createElement('td')
  var td2 = document.createElement('td')
  var td3 = document.createElement('td')
  td1.innerHTML = nazwa
  td2.innerHTML = cos
  td3.innerHTML = "<input id=\"count\" name=\""+nazwa+ "\" type=\"number\" min=\"0\" placeholder=\"1\" style=\"width:50px; height:20px\" value='1'  onchange=\"countBasket(name,cos,value)\">"

  row.appendChild(td1)
  row.appendChild(td2)
  row.appendChild(td3)

  $row = $(row),
    // resort table using the current sort; set to false to prevent resort, otherwise
    // any other value in resort will automatically trigger the table resort.
    resort = true
  $('#basket')
    .find('tbody').append($row)
    .trigger('addRows', [$row, resort])

  return false
}


function checkForm() {

  var valid = true;

  if(!nameValidation()) valid = false;
  if(!codeValidation()) valid = false;
  if(!priceValidation()) valid = false;
  if(!vatValidation()) valid = false;
 // if(!categoryValidation()) valid=false;

  return valid;
}


function categoryValidation()
{
  document.getElementById("categoryStatus").innerHTML = "<span style='color: green;'>Success</span>";
  document.getElementById("category").className = "form-control is-valid";
  document.getElementById("categoryStatus").style.display = "block";
  return false;
}

function optionValidation()
{
  document.getElementById("optionStatus").innerHTML = "<span style='color: green;'>Success</span>";
  document.getElementById("option").className = "form-control is-valid";
  document.getElementById("optionStatus").style.display = "block";
  return false;
}

function vatValidation () {
  var vat = document.getElementById("vat");
  var vatRegex= new RegExp("[0-9]+(.[0-9]){0,2}");

  if(vat.value == "") {
    document.getElementById("vatStatus").innerHTML = "VAT filed is required!";
    document.getElementById("vat").className = "form-control is-invalid";
    document.getElementById("vatStatus").style.display = "block";
    return false;
  } else if(!vatRegex.test(vat.value))
  {
    document.getElementById("vatStatus").innerHTML = "VAT must have contain numbers";
    document.getElementById("vat").className = "form-control is-invalid";
    document.getElementById("vatStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("vatStatus").innerHTML = "<span style='color: green;'>Success</span>";
    document.getElementById("vat").className = "form-control is-valid";
    document.getElementById("vatStatus").style.display = "block";
    return true;
  }
}


function priceValidation(){
  var price = document.getElementById("price");
  var priceRegex= new RegExp("[0-9]+(.[0-9]){0,2}");

  if(price.value == "") {
    document.getElementById("priceStatus").innerHTML = "Price filed is required!";
    document.getElementById("price").className = "form-control is-invalid";
    document.getElementById("priceStatus").style.display = "block";
    return false;
  } else if(!priceRegex.test(price.value))
  {
    document.getElementById("priceStatus").innerHTML = "Price must have contain numbers";
    document.getElementById("price").className = "form-control is-invalid";
    document.getElementById("priceStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("priceStatus").innerHTML = "<span style='color: green;'>Success</span>";
    document.getElementById("price").className = "form-control is-valid";
    document.getElementById("priceStatus").style.display = "block";
    if(price.value.indexOf(".")===-1)
    {price.value=`${price.value}.00`}
    return true;
  }


}

function codeValidation () {
  var code = document.getElementById("code");
  var codeRegex = new RegExp("[0-9a-zA-Z]{2}\-[0-9a-zA-Z]{2}")
  if(code.value == "") {
    document.getElementById("codeStatus").innerHTML = "Code filed is required!";
    document.getElementById("code").className = "form-control is-invalid";
    document.getElementById("codeStatus").style.display = "block";
    return false;
  } else if(!codeRegex.test(code.value))
  {
    document.getElementById("codeStatus").innerHTML = "Code must have format XX-XX (letters and numbers)\"";
    document.getElementById("code").className = "form-control is-invalid";
    document.getElementById("codeStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("codeStatus").innerHTML = "<span style='color: green;'>Success</span>";
    document.getElementById("code").className = "form-control is-valid";
    document.getElementById("codeStatus").style.display = "block";
    return true;
  }

}
function nameValidation () {

  var name = document.getElementById("name");
  var regexName = new RegExp("^[a-zA-Z]{0,10}$");

  if(name.value == "") {
    document.getElementById("nameStatus").innerHTML = "Name filed is required!";
    document.getElementById("name").className = "form-control is-invalid";
    document.getElementById("nameStatus").style.display = "block";
    return false;
  } else if(!regexName.test(name.value))
  {
    document.getElementById("nameStatus").innerHTML = "Name contains invalid characters ( 10 letters and spaces only!)";
    document.getElementById("name").className = "form-control is-invalid";
    document.getElementById("nameStatus").style.display = "block";
    return false;
  }
  else {
    document.getElementById("nameStatus").innerHTML = "<span style='color: green;'>Success</span>";
    document.getElementById("name").className = "form-control is-valid";
    document.getElementById("nameStatus").style.display = "block";
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


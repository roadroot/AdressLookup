

function fetch(name, postcode, limit, autocomplete, lon, lat, type, async = true) {
  let url = "";
  if (name) url += "?q=" + name;
  if (postcode) url += (url ? "&" : "?") + "postcode=" + postcode;
  if (limit) url += (url ? "&" : "?") + "limit=" + limit;
  if (autocomplete) url += (url ? "&" : "?") + "autocomplete=" + autocomplete;
  if (lon) url += (url ? "&" : "?") + "lon=" + lon;
  if (lat) url += (url ? "&" : "?") + "lat=" + lat;
  if (lat) type += (url ? "&" : "?") + "type=" + type;
  url = "https://api-adresse.data.gouv.fr/search/" + url;
  console.log(url);
  let v = null;
  let back = $.get({ url: url, dataType: "json", success: function (data) { v = data; }, async});
  return async?back:v;
}

function onQuery() {
  let name = document.getElementById("name").value;
  let postcode = document.getElementById("post-code").value;
  let limit = document.getElementById("limit").value;
  let lon = document.getElementById("lon").value;
  let lat = document.getElementById("lat").value;
  let type = document.getElementById("type").value;
  domResult = document.getElementById("result");
  domResult.innerHTML = '';
  if(!name) {
    alert("Please fill at least Find field");
    return;
  }
  new Promise(() => {
    result = fetch(name, postcode, limit, true, lon, lat, type, async = false).features;
    console.log(result)
    table = document.createElement("table");
    domResult.appendChild(table)
    console.log(result)
    if(result.length == 0)
      alert('0 addresses found');

    table.appendChild(createCouple("Properties", "Values"))
    table.appendChild(createCouple("Geometry", `${result[res].geometry.coordinates[1]},${result[res].geometry.coordinates[0]}`))
    table.appendChild(createCouple("City Code :", `${result[res].properties.citycode}`))
    table.appendChild(createCouple("Context :", `${result[res].properties.context}`))
    table.appendChild(createCouple("id : ",  `${result[res].properties.id}`))
    table.appendChild(createCouple("Importance :", `${result[res].properties.importance}`))
    table.appendChild(createCouple("label :", `${result[res].properties.label}`))
    table.appendChild(createCouple("Name : ", `${result[res].properties.name}`))
    table.appendChild(createCouple("Postcode :", `${result[res].properties.postcode}`))
    table.appendChild(createCouple("Score :", `${result[res].properties.score}`))
    table.appendChild(createCouple("Type : ", `${result[res].properties.type}`))
    table.appendChild(createCouple("X :", `${result[res].properties.x}`))
    table.appendChild(createCouple("Y :", `${result[res].properties.y}`))
    document.getElementById("navigation").style.display = 'block'
  });
}

function createCouple(name, value) {
  let tr = document.createElement("tr");
  let nm = document.createElement("td");
  let nameNode = document.createTextNode(name);
  nm.appendChild(nameNode);

  let val = document.createElement("td");
  let valNode = document.createTextNode(value);
  val.appendChild(valNode);

  tr.appendChild(nm);
  tr.appendChild(val);
  return tr;
}
/*********************************************************** */
var res = 0;
var table = document.createElement("table");
var result;




function nextPage() {
  res++;
  if(res > result.length - 1 ){
    res--;
    alert("Derniere page !");
  }else{
    table.innerHTML = '';
    affichageTableau(res);
  }
}

function previousPage() {
  if(res > 0){
    res--;
    table.innerHTML = '';
    affichageTableau(res);
  }else{
    alert("1ere valeur affichée")
  }
}

function affichageTableau(res){
  table.appendChild(createCouple("Properties", "Values"))
  table.appendChild(createCouple("Geometry", `${result[res].geometry.coordinates[1]},${result[res].geometry.coordinates[0]}`))
  table.appendChild(createCouple("City Code :", `${result[res].properties.citycode}`))
  table.appendChild(createCouple("Context :", `${result[res].properties.context}`))
  table.appendChild(createCouple("id : ",  `${result[res].properties.id}`))
  table.appendChild(createCouple("Importance :", `${result[res].properties.importance}`))
  table.appendChild(createCouple("label :", `${result[res].properties.label}`))
  table.appendChild(createCouple("Name : ", `${result[res].properties.name}`))
  table.appendChild(createCouple("Postcode :", `${result[res].properties.postcode}`))
  table.appendChild(createCouple("Score :", `${result[res].properties.score}`))
  table.appendChild(createCouple("Type : ", `${result[res].properties.type}`))
  table.appendChild(createCouple("X :", `${result[res].properties.x}`))
  table.appendChild(createCouple("Y :", `${result[res].properties.y}`))
}


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
    let result = fetch(name, postcode, limit, true, lon, lat, type, async = false).features;
    console.log(result)
    let table = document.createElement("table");
    domResult.appendChild(table)
    console.log(result)
    if(result.length == 0)
      alert('0 addresses found');
    for (res in result) {
      table.appendChild(createCouple("geometry", `${result[res].geometry.coordinates[1]},${result[res].geometry.coordinates[0]}`))
    }
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
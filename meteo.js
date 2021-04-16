

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
    $("#predContainer")[0].className="col-md-4";
    $("#succContainer")[0].className="col-md-4";
    $("#resultContainer")[0].className="col-md-4";
    setTimeout("alert('Please fill at least Find field');", 20);
    return;
  }
  new Promise(() => {
    result = fetch(name, postcode, limit, true, lon, lat, type, async = false).features;
    console.log(result)
    console.log(result)
    if(result.length == 0) {
      $("#predContainer")[0].className="col-md-4";
      $("#succContainer")[0].className="col-md-4";
      $("#resultContainer")[0].className="col-md-4";
      setTimeout("alert('0 addresses found');", 20);
    }
    $("#predContainer")[0].className="col-md-1";
    $("#succContainer")[0].className="col-md-1";
    $("#resultContainer")[0].className="col-md-6";
    table = generateDataTable(result);
    domResult.appendChild(table);
    $("#dataTable").dataTable({limit: 10});
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

function generateDataTable(result) {
  let dataTable = document.createElement("table");
  dataTable.className="table table-striped table-bordered";
  dataTable.style = "width:100%";
  dataTable.id = "dataTable";
  let thead = document.createElement("thead");
  dataTable.appendChild(thead);
  let props = ["name", "Postcode", "Context", "Type", "Geometry"];
  let tr = document.createElement("tr");
  thead.appendChild(tr);
  for(let prop of props) {
    let th = document.createElement("th");
    th.innerHTML = prop;
    tr.appendChild(th);
  }
  let tbody = document.createElement("tbody");
  dataTable.appendChild(tbody);
  for(let item of result) {
    let tr = document.createElement("tr");
    tbody.appendChild(tr);
    for(let prop of props) {
      let td = document.createElement("td");
      td.innerHTML = prop == "Geometry"?`(${item.geometry.coordinates[1]}, ${item.geometry.coordinates[0]})`:item.properties[prop.toLowerCase()]
      tr.appendChild(td);
    }
  }
  return dataTable;
}

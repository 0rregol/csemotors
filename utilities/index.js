const invModel = require("../models/inventory-model")
const Util = {}

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications()
  let list = "<ul>"
  list += '<li><a href="/" title="Home page">Home</a></li>'
  data.rows.forEach((row) => {
    list += "<li>"
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>"
    list += "</li>"
  })
  list += "</ul>"
  return list
}

module.exports = Util

/* **************************************
* Build the classification view HTML
* ************************************ */
Util.buildClassificationGrid = async function(data){
  let grid
  if(data.length > 0){
    grid = '<ul id="inv-display">'
    data.forEach(vehicle => { 
      grid += '<li>'
      grid +=  '<a href="../../inv/detail/'+ vehicle.inv_id 
      + '" title="View ' + vehicle.inv_make + ' '+ vehicle.inv_model 
      + 'details"><img src="' + vehicle.inv_thumbnail 
      +'" alt="Image of '+ vehicle.inv_make + ' ' + vehicle.inv_model 
      +' on CSE Motors" /></a>'
      grid += '<div class="namePrice">'
      grid += '<hr />'
      grid += '<h2>'
      grid += '<a href="../../inv/detail/' + vehicle.inv_id +'" title="View ' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + ' details">' 
      + vehicle.inv_make + ' ' + vehicle.inv_model + '</a>'
      grid += '</h2>'
      grid += '<span>$' 
      + new Intl.NumberFormat('en-US').format(vehicle.inv_price) + '</span>'
      grid += '</div>'
      grid += '</li>'
    })
    grid += '</ul>'
  } else { 
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>'
  }
  return grid
}
/* **************************************
 Build the vehicle detail view HTML
 * ************************************ */
Util.buildVehicleDetail = async function(vehicle) {
  if (!vehicle) {
    return '<p class="notice">Error: No se proporcionaron datos del vehículo.</p>';
  }

  
  const formattedPrice = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0 
  }).format(vehicle.inv_price);

 
  const formattedMileage = new Intl.NumberFormat('en-US').format(vehicle.inv_miles);

  let detailHTML = '<div id="detail-wrapper">';
  
  
  detailHTML += `<div class="detail-image">
    <img src="${vehicle.inv_image}" alt="Imagen de ${vehicle.inv_make} ${vehicle.inv_model} en CSE Motors">
  </div>`;
  
 
  detailHTML += `<div class="detail-info">
    <h2>Detalles del ${vehicle.inv_make} ${vehicle.inv_model}</h2>
    <ul class="detail-list">
      <!-- Precio (Resaltado) -->
      <li class="price-highlight"><span class="detail-label">Price:</span> ${formattedPrice}</li>
      <hr>
      <!-- Descripción -->
      <li><span class="detail-label">Description:</span> ${vehicle.inv_description}</li>
      <hr>
      <!-- Color -->
      <li><span class="detail-label">Color:</span> ${vehicle.inv_color}</li>
      <hr>
      <!-- Millaje -->
      <li><span class="detail-label">Miles:</span> ${formattedMileage}</li>
    </ul>
  </div>`;

  detailHTML += '</div>'; 
  
  return detailHTML;
}

Util.messages = function() {
  
  return ""
}

Util.handleErrors = (err, req, res, next) => {
  let nav = res.locals.nav;
  console.error(`Error de Servidor: ${err.message}`);
  
 
  const status = err.status || 500;
  
 
  let message;
  if (status === 404) {
    message = 'Sorry, that page could not be found.';
  } else {
    
    message = 'Oh no! There was a crash. Maybe try a different route?';
  }

  res.status(status).render("errors/error", {
    title: `Error ${status}`,
    message: message,
    nav,
  });
}

module.exports = Util;

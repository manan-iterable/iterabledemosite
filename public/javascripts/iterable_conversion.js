$(function() {

    console.log("Page loaded....");
    // // Function to get the value of a URL parameter
    // function getUrlParameter(name) {
    //   name = name.replace(/[\[\]]/g, '\\$&');
    //   var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    //   var results = regex.exec(window.location.href);
    //   if (!results) return null;
    //   if (!results[2]) return '';
    //   return decodeURIComponent(results[2].replace(/\+/g, ' '));
    // }

    // // Parameters to check
    // var params = ['campaignId', 'templateId', 'email'];

    // // Object to hold parameter values
    // var paramValues = {};

    // // Check and store each parameter in session storage
    // params.forEach(function(param) {
    //   var value = getUrlParameter(param);
    //   if (value) {
    //     sessionStorage.setItem(param, value);
    //   }
    //   paramValues[param] = sessionStorage.getItem(param) || 'Not Available';
    // });

    // // Create the table
    // var table = $('<table>').attr('border', '1');

    // // Create table header
    // var header = $('<tr>');
    // header.append($('<th>').text('Parameter'));
    // header.append($('<th>').text('Value'));
    // table.append(header);

    // // Insert parameter values into the table
    // params.forEach(function(param) {
    //   var row = $('<tr>');
    //   row.append($('<td>').text(param));
    //   row.append($('<td>').text(paramValues[param]));
    //   table.append(row);
    // });

    // // Append the table to the div
    // $('#parameter-table').append(table);
  });
$(document).ready(function () {
  
  if (getWinterOrSummer() === "summer") {
    $(".hero-image").addClass("summer-image");
  } else {
    $(".hero-image").addClass("winter-image");
  }

  var script = document.createElement('script');

  script.setAttribute('type', 'text/template');
  script.setAttribute('id', 'menuTemplate');

  script.text = '<div class="menu-anchor"></div>\n' +
    '<div class="menu">\n' +
      '<ul class="row">\n' +
        '<% items.forEach(function(item, ix) { %>\n' +
        '<li>\n' +
          '<div class="item <% if (item.isSelected) { print(\'active\') } %>" onclick="window.location.href = \'<%= item.href %>\'">\n' +
            '<%= item.name %>\n' +
            '<% if (item.children && item.children.length) { %>\n' +
              '<div class=\'submenu\'>' +
                '<% item.children.forEach(function(subitem, ix) { %>' +
                  '<div class="subitem" onclick="window.location.href = \'<%= subitem.href %>\'">\n' +
                    '<%= subitem.name %>\n' +
                  '</div>\n' +
                '<% });%>' +
              '</div>' +
            '<% } %>\n' +
          '</div>\n' +
        '</li>\n' +
        '<% }); %>\n' +
      '</ul>\n' +
    '</div>\n';

  document.body.appendChild(script);

  var jungleMenu = new Jungle.Menu({
    container: document.querySelector(".jungle-menu"),
    config: "scripts/menu-config.json",
    isSticky: true
  });

  jungleMenu.addListener(Jungle.Menu.LOAD_COMPLETE, function () {
    console.log('Load completed', jungleMenu.configData);

    jungleMenu.configData.items.forEach(function (item) {
      if (window.location.href.indexOf(item.href) != -1) {
        item.isSelected = true;
      }
    });

    $('a').on('click touchend', function(e) {
      var link = $(this).attr('href');
      console.log('going to', link);
      window.location = link;
    });
  });
});

function toggleMenuItem(item) {
  obj = document.getElementById(item);
  col = document.getElementById("x" + item);

  if (obj.style.display === "" || obj.style.display === 'none') {
    obj.style.display = "block";
    col.innerHTML = '<i class="fa fa-minus"></i>';
  } else {
    obj.style.display = "none";
    col.innerHTML = '<i class="fa fa-plus"></i>';
  }
}

function getWinterOrSummer(options) {

  var settings = _.extend({
    summerStartMonth : 2,
    summerStartDay : 20,
    winterStartMonth : 8,
    winterStartDay : 22,
  }, options);

  var currentDate = new Date();
  var month = currentDate.getMonth();
  var day = currentDate.getDay();

  if (month > settings.summerStartMonth && month < settings.winterStartMonth) {
    return "summer"
  } else if ( month < settings.summerStartMonth || month > settings.winterStartMonth) {
    return "winter"
  } else if (month === settings.summerStartMonth) {
    if (day >= settings.summerStartDay) {
      return "summer"
    } else {
      return "winter"
    }
  } else {  
    if (day < settings.winterStartDay) {
      return "summer"
    } else {
      return "winter"
    }
  }
}
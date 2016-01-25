$(document).ready(function () {
  var script = document.createElement('script');

  script.setAttribute('type', 'text/template');
  script.setAttribute('id', 'menuTemplate');

  script.text = '<div class="menu-anchor"></div>\n' +
    '<div class="menu">\n' +
      '<ul class="row">\n' +
        '<% items.forEach(function(item) { %>\n' +
        '<li>\n' +
          '<a href="<%= item.href %>" target="<%= item.target || \'_self\' %>">\n' +
            '<div class="item <% if (item.isSelected) { print(\'active\') } %>">\n' +
              '<%= item.name %>\n' +
              '<% if (typeof item.subtitle !== "undefined") { %>\n' +
              '<div class="subtitle"><%= item.subtitle %></div>\n' +
              '<% }; %>\n' +
            '</div>\n' +
          '</a>\n' +
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
});

function toggleMenuItem(item) {
  obj = document.getElementById(item);
  col = document.getElementById("x" + item);

  if (obj.style.display === "" || obj.style.display === 'none') {
    obj.style.display = "block";
    col.innerHTML = "[Truncate]";
  } else {
    obj.style.display = "none";
    col.innerHTML = "[Expand]";
  }
}
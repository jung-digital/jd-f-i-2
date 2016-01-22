$.get("scripts/menu-config.json", function(data) {

	var jungleMenu = new Jungle.Menu({
			container: document.querySelector(".jungle-menu"),
			config: data,
			isSticky: true
		})

	jungleMenu.render();
  
});

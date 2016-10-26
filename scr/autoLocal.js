/*
	autoLocal v1.0
	(c) 2016 by Michel Thiel
	--------
	
	www.thielicious.de
	www.claxdesign.com
	thielicious.github.io
*/


(function autoLocal() {							// self-execution
	
	var localhost = "http://localhost/",		// this will replace the XAMPP folder
		regex = /file:///C://xampp/htdocs//g;	// default XAMPP folder				

	this.current =()=> { 						// turns the current path into a string

		return window.location.toString();
	}					

	autoLocal.prototype.change =(()=> {			// checks if it matches and modifies the current path

		if (this.current().match(regex)) {

			var modified = 
				localhost + this.current().substring(
					this.current().lastIndexOf(
					
						(()=> { 				// catches the page folder inside htdocs
						
							var folder = this.current().substring(
									this.current().lastIndexOf(
									'/htdocs/')
								+1);
								
							return folder.split('/')[1]; 
						})()
					)
				);

			window.location.href = modified;	// spits out the modified URL and refresh page
		}
	})();
	
})();
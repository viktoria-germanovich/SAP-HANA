sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("user_display.controller.App", {
        onInit: function () {
			console.log("controller init")
		},
			createUser: function () {
				var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
				console.log(Name);
	
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users",
					"method": "POST",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false,
					"data": "{\"name\": \"" + Name  + "\"}"
				};
	
				$.ajax(settings).done(function (response) {
					console.log(response);
				});		
				
		},
		updateUser: function () {
			var Name = sap.ui.getCore().byId(this.getView().sId + "--input_name").getValue();
			var Id = sap.ui.getCore().byId(this.getView().sId + "--input_id").getValue();
			console.log(Name);

			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Users('" + Id + "')",
				"method": "PUT",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"name\": \"" + Name  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}
     });
});
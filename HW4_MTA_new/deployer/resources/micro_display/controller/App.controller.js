sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {
        onInit: function () {
			console.log("controller init")
		},
			createMicrowave: function () {
				var Brand = sap.ui.getCore().byId(this.getView().sId + "--input_brand").getValue();
				console.log(Brand);
	
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Microwaves",
					"method": "POST",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false,
					"data": "{\"brand\": \"" + Brand  + "\"}"
				};
	
				$.ajax(settings).done(function (response) {
					console.log(response);
				});		
				
		},
		updateMicrowave: function () {
			var Brand = sap.ui.getCore().byId(this.getView().sId + "--input_brand").getValue();
			var Id = sap.ui.getCore().byId(this.getView().sId + "--input_id").getValue();
			
			var settings = {
				"async": true,
				"crossDomain": true,
				"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsodata/himta.xsodata/Microwaves('" + Id + "')",
				"method": "PUT",
				"headers": {
					"content-type": "application/json"
				},
				"processData": false,
				"data": "{\"brand\": \"" + Brand  + "\"}"
			};

			$.ajax(settings).done(function (response) {
				console.log(response);
			});
		}
     });
});
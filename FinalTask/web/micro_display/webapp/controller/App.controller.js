sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {
		
		onInit: function () {
			this.oTable = this.getView().byId("microTable");
			this.mModel = this.getView().getModel("microModel");
			this.cModel = this.getView().getModel("configModel");
		},

		createMicrowave: function () {
			var Brand = this.mModel.getProperty("/brand");
			var Color = this.mModel.getProperty("/color");
			if (Brand === "" || Color === "") {
				MessageToast.show("Type in a brand and a color!");
			} else {

				var obj = this.mModel.getData();
				delete obj.ts_update;
				delete obj.ts_create;
				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.create('/Microwaves', obj, {
					sucsess: function () {
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
		},
		
		updateMicrowave: function () {
			
			var oSelectedItem =this.oTable.getSelectedItem();
			var index = this.oTable.indexOfItem(oSelectedItem);
			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = oSelectedItem.getBindingContext("microwaves").getProperty("microid");

				var obj = this.mModel.getData();

				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.update("/Microwaves('" + microid + "')", obj, {
					merge: false,
					success: function () {
						jQuery.sap.log.info("Sucsess");
					},
					error: function () {
						jQuery.sap.log.error("Error");
					}
				});
			}
		},
		deleteMicrowave: function () {
			var oSelectedItem = this.oTable.getSelectedItem();
			var index = this.oTable.indexOfItem(oSelectedItem);

			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = this.oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;
				var settings = {
					"async": true,
					"crossDomain": true,
					"url": "https://p2001081171trial-p2001081171trial-space1-router.cfapps.eu10.hana.ondemand.com/api/xsjs/microwave/microwave.xsjs?microid=" + microid,
					"method": "DELETE",
					"headers": {
						"content-type": "application/json"
					},
					"processData": false
				};
				$.ajax(settings).done(function (response) {
					console.log(response);
					oSelectedItem.getBindingContext("microwaves").getModel().refresh(true);
				});
			}
		},

		checkDone: function (oEvent) {
			var check = oEvent.getParameter("selected");
			this.cModel.setProperty("/bool",check);
		},

		selectFridge: function () {
			var selItem = this.oTable.getSelectedItem();
			var obj = selItem.getBindingContext("microwaves").getObject();
			this.byId("dateCreate").setText(obj.ts_create);
			this.byId("dateUpdate").setText(obj.ts_update);
			//   },

			//   onDialogPress: function () {
			// 	if (!this.pressDialog) {
			// 		this.pressDialog = new Dialog({
			// 			title: 'Serivices',
			// 			content: new List({
			// 				items: {
			// 					path: '/ProductCollection',
			// 					template: new StandardListItem({
			// 						title: "{Name}",
			// 						counter: "{Quantity}"
			// 					})
			// 				}
			// 			}),
			// 			beginButton: new Button({
			// 				text: 'Close',
			// 				press: function () {
			// 					this.pressDialog.close();
			// 				}.bind(this)
			// 			})
			// 		});

			// 		//to get access to the global model
			// 		this.getView().addDependent(this.pressDialog);
			// 	}

			// 	this.pressDialog.open();
			// }
		}
	});
});
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("micro_display.controller.App", {
		onInit: function () {
			this.mModel = this.getView().getModel("microModel");
		},

		createMicrowave: function () {
			// var Brand = this.getView().byId("input_brand").getValue();
			var Brand = this.mModel.getProperty("/brand");
			var Color = this.getView().byId("input_color").getValue();
			if (Brand === "" || Color === "") {
				MessageToast.show("Type in a brand and a color!");
			} else {
				var oModel = {};
				oModel.brand = Brand;
				oModel.color = Color;

				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.create('/Microwaves', oModel, {
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
			var oTable = this.getView().byId("microTable");
			var Brand = this.getView().byId("input_brand").getValue();
			var Color = this.getView().byId("input_color").getValue();
			var oSelectedItem = oTable.getSelectedItem();
			var index = oTable.indexOfItem(oSelectedItem);
			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;

				var oModel = {};
				oModel.brand = Brand;
				oModel.color = Color;
				oModel.ts_update = null;
				oModel.ts_create = null;

				var oDataModel = this.getView().getModel("microwaves");
				oDataModel.update("/Microwaves('" + microid + "')", oModel, {
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
			var oTable = this.getView().byId("microTable");
			var oSelectedItem = oTable.getSelectedItem();
			var index = oTable.indexOfItem(oSelectedItem);

			if (index === -1) {
				MessageToast.show("Row is not selected!");
			} else {
				var microid = oTable.getSelectedItem().getBindingContext("microwaves").getObject().microid;
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
			if (check) {
				this.getView().byId("input_brand").setEnabled(true);
				this.getView().byId("input_color").setEnabled(true);
				this.getView().byId("createButton").setEnabled(true);
				this.getView().byId("updateButton").setEnabled(true);
			} else {
				this.getView().byId("input_brand").setEnabled(false);
				this.getView().byId("input_color").setEnabled(false);
				this.getView().byId("createButton").setEnabled(false);
				this.getView().byId("updateButton").setEnabled(false);
			}
		},

		selectFridge: function() {
			var oTable = this.byId("microTable");
			var selItem = oTable.getSelectedItem();
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
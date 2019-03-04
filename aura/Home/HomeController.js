({
	doInit : function(component, event, helper) {
		component.set("v.roomType", "Any");
		component.set("v.errorSwitch", "false");
		component.set("v.tv", "true");
		component.set("v.minibar", "true");
		component.set("v.balcony", "true");
		component.set("v.bathroom", "true");
		
	},

	storeHotelId : function(component, event, helper) {
		component.set("v.hotelId", event.getParam("hotelId"));
	},

	handleRoomTypeSelect : function(component, event, helper) {
		if(component.find('roomTypeSelect').get('v.value')){
			component.set("v.roomType", component.find('roomTypeSelect').get('v.value'));
		}
	}, 

	handleDateInput : function(component, event, helper) {
	}, 

	handleButtonClick : function(component, event, helper) {
		
		if(helper.validInputs(component)){
			
			let newEvent = component.getEvent("sendRoomInputValues");
			newEvent.setParams({
				"hotelId": component.get("v.hotelId"),
				"roomType": component.get("v.roomType"),
				"startDate": component.get("v.startDate"),
				"endDate": component.get("v.endDate"),
				"tv": component.get("v.tv"),
				"minibar": component.get("v.minibar"),
				"bathroom": component.get("v.bathroom"),
				"balcony": component.get("v.balcony"),
			});
			newEvent.fire(); 
		}
		else{
			console.log("Validation failed hard!");
		}
		console.log(component.get('v.tv'));
		console.log(component.get('v.balcony'));
		console.log(component.get('v.bathroom'));
		console.log(component.get('v.minibar'));
		
	}, 
})
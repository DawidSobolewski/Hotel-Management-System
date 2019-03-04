({
	handleChange : function(component, event, helper) {
		console.log("Wchodzi?");
		console.log(
			component.get("v.FirstName"),
			component.get("v.LastName"),
			component.get("v.Email")
		);
		let newEvent = component.getEvent("sendNewClientInput");
		newEvent.setParams({
			"FirstName": component.get("v.FirstName"),
			"LastName": component.get("v.LastName"),
			"Email": component.get("v.Email")
		});
		newEvent.fire();   
		console.log("Wchodzi!");
	}
})
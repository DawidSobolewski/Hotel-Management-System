({
	doInit : function(component, event, helper) {
		component.set('v.columns',[
			{label: 'Room Number', fieldName: 'Room_Number__c', type: 'number'},
			{label: 'Room Type', fieldName: 'Type__c', type: 'text'},
			{label: 'Bathroom', fieldName: 'Bathroom_included__c', type: 'boolean'},
			{label: 'Balcony', fieldName: 'Balcony_included__c', type: 'boolean'},
			{label: 'TV', fieldName: 'TV__c', type: 'boolean'},
			{label: 'Minibar', fieldName: 'Minibar__c', type: 'boolean'},
			{label: 'Cost', fieldName: 'Cost__c', type: 'currency'},
		]);
	},

	setCustomer : function(component, evnet, helper){
		component.set('v.customer', this.handleCreateClientClick);
	},

	handleNewClientClick: function(component, event, helper){
		let details = component.find('details');
		if(details){
			details.destroy();
			component.find('newClientButton').destroy();
			
		}
		
		helper.createNewClientForm(component);
		helper.createNewClientFormButton(component);
	},

	handleCancelClick: function(component, event, helper){

		component.destroy(); 
		
	},
	handleCreateClientClick: function(component, event, helper){
		helper.insertNewClient(
			component,
			component.get("v.FirstName"),
			component.get("v.LastName"),
			component.get("v.Email")
		)
		.then($A.getCallback(response => {
			helper.showToast();
			component.set("v.body", []); // dlaczego tablica tutaj ? 
			component.set("v.buttons", []);
			helper.createReservationConfirmation(component);
			helper.createConfirmationButton(component);
		
		}))
		.catch(e => alert(e));
	
		
	},
	handleConfirmReservation : function(component, event, helper){
		let start = event.getParams('starDate');
		let end = event.getParams('endDate');
		helper.insertNewReservation(
		component,
		component.get("v.customer"),
		component.get("v.rooms"),
		start,
		end

		).then($A.getCallback(response => {
		
		}))
	},

	handleNewClientInput: function(component, event, helper){
		let {FirstName, LastName, Email} = event.getParams();
		component.set("v.FirstName", FirstName);
		component.set("v.LastName", LastName);
		component.set("v.Email", Email);
	},


})
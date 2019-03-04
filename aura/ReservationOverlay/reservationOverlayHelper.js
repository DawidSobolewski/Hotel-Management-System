({
	createNewClientForm : function(component) {
		$A.createComponent(
			"c:NewClientForm", 
			{"aura:id": "NewClientForm"}, 
			(newForm, status, error) => {
			if(status === "SUCCESS"){
				let body = component.get("v.body");
				body.push(newForm);
				component.set("v.body", body);
				// console.log("Form created successfully!")
			}
			else{
				console.log("Creating form failed!", error);
			}
		})
		// console.log("buttonNewClient6");
		
	},
	createNewClientFormButton: function(component){
		// console.log("Creating form button...");
		$A.createComponent(
			"lightning:button",
			{
				"aura:id":"createClientButton", 
				"variant":"success" ,
				"label":"Create Client" ,
				"title":"Create a new client record." ,
				"onclick": component.getReference("c.handleCreateClientClick") // wtf ? 
			}, 
			(newButton, status, error) => {
			if(status === "SUCCESS"){
				let buttons = component.get("v.buttons");
				buttons.push(newButton);
				component.set("v.buttons", buttons);
				// console.log("Button created successfully!")
			}
			else{
				console.log("Creating button failed!", error);
			}
		})

	},
	insertNewClient: function(component, firstName, lastName, email){
		return new Promise((resolve, reject)=>{
			let action = component.get("c.addContact");
			action.setParams({
				firstName: firstName,
				lastName: lastName,
				email: email
			});
			action.setCallback(this, response => {
				let state = response.getState();
				if(state === "SUCCESS"){
					resolve(response.getReturnValue());
				}
				else{
					reject(response.getError());
				}
			})
			$A.enqueueAction(action);
		})
	},
	insertNewReservation: function(component, customer, roomId, startDate, endDate){
		return new Promise((resolve, reject)=>{
			let action = component.get("c.addReservation");
			action.setParams({
				customer: customer,
				roomId: roomId,
				startDate: startDate,
				endDate: endDate,
				
			});
			action.setCallback(this, response => {
				let state = response.getState();
				if(state === "SUCCESS"){
					resolve(response.getReturnValue());
				}
				else{
					reject(response.getError());
				}
			})
			$A.enqueueAction(action);
		})
	},
	showToast : function(){
		console.log("showToast");
		let toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"title": "Information", 
			"message": "New client has been created.",
			"type": "success"
		});
		toastEvent.fire(); 
	},
	showToastReservationConfirmation : function(){
	console.log('showToast reservation confirmation');
	let toastEvent = $A.get("e.force:showToast");
	toastEvent = $A.get("e.force:showToast");
	toastEvent.setParams({
		"title":"Information", 
		"message":"New reservation has been created",
		"type":"success"
	});
	toastEvent.fire();
	},
	
	createReservationConfirmation : function(component){
		console.log('Craete reservation confirmation');
		$A.createComponent(
			"c:ReservationConfirmation",
			{"aura:id": "ReservationConfirmation","rooms": component.get("v.rooms"), "hotel":component.get("v.hotel")},
			(reservation, status, error) => {
				if(status === "SUCCESS"){
					let body = component.get("v.body");
					body.push(reservation);
					component.set("v.body", body);
				}
				else if(status === "ERROR"){
					console.log(error);
				}
				else {
					console.log("ReservationConfirmation haven't been created")
				}
			}
		)
	},

	createConfirmationButton : function(component){
		console.log('Create confirmation button');
		$A.createComponent(
			"lightning:button",
			{
				"aura:id":"createConfirmationButton", 
				"variant":"success" ,
				"label":"Confirm Reservation" ,
				"title":"Create a new client reservation." ,
				"onclick": component.getReference("c.handleConfirmReservation") 
			}, 
			(newButton, status, error) => {
			if(status === "SUCCESS"){
				let buttons = component.get("v.buttons");
				buttons.push(newButton);
				component.set("v.buttons", buttons);
				console.log("Button created successfully!")
			}
			else{
				console.log("Creating button failed!", error);
			}
		}
		)
	}
	
})
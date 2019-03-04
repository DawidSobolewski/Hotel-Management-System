({
	// callAllActions : function(component) {

	// 	let roomsAction = component.get("c.getRoomsOfType");
	// 	roomsAction.setParams({ 
	// 		hotelId : component.get("v.hotelId"),
	// 		typeRoom : component.get("v.roomType")
	// 	});

	// 	let reservationsAction = component.get("c.getReservations");
	// 	reservationsAction.setParams({
	// 		hotel: component.get("v.hotelId"),
	// 		startDate: component.get("v.startDate"),
	// 		endDate: component.get("v.endDate"),
	// 	})
		
	// 	roomsAction.setCallback(this, function(response){
	// 		let state = response.getState();
	// 		if(state === "SUCCESS"){
	// 			component.set("v.rooms", response.getReturnValue());
	// 			$A.enqueueAction(reservationsAction);
	// 		}
	// 		else{
	// 			response.getError().forEach(error => {
	// 				console.log(error.message);
	// 			})  
	// 		}
	// 	})
	// 	reservationsAction.setCallback(this, function(response){
	// 		let state = response.getState();
	// 		if(state === "SUCCESS"){
	// 			component.set("v.reservations", response.getReturnValue());
	// 			console.log("Rooms:",
	// 				component.get("v.rooms")
	// 			);
	// 			this.filterRooms(component.get("v.rooms"), component.get("v.reservations"))

	// 		}
	// 		else{
	// 			response.getError().forEach(error => {
	// 				console.log(error.message);
	// 			})  
	// 		}
	// 	})
	// 	$A.enqueueAction(roomsAction);
	// },
	filterRooms: function(rooms, reservations){
		return rooms.filter((room, index) => {
			reservations.reduce((prev, curr)=>{
				if(!prev){
					if(curr.Room__c == room.Id){
						console.log("Filtering: ", "Matched! ", curr.Room__c, room.Id)
						prev = true;
					}
					else{
						console.log("Filtering: ", "Dont match: ", curr.Room__c, room.Id)
					}
				}
			}, false)
		})
	},
	validInputs: function(component){
		const hotelInput = component.find("hotelPicklist").find("select");
		const roomInput = component.find('roomTypeSelect');
		const startInput = component.find('startDate');
		const endInput = component.find('endDate');

	
		
		let validDates = true;
		const errors = component.get("v.errors");
		
		if(new Date(component.get("v.endDate")) < new Date(component.get("v.startDate"))){
			component.set("v.errors", ["Please enter the correct dates."]);
			component.set("v.errorSwitch", true);
			validDates = false;
		}
		else if(new Date(component.get("v.startDate")) < new Date().setHours(0, 0, 0, 0)){
			component.set("v.errors", ["Cannot choose past dates."]);
			component.set("v.errorSwitch", true);
			validDates = false;
		}

		const allInputs = [
			hotelInput,
			roomInput, 
			startInput, 
			endInput,
	
		];

		return validDates && allInputs.reduce((validSoFar, inputCmp) =>{
			inputCmp.showHelpMessageIfInvalid();
            return inputCmp.get('v.validity').valid;
		}, true); 
	}
	
	
})
({
	// getAvailableRooms : function(component, hotelId, roomType, startDate, endDate) {

	// 	let roomsAction = component.get("c.getRoomsOfType");
	// 	roomsAction.setParams({ 
	// 		hotelId : hotelId,
	// 		typeRoom : roomType
	// 	});

	// 	let reservationsAction = component.get("c.getReservations");
	// 	reservationsAction.setParams({
	// 		hotelId : hotelId,
	// 		hotel: component.get("v.hotelId"),
	// 		startDate: startDate,
	// 		endDate: endDate,
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
				
	// 			component.set("v.filtered", this.filterRooms(component.get("v.rooms"), component.get("v.reservations")))
	// 			console.log("All rooms", component.get("v.rooms"));
	// 			console.log("all reservations", component.get("v.reservations"));
	// 			console.log("Filtered rooms", component.get("v.filtered"));

	// 			this.switchComponents(component);
				
	// 		}
	// 		else{
	// 			response.getError().forEach(error => {
	// 				console.log(error.message);
	// 			})  
	// 		}
	// 	})

	// 	$A.enqueueAction(roomsAction);
	// },

	doInit : function(component){
		return new Promise((resolve, reject) => {
			let action = component.get("c.getHotels");
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


	switchComponents: function(component){
		component.get("v.body")[0].destroy();
		this.createRoomTable(component);
	},
	

	createRoomTable: function(component){
		$A.createComponent("c:RoomTable", {"rooms": component.get("v.filtered"), "hotel":component.get("v.hotel")}, (newTable, status, errorMessage)=>{
			if (status === "SUCCESS"){
				let body = component.get("v.body");
				body.push(newTable);
				component.set("v.body", body);
			
			}
			else if(status === "INCOMPLETE"){
				console.log("No response from server or client is offline.");
			}
			else if(status === "ERROR"){
				console.log("Error: " + errorMessage);
			}
		})
	},


	createHome: function(component){
		$A.createComponent("c:Home", {"hotels": component.get("v.hotels")}, (newHome, status, errorMessage)=>{
			if (status==="SUCCESS"){
				let body = component.get("v.body");
				body.push(newHome);
				component.set("v.body", body);
			}
			else if(status === "INCOMPLETE"){
				console.log("No responses from server or client is offline");
			}
			else if(status === "ERROR"){
				console.log("Error: " + errorMessage); 
			}
			else{
				console.log("Popsuło się", errorMessage)
			}
		})
		
		
	},


	getRoomsPromise : function(component,hotelId, typeRoom, tv, minibar, bathroom, balcony, startDate, endDate){
		return new Promise((resolve,reject) => {

			let action = component.get("c.getFilteredRooms"); 
			action.setParams({
				hotelId: hotelId,
				typeRoom: typeRoom,
				startDate: startDate,
				endDate: endDate,
				tv: tv, 
				minibar: minibar,
				bathroom: bathroom, 
				balcony: balcony,
			})
			action.setCallback(this, response =>{
				let state = response.getState();
				if(state==="SUCCESS"){
					resolve(response.getReturnValue());
				}else{
					reject(response.getError());
				}
			})
			$A.enqueueAction(action);
		})
	},


	showToast : function(component){
		
		let toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"title": "Information", 
			"message": "The are no available rooms in this type. You can choose another rooms",
			"type": "error"
		});
		toastEvent.fire();
	}
	
})
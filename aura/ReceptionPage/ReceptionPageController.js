({
	doInit : function(component, event, helper) {
		helper.doInit(component)
		.then($A.getCallback(response =>{
			component.set("v.hotels", response);
			helper.createHome(component);
		}))
		.catch(error => console.log(error.message)); 
		

	},
	handleRoomInput : function(component, event, helper) {
	
		let {hotelId, roomType, startDate, endDate, tv, minibar, bathroom, balcony } = event.getParams();
		helper.getRoomsPromise(component,hotelId,roomType,tv,minibar,bathroom,balcony, startDate, endDate).then(
			$A.getCallback(response =>{
				component.set("v.filtered",response.rooms);
				if(!response.filtersApplied){
					try{
						helper.showToast();
					}
					catch(error){
						console.log("Toast can't be shown.", error);
						alert("The are no available rooms in this type. You can choose another rooms"); 					}
				} else {
					console.log('Filters successfully applied!');
				}
				helper.switchComponents(component);

			})).catch(error=> console.log(error.message));

			let hotels = component.get("v.hotels");
			component.set("v.hotel", hotels.find(currentHotel=>{
			if(currentHotel.Id===hotelId){
				return true;
			}
			else return false;  
		}))  
	
		
	}
})
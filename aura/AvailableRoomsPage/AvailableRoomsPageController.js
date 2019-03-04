({
	doInit :function(component, event, helper){
		component.set('v.columns', [
			{label: 'Room Number', fieldName: 'Room_Number__c', type: 'number'},
			{label: 'Room Type', fieldName: 'Type__c', type: 'text'},
			{label: 'Bathroom', fieldName: 'Bathroom_included__c', type: 'boolean'},
			{label: 'Balcony', fieldName: 'Balcony_included__c', type: 'boolean'},
			{label: 'TV', fieldName: 'TV__c', type: 'boolean'},
			{label: 'Minibar', fieldName: 'Minibar__c', type: 'boolean'},
			{label: 'Cost', fieldName: 'Cost__c', type: 'currency'},
		]);
	},
	sendRoomsRequest : function(component, event, helper){
		const hotelId = event.getParam("hotelId");
		let action = component.get("c.getRooms");
		action.setParams({"hotelId": hotelId});
		action.setCallback(this, response => {
			let state = response.getState();
			if(state == "SUCCESS") {
				component.set("v.rooms", response.getReturnValue());
				component.set("v.filtered", response.getReturnValue());
			}
			else{
				response.getError().forEach(error => {
					console.log(error.message);
				})  
			}
		}) 
		$A.enqueueAction(action);    
	},
	onTypeSelect : function(component, event, helper){
		let selectedType = component.find('select').get('v.value');
		let rooms = component.get("v.rooms");
		if(selectedType == "Any"){
			component.set("v.filtered", rooms);
		}
		else{
			component.set("v.filtered", rooms.filter((room)=> (room.Type__c == selectedType)));
		}
	},
	onDateInputChange : function(component, event, helper){
		let startDate = component.get("v.startDate");
		let endDate = component.get("v.endDate");

		if(!endDate || !startDate){
			console.log("Please provide Dates.");
			return;
		}
		////////////////////////////////
		const filtered = component.get("v.filtered");
		filtered.forEach((room, index) => {
			let action = component.get("c.getReservations");
			action.setParams({"room": room});
			action.setCallback(this, response => {
				let state = response.getState();
				if(state == "SUCCESS") {
					let reservations = response.getReturnValue();
					let overlaping = reservations.reduce((prev, curr, index)=>{
						if(!prev){
							prev = helper.datesOverlap(startDate, endDate, curr.Start_Date__c, curr.End_Date__c);
						}
					}, false);
					if(overlaping){
						filtered.splice(index);
					}
				}
				else{
					response.getError().forEach(error => {
						console.log(error.message);
					})  
				}
			}) 
			$A.enqueueAction(action);
		})
	}
})
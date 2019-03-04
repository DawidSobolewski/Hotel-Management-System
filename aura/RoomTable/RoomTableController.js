({
	showReservations : function(component, event, helper) {
		component.set('v.columns',[
			{label: 'Room Number', fieldName: 'Room_Number__c', type: 'number'},
			{label: 'Room Type', fieldName: 'Type__c', type: 'text'},
			{label: 'Bathroom', fieldName: 'Bathroom_included__c', type: 'boolean'},
			{label: 'Balcony', fieldName: 'Balcony_included__c', type: 'boolean'},
			{label: 'TV', fieldName: 'TV__c', type: 'boolean'},
			{label: 'Minibar', fieldName: 'Minibar__c', type: 'boolean'},
			{label: 'Cost', fieldName: 'Cost__c', type: 'currency'},
			{label: 'Reserve', filedName: 'button', type: 'button' },
			{label: 'Action', type: 'button', initialWidth: 150, typeAttributes:
                { label: { fieldName: 'actionLabel'}, title: 'Click to Edit', name: 'edit_status', iconName: 'utility:edit', disabled: {fieldName: 'actionDisabled'}, class: 'btn_next'}},
		])

		
	},
	
	handleRowAction : function(component,event,helper){
		let row = event.getParam("row");
		let rows = component.get("v.rooms");
		let modalBody;
		$A.createComponent("c:reservationOverlay", {"rooms": row, "hotel": component.get("v.hotel")}, (content, status)=>{
			if(status === "SUCCESS"){
				modalBody = content;
				component.find('overlayLib').showCustomModal({
					header: "Information about your reservation:",
					body: modalBody,
					showCloseButton: true,
					closeCallback: ()=>{
						console.log("Overlay has been closed.");
					}
				})
			}
		})
	}
})
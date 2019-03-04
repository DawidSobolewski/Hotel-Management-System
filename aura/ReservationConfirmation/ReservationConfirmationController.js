({
	myAction : function(component, event, helper) {
		
	}, 

	selectRecord : function(component, event, helper){
		let recordFromTheList = component.get('v.oRecord');
		let callEvent = component.getEvent('oSelectedRecordEvent');
		callEvent.set({'recordByEvent': recordFromTheList });
		callEvent.fire();
	}
})
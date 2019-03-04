({
		onChange: function(cmp, event, helper) {
			let hotelId = cmp.find('select').get('v.value');
			let newEvent = cmp.getEvent("sendHotelId");
			newEvent.setParams({"hotelId": hotelId});
			newEvent.fire();
		},
		doInit: function(cmp, event, helper) {
			
		}
})
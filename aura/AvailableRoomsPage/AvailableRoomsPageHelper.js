({
	filterAvailability : function(startDate, endDate, rooms, reservations) {
		let filteredRooms = rooms.filter(room => {
			let flag = true;
			myReservations = reservations.filter(res => res.Room__c == room.Id);
			myReservations.forEach(res => {
				/// FINISH LATER
			})
		})
	},
	datesOverlap : function(startDate1, endDate1, startDate2, endDate2){
		startDate1 = startDate1.split("-");
		endDate1 = endDate1.split("-");
		startDate2 = startDate2.split("-");
		endDate2 = endDate2.split("-");
		if(startDate1 == startDate2 || startDate1 == endDate2 || endDate1 == startDate1 || endDate1 == endDate2){
			return true;
		}
		//// COMPARING BOTH STARTDATES
		let startDirection = startDate1.reduce((prev, curr, index)=>{
			if(prev != 0) return;
			prev = curr - startDate2[index];
		}, 0);

		//// STARTDATE2 IS BEFORE STARTDATE1
		if(startDirection > 0){

			/// COMPARING STARTDATE1 TO ENDDATE2
			let endDirection = startDate1.reduce((prev, curr, index)=>{
				if(prev != 0) return;
				prev = curr - endPoint2[index];
			}, 0);
			if(endDirection > 0){
				return false;
			}
			else{
				return true;
			}
		}
		//// STARTDATE2 IS AFTER STARTDATE1
		else if(startDirection < 0){
			
			/// COMPARING ENDDATE1 TO STARTDATE2
			let endDirection = endDate1.reduce((prev, curr, index)=>{
				if(prev != 0) return;
				prev = curr - startDate[index];
			}, 0);
			if(endDirection < 0){
				return false;
			}
			else{
				return true;
			}
		}


	}
})
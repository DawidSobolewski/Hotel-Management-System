public with sharing class ApexController {


@AuraEnabled
public static RoomsResponse getRoomsOfType(String hotelId, String typeRoom, Boolean tv, Boolean minibar, Boolean bathroom, Boolean balcony){

List <Room__C> rooms = new List<Room__C>();
Boolean flag = true;

 String selectFields = 'SELECT Room_Number__C, Type__C, Bathroom_included__C, Balcony_included__C, TV__C, Minibar__C, Cost__C, Floor__C FROM Room__C WHERE Hotel__R.id=\''+hotelId +'\'';
 String typeRoomQuery = ' AND Type__C=\'' +typeRoom+'\'';
 String equipmentRoomQuery = ' AND TV__C='+tv+ ' AND Balcony_included__C='+balcony+ ' AND Bathroom_included__C='+bathroom+' AND Minibar__C='+minibar;

String finalQuery = selectFields+typeRoomQuery+equipmentRoomQuery;
system.debug(finalQuery);
rooms = database.query(finalQuery);

if (typeRoom != 'Any') {
   rooms = Database.query(finalQuery);
}
else {
    rooms = Database.query(selectFields+equipmentRoomQuery);
}

if(rooms.isEmpty()){
    rooms = Database.query(selectFields);
    flag = false;
}

return new RoomsResponse(rooms, flag);

}

@AuraEnabled
public static List<Reservation__C> getReservations(String hotel, Date startDate, Date endDate){
    List <Room__C> listOfReservedRoom = new List<Room__C>();

    List <Reservation__C> reservations = [SELECT Reservation__C.Id, Room__C FROM Reservation__C
     WHERE Room__R.Hotel__R.Id=: hotel AND ((Start_Date__C >=: startDate AND Start_Date__C <=: endDate)
    OR (End_Date__C >=: startDate AND End_Date__C <=: endDate) OR
    (Start_Date__C <=: startDate AND End_Date__C <=: endDate) OR 
    (Start_Date__C >=: startDate AND End_Date__C >=:endDate))];

    if(reservations.isEmpty()) System.debug('There is no reservations');
    return reservations;
}

@AuraEnabled
    public static List<Hotel__c> getHotels() {
            List <Hotel__c> hotels = [SELECT Id, Name, Address__c 
                FROM Hotel__c];
                if (hotels.isEmpty()){
                    throw new AuraHandledException('There are no hotels avaliable');
                }   
        return hotels;
    }

    public class RoomsResponse{
        @AuraEnabled
        public Boolean filtersApplied;
        
        @AuraEnabled
        public List<Room__C> rooms;

        public RoomsResponse(List<Room__C> rooms, Boolean filtersApplied){
        this.rooms = rooms;
        this.filtersApplied = filtersApplied;
    }


       
    }

    @AuraEnabled
    public static RoomsResponse getFilteredRooms(String hotelId, String typeRoom, Date startDate, Date endDate, Boolean tv, Boolean minibar, Boolean bathroom, Boolean balcony) {
           
           RoomsResponse roomsResponse = getRoomsOfType(hotelId, typeRoom, tv, minibar, bathroom, balcony);
           List<Reservation__C> reservations = getReservations(hotelId, startDate, endDate);
           
           List<Room__c> rooms = roomsResponse.rooms;
           List<String> roomsFromReservations = new List<String>();
           List<Room__c> filteredRooms = new List<Room__c>();

           for(Reservation__C res : reservations){
               roomsFromReservations.add(res.Room__C);
           }
                for(Room__c room : rooms){
                    Boolean toAdd = true;
                    for(String roomId : roomsFromReservations){
                        if(room.Id == roomId){
                            toAdd = false;
                            break;
                        }
                    }
                    if(toAdd){
                        filteredRooms.add(room);
                    }
                }


           return new RoomsResponse(filteredRooms, roomsResponse.filtersApplied);
    }

    @AuraEnabled
    public static Contact addContact(String firstName, String lastName, String email){
        
    Contact contact = new Contact(firstName= firstName, lastName= lastName, Email = email);
        try{
            insert contact;
        }
        catch(DmlException e){
            System.debug('An unexpected error has occured : '+e.getMessage());
        }
        return contact;
    }
    
    @AuraEnabled
    public static Reservation__C addReservation(Contact customer, String roomId, Date startDate, Date endDate, Double cost){
        
    
        Reservation__C res = new Reservation__C(Customer__c = customer.id, Room__c = roomId, Start_Date__c = startDate, End_Date__c = endDate); 
        try{
            res.Name = roomId + ' '  + startDate + ' - ' +endDate + ' reservation'; 
            insert res;
            
        }
        catch(DmlException e){
            System.debug('An unexpected error has occured : '+e.getMessage());
        }
        return res;
    }

    @AuraEnabled
    public static List<sObject> getCustomer(String keyWord, String objectName){
      String searchKey = keyWord + '%';
      List <sObject> returnList = new List <sObject>();

      // create a dynamic soql query for fetch record list with LIMIT 5
      String sQuery = 'select id, Name from ' + objectName + ' where Name LIKE: searchKey order by createDate DESC limit 5';
      List <sObject> listOfRecords = Database.query(sQuery);

      for(sObject s: listOfRecords){
          returnList.add(s);
      }

      return returnList;
    }
}
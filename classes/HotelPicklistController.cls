public with sharing class HotelPicklistController {
    @AuraEnabled
    public static List<Hotel__c> getHotels() {
            List <Hotel__c> hotels = [SELECT Id, Name 
                FROM Hotel__c];
                if (hotels.isEmpty()){
                    throw new AuraHandledException('There are no hotels avaliable');
                }
        return hotels;
    }
    @AuraEnabled
    public static List<Room__C> getRooms(String hotelName){
    
    List<Room__C> listOfRoomsInChoosenHotel = new List<Room__C>();

    listOfRoomsInChoosenHotel= [select Name, Avaiable__C, Cost__C from Room__C where Hotel__R.name=: hotelName];

    return listOfRoomsInChoosenHotel;
    }
}
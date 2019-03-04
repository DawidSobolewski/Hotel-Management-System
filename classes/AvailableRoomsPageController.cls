public with sharing class AvailableRoomsPageController {
    @AuraEnabled
    public static List<Room__c> getRooms(String hotelId) {
            List <Room__c> rooms = [SELECT Id, Name 
                FROM Room__c WHERE Hotel__R.Id=: hotelId];
                if (rooms.isEmpty()){
                    throw new AuraHandledException('There are no rooms avaliable');
                }
        return rooms;
    }
}
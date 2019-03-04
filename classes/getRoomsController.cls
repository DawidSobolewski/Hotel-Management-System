public with sharing class getRoomsController {

public static List<Room__C> getRooms(String hotelName){
    
    List<Room__C> listOfRoomsInChoosenHotel = new List<Room__C>();

    listOfRoomsInChoosenHotel= [select Name, Avaiable__C, Cost__C from Room__C where Hotel__R.name=: hotelName];

	System.debug('records are '+listOfRoomsInChoosenHotel);
    return listOfRoomsInChoosenHotel;
    }
}
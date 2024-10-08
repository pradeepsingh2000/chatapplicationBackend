const Rooms = require("../models/rooms");

const addRooms = async () => {
    try {
        const rooms = await Rooms.countDocuments();
        console.log(rooms,'rooms')
        if(rooms < 5) {
            const roomsData = [
                { name: 'Room 1', isActive: true },
                { name: 'Room 2', isActive: true },
                { name: 'Room 3', isActive: true },
                { name: 'Room 4', isActive: true },
                { name: 'Room 5', isActive: true }
              ];
          
              await Rooms.insertMany(roomsData);
          
        }
      
      console.log('Rooms added successfully');
    } catch (error) {
      console.error('Error adding rooms:', error);
    }
  };

  module.exports ={addRooms}
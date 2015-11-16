// Load the required packages 
var Room = require('../models/Room');



// Controllers for the web app endpoints 
// 	- Controller 				-Jade Files 				-URL directed to
//---------------------------------------------------------------------------
//	- get_room_form 			-rooms/new_room_form		- /rooms/new_room_form
// 	- get_edit_room_form		-rooms/edit_tag_form 		- /rooms/edit_room_form_in
// 	- get_rooms 				-rooms 						- /rooms
// 	- post_room					-							- /rooms
//  - edit_room 				-							- /rooms
// 	- delete_room   			-	


// Controller to GET the form to enter new room into DB
exports.get_room_form = function(req, res) {
	res.render('rooms/new_room_form');
};


// Controller to GET the editing form for a specific room
exports.get_edit_room_form = function(req, res) {
	Room.findById(req.body.room_id, function (err, room) {
		if (err)
			res.send(err);
		//res.json(rfid_tag);
		res.render('rooms/edit_room_form',{
			room_data: room
		});
	});
	
};

// Controller to POST a new room into the DB
exports.post_room = function(req, res) {

	// Create new instance of the Room model
	var rooms = new Room();

	// Set the room properties from request data
	rooms.name = req.body.name;
	rooms.height = req.body.height;
	rooms.width = req.body.width;
	rooms.userId = req.user._id;

	// Save the room info and check for errors
	rooms.save(function(err) {
		if (err)
			res.send(err);
	});

	res.redirect('/rooms');
};


// Controller to GET the list of all rooms
exports.get_rooms = function(req, res) {

	var headings = ['Name', 'Height', 'Width'];
	// Use the rfid_tags model to find all the rfid_tags
	Room.find({userId: req.user._id},function (err, rooms) {
		if (err)
			res.send(err);

		//res.json(rfid_tags);
		res.render('rooms', {
			room_data : rooms,
			title : 'Room Data',
			heading : headings
		});
	});
};


// Controller to PUT (edit) the information of a specific room
exports.edit_room = function(req, res) {
	// Use the Room model to modify a room
	Room.findById(req.body.room_id, function(err, room) {
		if (err)
			res.send(err);

		// Update the existing information (can modify to add anything)
		room.name = req.body.name;
		room.height = req.body.height;
		room.width = req.body.width;


		// Save the edited room information and check for errors
		room.save(function(err) {
			if (err)
				res.send(err);
			res.redirect('/rooms');
		});
	});
};


// Controller to DELETE the information of a specific room 
exports.delete_room = function(req,res) {
	// Use the ID to delete a specific room
	console.log('Tag Deleted: ' + req.body.room_id);
	Room.remove({ _id: req.body.room_id}, function(err) {
		
		if (err) {
			console.log('There is an error');
			res.send(err);
		}
		res.redirect('/rooms');
	});
};


/////////////////////////////////////////////////////////////////////////////////


// Controllers for the API endpoints 
// 	- Controller 					- Resource URL
//---------------------------------------------------------------------------
// 	- get_rooms_api 				- /rooms
//  - get_room_api 					- /rooms
// 	- post_room_api					- /rooms
//  - edit_room_api					- /rooms
// 	- delete_room_api				- /rooms

// Controller to GET the list of all rooms
exports.get_rooms_api = function(req, res) {

	var headings = ['Name', 'Height', 'Width'];
	// Use the rfid_tags model to find all the rfid_tags
	Room.find({userId: req.user._id},function (err, rooms) {
		if (err)
			res.send(err);

		res.json(rooms);
	});
};

// Controller to GET a specific room
exports.get_room_api = function(req,res) {
	Room.findById(req.body.room_id, function(err, room) {
		if (err)
			res.send(err);
		res.json(room);
	});
};


// Controller to POST a new room into the DB
exports.post_room_api = function(req, res) {

	// Create new instance of the Room model
	var rooms = new Room();

	// Set the room properties from request data
	rooms.name = req.body.name;
	rooms.height = req.body.height;
	rooms.width = req.body.width;
	rooms.userId = req.user._id;

	// Save the room info and check for errors
	rooms.save(function(err) {
		if (err)
			res.send(err);
	});

	res.json({message: 'Added new room', data: rooms});
};


// Controller to PUT (edit) the information of a specific room
exports.edit_room_api = function(req, res) {
	// Use the Room model to modify a room
	Room.findById(req.body.room_id, function(err, room) {
		if (err)
			res.send(err);

		// Update the existing information (can modify to add anything)
		room.name = req.body.name;
		room.height = req.body.height;
		room.width = req.body.width;


		// Save the edited room information and check for errors
		room.save(function(err) {
			if (err)
				res.send(err);
			res.json({message: 'Updated room!' , data: room});
		});
	});
};


// Controller to DELETE the information of a specific room 
exports.delete_room_api = function(req,res) {
	// Use the ID to delete a specific room
	console.log('Tag Deleted: ' + req.body.room_id);
	Room.remove({ _id: req.body.room_id}, function(err) {
		
		if (err) {
			console.log('There is an error');
			res.send(err);
		}
		res.json({message: 'Deleted room.'});
	});
};
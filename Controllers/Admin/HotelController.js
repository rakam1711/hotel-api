const Hotel = require('../../Models/Hotel');


exports.getHotelsList = async (req, res, next) => {
    try {
        const options = {
            page: parseInt(req.query.page) || 1,
            limit: parseInt(req.query.limit) || 10,
            collation: {
                locale: 'en'
            },
            sort: {
                created_at: -1
            }
        }
        let query = [
            // {
            //   '$match': {
            //     'role': 'User'
            //   }
            // }
        ]
        let queryAggregate = Hotel.aggregate(query);
        const hotels = await Hotel.aggregatePaginate(queryAggregate, options);
        res.send({
            status: 200,
            message: 'Hotels List',
            data: { hotels }
        })
    } catch (error) {
        next(error)
    }
}

exports.createHotels = async (req, res, next) => {
    try {
        const data = req.body;
        var file = document.querySelector('input[type=file]')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
        }

        reader.readAsDataURL(file);

        const registration = new Hotel({
            images: base64Image,
            hotel_name: data.name,
            address: data.address,
            Phone: data.phone,
            no_of_rooms: data.room,
            rooms_types: data.roomtype,
            created_at: new Date()
        });

        const hotel = await registration.save();
        hotel.password = null;
        res.send({
            status: 201,
            message: "Hotel created Successfully",
            data: { hotel },
        });

        console.log(req.body, req.files);
    } catch (error) {
        next(error)
    }
}

exports.deleteHotel = async (req, res, next) => {
    try {
        const data = req.query;
        await Hotel.deleteOne({ _id: data?.id });
        res.send({
            status: 200,
            message: 'Hotel Deleted Successfully',
            data: {}
        })
    } catch (error) {
        next(error)
    }

}
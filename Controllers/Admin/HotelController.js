const Hotel = require('../../Models/Hotel');

exports.getHotelsList = async(req,res,next)=>{
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

exports.createHotels = async(req,res,next)=>{
    try {
        console.log(req.body,req.files);
    } catch (error) {
        next(error)
    }
}
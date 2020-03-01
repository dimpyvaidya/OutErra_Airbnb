const rooms = {
    hotelsDB: [],
    init() {
        const hotelsDB = [];
        this.hotelsDB.push({
            hotelId: 101,
            imageUrl: `/img/hotel1m.jpg`,
            title: "Heart Lake Hotel",
            description: "Private pool house with amazing views",
            price: 150,
            rateImageUrl: "/img/user1.png",
            feedbacker: "Kalpu",
            feedback: "Highly recommended!!!",
            rating: 3
        });
        this.hotelsDB.push({
            hotelId: 102,
            imageUrl: `/img/hotel2m.jpg`,
            title: "Park Regis Hotel",
            description: "Romentic 1-bed with stunning views",
            price: 250,
            rateImageUrl: "/img/user2.png",
            feedbacker: "Darshu",
            feedback: "I booked the spa room and was lovely...",
            rating: 4
        });
        this.hotelsDB.push({
            hotelId: 103,
            imageUrl: `/img/hotel3m.jpg`,
            title: "Redissan Hotel",
            description: "Classic hotel on the Royal Mile",
            price: 303,
            rateImageUrl: "/img/user3.png",
            feedbacker: "Rekha",
            feedback: "Amazing views! The food was delicious..",
            rating: 5
        });
    },
    getallRooms() {
        return this.hotelsDB;
    }
}

rooms.init();
module.exports = rooms;
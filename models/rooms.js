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
            feedbacker: "Darsh",
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
        this.hotelsDB.push({
            hotelId: 104,
            imageUrl: `/img/hotel4m.jpg`,
            title: "Anantara Hotel",
            description: "Romentic 1-bed with stunning views",
            price: 200,
            rateImageUrl: "/img/user4.png",
            feedbacker: "Dimpu",
            feedback: "Great location, nothing too much trouble",
            rating: 3
        });
        this.hotelsDB.push({
            hotelId: 105,
            imageUrl: `/img/hotel5m.jpg`,
            title: "Hamilton Hotel",
            description: "Classic hotel on the Royal Mile",
            price: 100,
            rateImageUrl: "/img/user5.png",
            feedbacker: "Pinku",
            feedback: "Great location, nothing too much trouble",
            rating: 5
        });
        this.hotelsDB.push({
            hotelId: 106,
            imageUrl: `/img/hotel7m.jpg`,
            title: "Ramada Hotel",
            description: "Private pool house with amazing views",
            price: 170,
            rateImageUrl: "/img/user6.png",
            feedbacker: "Kalpu",
            feedback: "Great location, nothing too much trouble",
            rating: 3
        });
    },
    getallRooms() {
        return this.hotelsDB;
    }
}

rooms.init();
module.exports = rooms;
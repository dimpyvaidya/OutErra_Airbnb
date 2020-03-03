const fRooms = {
    hotelsDB: [],
    init() {
        const hotelsDB = [];
        this.hotelsDB.push({
            hotelId: 101,
            imageUrl: `/img/froom1.jpg`,
            title: "Marrietta Entryway"
        });
        this.hotelsDB.push({
            hotelId: 102,
            imageUrl: `/img/froom2.jpg`,
            title: "Park Regis Hotel"
        });
        this.hotelsDB.push({
            hotelId: 103,
            imageUrl: `/img/froom3.jpg`,
            title: "Redissan Hotel"
        });
        this.hotelsDB.push({
            hotelId: 104,
            imageUrl: `/img/froom4.jpg`,
            title: "Heart Lake Hotel"
        });
        this.hotelsDB.push({
            hotelId: 105,
            imageUrl: `/img/froom5.jpg`,
            title: "Park Regis Hotel"
        });
        this.hotelsDB.push({
            hotelId: 106,
            imageUrl: `/img/froom6.jpg`,
            title: "Redissan Hotel"
        });
    },
    getallRoomsF() {
        return this.hotelsDB;
    }
}

fRooms.init();
module.exports = fRooms;
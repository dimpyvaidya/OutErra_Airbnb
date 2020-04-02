const fRooms = {
    roomDB: [],
    init() {
        const roomDB = [];
        this.roomDB.push({
            roomId: 101,
            imageUrl: `/img/froom1.jpg`,
            title: "Marrietta Entryway"
        });
        this.roomDB.push({
            roomId: 102,
            imageUrl: `/img/froom2.jpg`,
            title: "Park Regis Hotel"
        });
        this.roomDB.push({
            roomId: 103,
            imageUrl: `/img/froom3.jpg`,
            title: "Redissan Hotel"
        });
        this.roomDB.push({
            roomId: 104,
            imageUrl: `/img/froom4.jpg`,
            title: "Heart Lake Hotel"
        });
        this.roomDB.push({
            roomId: 105,
            imageUrl: `/img/froom5.jpg`,
            title: "Park Regis Hotel"
        });
        this.roomDB.push({
            roomId: 106,
            imageUrl: `/img/froom6.jpg`,
            title: "Redissan Hotel"
        });
    },
    getallRoomsF() {
        return this.roomDB;
    }
}

fRooms.init();
module.exports = fRooms;
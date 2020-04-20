const dashBoardLoader = (req, res) => {

    if (req.session.userInfo.type == "Admin") {
        res.render("admin");
    } else {
        res.render("welcome");
    }

}

module.exports = dashBoardLoader;
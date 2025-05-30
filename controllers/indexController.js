async function getIndex(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form", {
            errors : []
        });
    } else {
        res.render("index", {
            user: req.user,
        });
    }
}

module.exports = {
    getIndex
}
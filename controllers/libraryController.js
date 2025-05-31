async function getRoot(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form", {
            errors : []
        });
    } else {
        res.render("library", {
            user: req.user,
        });
    }
}

module.exports = {
    getRoot
}
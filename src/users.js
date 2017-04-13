"use strict";

var users = {
    admins: [
        "t.powell.meto@gmail.com",
        "anthony.duke@metoffice.gov.uk",
        "james.salter@metoffice.gov.uk",
        "tam203@gmail.com"
    ]
};

exports.isAdmin = function (req, res, next) {
    if (users.admins.includes(req.headers["x-forwarded-email"])) {
        res.locals.user = {admin: true};
    } else {
        res.locals.user = {admin: false};
    }
    next();
};
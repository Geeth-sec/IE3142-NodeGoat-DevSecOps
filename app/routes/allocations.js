const AllocationsDAO = require("../data/allocations-dao").AllocationsDAO;
const {
    environmentalScripts
} = require("../../config/config");

function AllocationsHandler(db) {
    "use strict";

    const allocationsDAO = new AllocationsDAO(db);

    this.displayAllocations = (req, res, next) => {
            
        // Fix for A4 Insecure DOR - take user id from session instead of from URL param
    const { userId } = req.session;

    // Reject any attempt to view another user's allocations
    if (String(req.params.userId) !== String(userId)) {
        return res.status(403).send("Forbidden: you can only view your own allocations");
    }

    const { threshold } = req.query;

        allocationsDAO.getByUserIdAndThreshold(userId, threshold, (err, allocations) => {
            if (err) return next(err);
            return res.render("allocations", {
                userId,
                allocations,
                environmentalScripts
            });
        });
    };
}

module.exports = AllocationsHandler;

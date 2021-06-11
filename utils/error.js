exports.serverError = (res, err, message) => {
    console.log(err);
    res.status(500).json({ ...message });
};

exports.resourceError = (res, message) => {
    res.status(400).json({ ...message });
};
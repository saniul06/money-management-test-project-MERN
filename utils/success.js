exports.success = (res, status, message) => {
    res.status(status).json({ ...message });
};

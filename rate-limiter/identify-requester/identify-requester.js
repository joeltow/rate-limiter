
module.exports.getRequesterId = req => {
    // What is the best way to identify a requester?
    // For now, I will keep it simple and use the 'host' header value
    return req.connection.remoteAddress;

    // if behind a proxy, use req.ips or req.ip
    // return req.ips || req.ip;
};

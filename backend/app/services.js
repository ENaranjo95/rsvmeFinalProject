
const accountSid = 'AC2ae755db7d31a602140418c98d19b661';
const authToken = '84c58227cd008cefa370f33ea0beeedd';

const client = require('twilio')(accountSid, authToken);

module.exports = client

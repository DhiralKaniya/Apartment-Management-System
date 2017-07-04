var request = require('request');

var sendMsgToGroup = function(to, message) {
    request({
        url: 'https://fcm.googleapis.com/fcm/send',
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AAAAAdmnaH8:APA91bHPF7on4bv8TLSfiunTwAUGnEA4503iZfpT7iutR4j730t7oXbPFHJ6ij1-7XCjz5oHu6ovVNTb2L1uVKr0K6Mul1VkER39YWvq13oJgDF5OmP-qHSZ9TaCa_DffZkllBplU7K2'
        },
        body: JSON.stringify({
            notification: {
                title: 'Apartment Management System',
                body: message
            },
            "to": "/topics/" + to
        })
    }, function(error, response, body) {
        if (error) {
            console.log(error);
            return false;
        } else if (response.statusCode >= 400) {
            console.log("HTTP Error" + response.statusCode + "-" + response.statusCode + "\n" + body);
            return false;
        } else {
            console.log(body);
            return true;
        }
    });
};

module.exports.sendMessageToGroup = sendMsgToGroup;
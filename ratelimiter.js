const redis = require('redis')
const moment = require('moment')

const redisClient = redis.createClient(process.env.REDIS_URL)
redisClient.on("error", function(error) {
    console.error(error);
});

/**
 * This function checks if a user already exists in Redis Memory Store
 * If user does not exists: Add user initialized with count of 1
 * 
 * If user exists: Check the difference in time between NOW and user's LAST request
 *      If difference is greater than 1: No worries, reset count and proceed
 * 
 *      If difference is less than 1 and count is greater than 3: User is requesting too frequent
 *      If difference is less than 1 and count is less than 3: Just increment count
 */
module.exports = function(req, res, next) {
    const user = req.headers.user
    redisClient.exists(user, (function(err, data) {
        if (err) {
            console.log("Error: ", err)
            console.log("If the error is an undefined variable, the cause is most likely missing headers")
            return res.json({
                "error": err,
                "message": "Most likely missing headers, are you sure you have your 'user' header?"
            })
        }
        if (data == 1) {
            console.log(user, " found")
                // Get user
            redisClient.get(user, function(err, response) {
                // Check time interval
                var reply = JSON.parse(response)
                    /**
                     * reply = {
                     *    count : int
                     *    startTime : int
                     * }
                     */
                const curr = moment().unix()
                const diff = (curr - reply.startTime) / 60
                console.log(diff)

                if (diff >= 1) {
                    var body = {
                        'count': 1,
                        'startTime': moment().unix()
                    }
                    console.log("RESETTING count, limit not exceeded ")
                    redisClient.set(user, JSON.stringify(body))
                    next()

                }
                if (diff < 1 && reply.count > 3) {
                    console.log("LIMIT exceeded for user: ", user)
                    return res.json({ "error": "request limit exceeded" })
                }
                if (diff < 1 && reply.count <= 3) {

                    reply.count++;
                    console.log("INCREMENTING count, limit not exceeded ")
                    redisClient.set(user, JSON.stringify(reply))
                    next()
                }
            })

        } else {
            var body = {
                'count': 1,
                'startTime': moment().unix()
            }
            console.log(req.headers.user, " not found, adding to Redis at time: ", body["startTime"])
            redisClient.set(user, JSON.stringify(body))

            // allow request
            next()
        }

    }))
}
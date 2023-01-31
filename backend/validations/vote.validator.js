const { checkSchema } =  require('express-validator');

exports.validateCreateVote = () => {
    return checkSchema({
        contestantId: {
            exists: {
                errorMessage: 'contestantId must be exist'
            }
        },
        timestamp: {
            exists: {
                errorMessage: 'timestamp must be exist'
            }
        },
    })
}
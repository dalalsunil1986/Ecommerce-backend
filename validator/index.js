exports.userSignUpValidator = (req, res, next) => {
    req
        .check('name', 'Name is required')
        .notEmpty();
    req
        .check('email', 'Email in correct format')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @ ')
        .isLength({
            min: 4,
            max: 32
        });
    const errors = req.validationErrors();
    if (errors) {
        const firstErrors = errors.map(errors => errors.msg)[0];
        return res
            .status(400)
            .json({
                error: firstErrors
            });
    }
    next();
}
module.exports = async (req, res, next) => {
  try {

    if (!req.user || req.user.email !== 'admin')
      throw new Error('You do not have access to complete this action');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};


module.exports = async (req, res, next) => {
  try {
    if (!req.user.id && req.user.email !== 'admin')
      throw new Error('You can only delete your own posts');

    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};


const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = class UserService {
  
  static async signIn({ email, password = '' }) {
    try {
      const user = await User.getByEmail(email);

      if(!user) throw new Error('Invalid email');

      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error ('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      //console.log(token);
      
      return token;
    } catch(error) {
      error.status = 401;
      throw error;
    }
  }
  
  static async signUp({ userName, email, password }) {
    try { 
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.SALT_ROUNDS)
      );
      const user = await User.insert({
        userName,
        email,
        passwordHash,
      });
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return [token, user];
    } catch (error) {
      error.status = 500;
      throw error;
    }
  }    
};





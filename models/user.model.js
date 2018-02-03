const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

/**
 * User Constructor
 * @param  options 
 */
function User(options={}) {
  this.username = options.username;
  this.password = options.password;
  this.token = options.token;
}

/**
 * Bcrypt user password
 * @return Promise that resolves if no error
 */
User.prototype.bcrypt =  function() {
  this.password =  bcrypt.hashSync(this.password, salt);
}

/**
 * Compare password
 * @return true if passwords match
 */
User.prototype.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

/**
 * Has Error
 * Returns error message or false
 */
User.prototype.hasError = function() {
  if(!(typeof this.username === 'string' && this.username.length > 5)) {
    return 'Username must be 6 or more characters';
  } else if(!(typeof this.password === 'string' && this.password.length > 7)) {
    return 'Password must be 8 or more characters';
  }
  return false;
}

/**
 * Get Object
 * Returns object containing User values
 */
User.prototype.getObject = function() {
  return {
    username: this.username,
    password: this.password,
    token: this.token
  }
}


module.exports = User;

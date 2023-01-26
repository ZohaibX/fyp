const { scrypt, randomBytes } = require('crypto');
const { promisify } = require('util');

const scryptAsync = promisify(scrypt);

 class Password {
  static async toHash(password) {
    const salt = randomBytes(8).toString('hex');
    // const buffer = await scryptAsync(password , salt , 64) for this -- ts will not understand the type of const
    const buffer = (await scryptAsync(password, salt, 64));

    return `${buffer.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword, suppliedPassword) {
    const [hashedPassword, salt] = storedPassword.split('.'); // by this -- we will get hashedPassword and salt
    const buffer = (await scryptAsync(suppliedPassword, salt, 64));

    return buffer.toString('hex') === hashedPassword; // true or false
  }
}

module.exports.Password = Password;
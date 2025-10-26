import { randomBytes, scrypt, timingSafeEqual } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const SALT = randomBytes(16).toString('hex');

async function hashPassword(password, salt) {
    const bufferHash = await scryptAsync(password, salt, 64);
    return bufferHash.toString('hex');
}

async function comparePassword(password, salt, hash) {
    const hashed = await hashPassword(password, salt);

    return timingSafeEqual(
        Buffer.from(hashed, 'hex'),
        Buffer.from(hash, 'hex')
    );
}

const hashed = await hashPassword('qwerty', SALT);

const isPasswordCorrect = await comparePassword('qwerty', SALT, hashed);


console.log(isPasswordCorrect);
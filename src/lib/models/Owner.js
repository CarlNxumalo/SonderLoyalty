import User from './User.js';

class Owner extends User {
    /**
     * @param {number | null} id
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} phone
     */
    constructor(id, name, surname, email, password, phone) {
        super(id, name, surname, email, password, phone);
    }
}

export default Owner;

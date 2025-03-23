import bcrypt from 'bcrypt';

class User {
    /**
     * @param {number | null} id
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} phone
     */
    constructor(id, name, surname, email, password, phone) {
        this.setID(id);
        this.setName(name);
        this.setSurname(surname);
        this.setEmail(email);
        this.setPassword(password);
        this.setPhone(phone);
    }

    /**
     * @param {number | null} id
     */
    setID(id) {
        if (id !== null && typeof id !== 'number') {
            throw new Error('ID must be either null or a valid number');
        }
        this.id = id;
    }

    /**
     * @param {string} name
     */
    setName(name) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name must be a valid non-empty string');
        }
        this.name = name;
    }

    /**
     * @param {string} surname
     */
    setSurname(surname) {
        if (!surname || typeof surname !== 'string' || surname.trim() === '') {
            throw new Error('Surname must not be empty');
        }
        this.surname = surname;
    }

    /**
     * @param {string} email
     */
    setEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        this.email = email;
    }

    /**
     * @param {string} password
     */
    setPassword(password) {
        if (!password || password.length < 6) {
            throw new Error('Password must be at least 6 characters');
        }
        this.password = password;
    }

    hashPassword() {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    }

    /**
     * @param {string} phone
     */
    setPhone(phone) {
        const phoneRegex = /^\d{10}$/; // South African format: 10 digits
        if (!phoneRegex.test(phone)) {
            throw new Error('Phone number must be 10 digits (e.g., 0716367633)');
        }
        this.phone = phone;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            surname: this.surname,
            email: this.email,
            phone: this.phone
        };
    }
}

export default User;

class Carwash {
    /**
     * @param {number} id
     * @param {number} ownerID
     * @param {string} name
     * @param {string} phone
     * @param {string} whatsappAPIKey
     * @param {string} whatsappPhoneNumber
     */
    constructor(id, ownerID, name, phone, whatsappAPIKey, whatsappPhoneNumber) {
        this.setID(id);
        this.setOwnerID(ownerID);
        this.setName(name);
        this.setPhone(phone);
        this.setWhatsappAPIKey(whatsappAPIKey);
        this.setWhatsappPhoneNumber(whatsappPhoneNumber);
    }

    /**
     * @param {number | undefined} id
     */
    setID(id) {
        if (typeof id !== 'number' || id <= 0) {
            throw new Error('Carwash ID must be a valid number');
        }
        this.id = id;
    }

    /**
     * @param {number | undefined} ownerID
     */
    setOwnerID(ownerID) {
        if (typeof ownerID !== 'number' || ownerID <= 0) {
            throw new Error('Owner ID must be a valid number');
        }
        this.ownerID = ownerID;
    }

    /**
     * @param {string | undefined} name
     */
    setName(name) {
        if (!name || typeof name !== 'string' || name.trim() === '') {
            throw new Error('Name must be a valid non-empty string');
        }
        this.name = name;
    }

    /**
     * @param {string} phone
     */
    setPhone(phone) {
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            throw new Error('Phone number must be 10 digits.');
        }
        this.phone = phone;
    }

    /**
     * @param {string | null} whatsappAPIKey
     */
    setWhatsappAPIKey(whatsappAPIKey) {
        this.whatsappAPIKey = whatsappAPIKey || null;
    }

    /**
     * @param {string | null} whatsappPhoneNumber
     */
    setWhatsappPhoneNumber(whatsappPhoneNumber) {
        this.whatsappPhoneNumber = whatsappPhoneNumber || null;
    }

    toJSON() {
        return {
            id: this.id,
            ownerID: this.ownerID,
            name: this.name,
            phone: this.phone,
            whatsappAPIKey: this.whatsappAPIKey,
            whatsappPhoneNumber: this.whatsappPhoneNumber
        };
    }
}

export default Carwash;

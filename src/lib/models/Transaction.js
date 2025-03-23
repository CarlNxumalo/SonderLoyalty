class Transaction {
    /**
     * @param {number} id
     * @param {number} customerID
     * @param {"earn" | "redeem"} type
     * @param {Date} timestamp
     * @param {number} points
     */
    constructor(id, customerID, type, timestamp, points) {
        this.setID(id);
        this.setCustomerID(customerID);
        this.setType(type);
        this.setTimestamp(timestamp);
        this.setPoints(points);
    }

    /**
     * @param {number | undefined} id
     */
    setID(id) {
        if (typeof id !== 'number' || id <= 0) {
            throw new Error('Transaction ID must be a valid number');
        }
        this.id = id;
    }

    /**
     * @param {number | undefined} customerID
     */
    setCustomerID(customerID) {
        if (typeof customerID !== 'number' || customerID <= 0) {
            throw new Error('Customer ID must be a valid number');
        }
        this.customerID = customerID;
    }

    /**
     * @param {string} type
     */
    setType(type) {
        if (type !== 'earn' && type !== 'redeem') {
            throw new Error('Type must be either "earn" or "redeem"');
        }
        this.type = type;
    }

    /**
     * @param {Date | undefined} timestamp
     */
    setTimestamp(timestamp) {
        if (!(timestamp instanceof Date)) {
            throw new Error('Timestamp must be a valid Date object');
        }
        this.timestamp = timestamp;
    }

    /**
     * @param {number | undefined} points
     */
    setPoints(points) {
        if (typeof points !== 'number' || points <= 0) {
            throw new Error('Points must be a valid number');
        }
        this.points = points;
    }

    toJSON() {
        return {
            id: this.id,
            customerID: this.customerID,
            type: this.type,
            timestamp: this.timestamp,
            points: this.points
        };
    }
}

export default Transaction;

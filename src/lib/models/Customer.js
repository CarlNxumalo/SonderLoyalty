import User from './User.js';

class Customer extends User {
    /**
     * @param {number | null} id
     * @param {string} name
     * @param {string} surname
     * @param {string} email
     * @param {string} password
     * @param {string} phone
     * @param {number} carwashID
     * @param {number} totalPoints
     */
    constructor(id, name, surname, email, password, phone, carwashID, totalPoints = 0) {
        super(id, name, surname, email, password, phone);
        this.setCarwashID(carwashID);
        this.setTotalPoints(totalPoints);
    }

    /**
     * @param {number} carwashID
     */
    setCarwashID(carwashID) {
        if (typeof carwashID !== 'number' || carwashID < 1) {
            throw new Error('Invalid carwash ID');
        }
        this.carwashID = carwashID;
    }

    /**
     * @param {number} totalPoints
     */
    setTotalPoints(totalPoints) {
        if (typeof totalPoints !== 'number' || totalPoints < 0) {
            throw new Error('Total points must be a non-negative number');
        }
        this.totalPoints = totalPoints;
    }

    /**
     * @param {number} points
     */
    addPoints(points) {
        if (typeof points !== 'number' || points <= 0) {
            throw new Error('Points must be a positive number');
        }
        this.totalPoints += points;
    }

    toJSON() {
        return {
            ...super.toJSON(),
            carwashID: this.carwashID,
            totalPoints: this.totalPoints
        };
    }
}

export default Customer;

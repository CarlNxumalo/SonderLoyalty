class Reward {
    /**
     * @param {number | null} id
     * @param {number} carwashID
     * @param {number} pointsRequired
     * @param {string} title
     * @param {string} description
     */
    constructor(id, carwashID, pointsRequired, title, description) {
        this.setID(id);
        this.setCarwashID(carwashID);
        this.setPointsRequired(pointsRequired);
        this.setTitle(title);
        this.setDescription(description);
    }

    /**
     * @param {number | null} id
     */
    setID(id) {
        if (id !== null && (typeof id !== 'number' || id <= 0)) {
            throw new Error('Reward ID must be a positive number or null');
        }
        this.id = id;
    }

    /**
     * @param {number} carwashID
     */
    setCarwashID(carwashID) {
        if (typeof carwashID !== 'number' || carwashID <= 0) {
            throw new Error('Carwash ID must be a positive number');
        }
        this.carwashID = carwashID;
    }

    /**
     * @param {number} pointsRequired
     */
    setPointsRequired(pointsRequired) {
        if (typeof pointsRequired !== 'number' || pointsRequired <= 0) {
            throw new Error('Points required must be a positive number');
        }
        this.pointsRequired = pointsRequired;
    }

    /**
     * @param {string} title
     */
    setTitle(title) {
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title must be a non-empty string');
        }
        this.title = title.trim();
    }

    /**
     * @param {string} description
     */
    setDescription(description) {
        if (!description || typeof description !== 'string' || description.trim() === '') {
            throw new Error('Description must be a non-empty string');
        }
        this.description = description.trim();
    }

    toJSON() {
        return {
            id: this.id,
            carwashID: this.carwashID,
            pointsRequired: this.pointsRequired,
            title: this.title,
            description: this.description
        };
    }
}

export default Reward;

import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    dateEnd: Date = undefined
    
    private constructor(
        public bike: Bike,
        public user: User,
        public startDate: Date,
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, 
                  dateNow: Date): Rent {
        const canCreate = Rent.canRent(rents, dateNow)
        if (canCreate) return new Rent(bike, user, dateNow)
        throw new Error('Overlapping dates.')
    }

    static canRent(rents: Rent[], dateNow: Date): boolean {
        for (const rent of rents) {
            if (startDate <= rent.dateTo) {
                return false
            }
        }
        return true
    }
}

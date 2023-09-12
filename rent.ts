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
        const canCreate = Rent.canRent(rents, dateNow, bike)
        if (canCreate){
            bike.available = true
            return new Rent(bike, user, dateNow)
        }
        throw new Error('Overlapping dates.')
    }

    static canRent(rents: Rent[], dateNow: Date, bike: bike): boolean {
        for (const rent of rents) {
            if (startDate <= rent.dateTo || bike.available == false) {
                return false
            }
        }
        return true
    }
}

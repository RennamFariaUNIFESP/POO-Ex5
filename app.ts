import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto';
import bcrypt, { compare } from 'bcrypt';

export class App {
  users: User[] = []  
  bikes: Bike[] = []
  rents: Rent[] = []

  listUser(): void{
    this.users.forEach(user => {
      console.log(user.name);
      console.log(user.email);
      console.log(user.password);
      console.log(user.id);
    });
  }

  listRent(): void{
    this.rents.forEach(rent => {console.log(rent);})
  }

  listBikes(): void{
    this.bikes.forEach(bike => {console.log(bike);})
  }

  autentifyUser(userId: string, password: string): boolean{
    try{
      const Hash = this.users.find(user => user.id === userId)
      if((bcrypt.compareSync(password, Hash.password) === true)){
        return true}
      else{
        return false}
    }
    catch(Error){
      throw new Error('User ID is wrong or does not exist')
    }
  }

  findUser(email: string): User|undefined {
    return this.users.find(user => user.email === email)
  }

   async registerUser(user: User): Promise<string> {
    for (const rUser of this.users) {
      if (rUser.email === user.email) {
        throw new Error('Duplicate user.')
      }
    }
    const newId = crypto.randomUUID()
    user.id = newId
    const hash = await bcrypt.hash(user.password, 10)
    console.log(hash)
    user.password = hash
    this.users.push(user)
    return newId
  }

  registerBike(bike: Bike): string {
    const newId = crypto.randomUUID()
    bike.id = newId
    this.bikes.push(bike)
    return newId
  }

  removeUser(email: string): void {
    const userIndex = this.users.findIndex(user => user.email === email)
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1)
      return
    }
    throw new Error('User does not exist.')
  }

  rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
    const bike = this.bikes.find(bike => bike.id === bikeId)
    if (!bike) {
      throw new Error('Bike not found.')
    }
    const user = this.findUser(userEmail)
    if (!user) {
      throw new Error('User not found.')
    }
    const bikeRents = this.rents.filter(rent =>
      rent.bike.id === bikeId && !rent.dateReturned
    )
    const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
    this.rents.push(newRent)
  }

  returnBike(bikeId: string, userEmail: string) {
    const today = new Date()
    const rent = this.rents.find(rent => 
      rent.bike.id === bikeId &&
      rent.user.email === userEmail &&
      rent.dateReturned === undefined &&
      rent.dateFrom <= today
    )
    if (rent) {
      rent.dateReturned = today
      return
    }
    throw new Error('Rent not found.')
  }
}
export interface bookingDataType{
    id: number, 
    days:number,
    rent_per_day:number,
    car_name: string,
    status: string,
    totalCost: number
    createdAt?: Date,
    user_id?:number
}
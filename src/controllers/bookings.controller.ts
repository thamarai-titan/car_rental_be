import type {Request, Response} from 'express';
import { prisma } from '../prisma/prisma';
import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken';
import type { bookingDataType } from '../modules/types/booking.types';

interface AuthPayload extends JwtPayload {
  userId: number;
}

export const getUserIDfromToken = async (req:Request)=>{
    const authHeader = req.header("Authorization")
    const token = authHeader?.split(" ")[1]
    if(!token){
        throw new Error("NO Token")
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as AuthPayload
    return decoded.userId
    
}

export const getUserInfofromToken = async (req:Request)=>{
    const authHeader = req.header("Authorization")
    const token = authHeader?.split(" ")[1]
    if(!token){
        throw new Error("NO Token")
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as AuthPayload
    
    const userInfo = await prisma.user.findUnique({
        where:{
            id:decoded.userId
        }
    })

    return userInfo

}

export const createBooking = async (req:Request, res:Response)=>{
    const {carName, days, rentPerDay} = req.body;

    if (carName == "" || days <= 0 || days > 365 ||  rentPerDay >= 2000){
        return res.status(400).json({
            error: "Invalid Inputs"
        })
    }

    const userId = await getUserIDfromToken(req);

    try {
        const booking = await prisma.bookings.create({
            data:{
                user_id: userId,
                car_name: carName,
                days: days,
                rent_per_day: rentPerDay,
                status: "booked"
            }
        })

        res.status(201).json({
            success: true,
            data: {
                "message": "Booking created successfully",
                "bookingId": booking.id,
                "totalCost": booking.days * booking.rent_per_day
            }
        })
    } catch (error) {
        res.status(401).json({
            error: "Booking Failed"
        })
    }
}
interface QueryParams {
    id?: number,
    summary?: string
}

export const getSingleBookings = async (req:Request, res:Response)=>{
    const allQueryParams = req.query as QueryParams

    const id = allQueryParams.id
    const summary =allQueryParams.summary == "true"

    if(!summary){
    try {
    const bookingData = await prisma.bookings.findFirst({
        where: {
            id:Number(id),
        }
    })
    if(!bookingData){
        return res.status(400).json({
            error: "Cannoy get the booking Data"
        })
    }
    const totalCost = bookingData.days * bookingData.rent_per_day
    const responseData: bookingDataType = {
        id:bookingData.id,
            car_name:bookingData.car_name,
            days: bookingData.days,
            rent_per_day:bookingData.rent_per_day,
            status:bookingData.status,
            totalCost: totalCost
    }
    res.status(200).json({
        success:true,
        data:responseData
    })
    } catch (error) {
        res.status(404).json({
            error: "booking not found"
        })
    }
    }
    else{
        const userInfo = await getUserInfofromToken(req)

        if(!userInfo){
            return res.status(401).json({
                error:"No user available"
            })
        }

        try {
            const totalBookings = await prisma.bookings.count({
                where:{
                    user_id: userInfo.id,
                    status: "booked"
                }
            })

            const totalAmount = await prisma.bookings.findMany({
                where:{
                    user_id:userInfo.id
                },
                select:{
                    days: true,
                    rent_per_day: true
                }
            })

            const totalAmountSpent = totalAmount.reduce(
                (sum,b) => sum + b.rent_per_day * b.days,
                0
            )

            res.status(200).json({
                success:true,
                data:{
                    userId:userInfo.id,
                    username:userInfo.username,
                    totalBookings: totalBookings,
                    totalAmoutSpent: totalAmountSpent
                }
            })
        } catch (error) {
            res.status(404).json({
                error: "bookingId not found"
            })
        }   
    }
}


export const EditBooking = async (req: Request, res:Response)=>{
    const {carName, days, rentPerDay, status} = req.body
    const {bookingId} = req.params
    const id = Number(bookingId)

    if(!bookingId){
        return res.status(400).json({
            error: "bookingID not found"
        })
    }

    try {
        const datafromreq:any = {}
        if(carName!==undefined) datafromreq.car_name = carName
        if(days!==undefined) datafromreq.days = days
        if(rentPerDay!==undefined) datafromreq.rent_per_day = rentPerDay
        if(status!==undefined) datafromreq.status = status

        const updatedBooking = await prisma.bookings.update({
            where:{
                id:id
            },
            data:datafromreq
                })

        res.status(201).json({
            success:true,
            data:{
                message:"Booking updated successfully",
                booking:{
                    id:updatedBooking.id,
                    car_name: updatedBooking.car_name,
                    days: updatedBooking.days,
                    rent_per_day: updatedBooking.rent_per_day,
                    status: updatedBooking.status,
                    totalCost: updatedBooking.days * updatedBooking.rent_per_day
                }
            }
        })
    } catch (error) {
        res.status(404).json({
            error: "booking not found"
        })
    }
}


export const DeleteBooking = async (req:Request, res:Response)=>{
    const {bookingId} = req.params
    const id = Number(bookingId)

    if(!bookingId){
        return res.status(403).json({
            error:"booking id not belong to the user"
        })
    }

    try {
        const deleteBooking = await prisma.bookings.delete({
            where:{
                id: id
            }
        })

        res.status(200).json({
            success: true,
            message: "Booking deleted successfully"
        })
    } catch (error) {
        res.status(404).json({
            error: "Booking not found"
        })
    }


}
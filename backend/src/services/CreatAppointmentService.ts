import {startOfHour} from 'date-fns';

import Appointment from '../models/appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';



interface Request{
    provider:string;
    date:Date;
}

class CreateAppointmentService{
    private appointmentsRepository:AppointmentsRepository;
    constructor(appointmentsRepository:AppointmentsRepository){
        this.appointmentsRepository = appointmentsRepository;
    }

     public execute({provider, date}:Request):Appointment{
        const  appointmentData=startOfHour(date);
        const findAppointmentsInSameDate = this.appointmentsRepository.findByDate(
            appointmentData);
        
        if(findAppointmentsInSameDate){
            throw Error('This appointment is already booked');
          
        }
     
        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentData,
        });
        return appointment;
     }

}

export default CreateAppointmentService;
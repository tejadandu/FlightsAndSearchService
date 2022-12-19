const { FlightRepository, AirplaneRepository } = require('../repository/index');
const { compareTime } = require('../utils/helper')

class FlightService {
    constructor() {
        this.airplaneRepository = new AirplaneRepository();
        this.flightRepository = new FlightRepository();
    }



    async createFlight(data) {
        try{
            if(!compareTime(data.arrivalTime, data.departureTime)){
                throw {error: "ArrivalTime time can not be less than the DepartureTime"}
            }
            const airplane = await this.airplaneRepository.getAirplane(data.airplaneId);
            const flight = await this.flightRepository.createFlight({...data, totalSeats: airplane.capacity});
            return flight;
        }catch(error){
            console.log("Something wrong at service layer");
            throw {error};
        }
    }

    async getFlightData(){
        // Todo
    }
}


module.exports = FlightService;

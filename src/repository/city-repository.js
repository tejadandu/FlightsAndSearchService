const {City} = require('../models/index');
const { Op } = require('sequelize');
class CityRepository{

    // constructor(){

    // }
    async createCity({ name }) {
        try{
            const city = await City.create({
                name
            });
            return city;
        }catch(error){
            console.log("Something went wrong in the repository layer");
            throw {error};
        }
    }
    async deleteCity(cityId) {
        try{
            await City.destroy({
                where:{
                    id: cityId,
                }
            });
            return true;
        }catch(error){
            console.log("Something went wrong in the repository layer");
            throw {error};
        }

    }
    async updateCity(cityId, data){
        try{
            // The below approch also works but won't return updated object
            // if we are using pg then returning: true can be used, else not
            // const city = await City.update(data, {
            //     where: {
            //         id: cityId,
            //     }
            // });
            // for getting updated data in mysql we can use the below approach,
            const city = await City.findByPk(cityId);
            city.name = data.name;
            await city.save();
            return city;
        }catch(error){
            console.log("Something went wrong in the repository layer");
            throw {error};
        }

    }
    async getCity(cityId) {
        try{
            const city = await City.findByPk(cityId);
            return city;
        }catch(error){
           console.log("Something went wrong in the repository layer");
           throw {error};
        }
    }

    async getAllCities(filter) { // filter can be empty also
            try {
                if(filter.name) {
                    const cities = await City.findAll({
                        where: {
                            name: {
                                [Op.startsWith]: filter.name
                            }
                        }
                    });
                    return cities;
                }
                const cities = await City.findAll();
                return cities;
            } catch (error) {
                console.log("Something went wrong in the repository layer");
                throw {error};
            }
        }
}


module.exports = CityRepository;

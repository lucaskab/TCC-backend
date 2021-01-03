const Type = require('../models/Type');


module.exports = {

  async store(request,response) {
    const { area, name } = request.body;
        type = await Type.create({
          name,
          area
        })
    return response.json(type);
},

    async update(request,response){
      const  {area,name, newname} = request.body;
      console.log(request.body);
      const type = await Type.updateOne(
          {area,name},
          { $set: {name: newname}}  );
      return response.json(type);
    },

    async findAll(request, response) {
      const {area} = request.body;
      const types = await Type.find({area});
      return response.json(types);
    },


    async delete(request,response){
      const {area,name} = request.body;
       await Type.deleteOne({area,name});
      return response.json({response: "Deletado com sucesso"});
  },
}
const Area = require('../models/Area');


module.exports = {

  async store(request,response) {
    const { name } = request.body;
        area = await Area.create({
          name
        })
    return response.json(area);
},

    async update(request,response){
      const  {name, newname} = request.body;
      const area = await Area.updateOne(
          {name},
          { $set: {name: newname}}  );
      return response.json(area);

    },

    async findAll(request, response) {
      const areas = await Area.find({}).sort({name: 1});
      return response.json(areas);
    },


    async delete(request,response){
      const {name} = request.body;
       await Area.deleteOne({name});
      return response.json({response: "Deletado com sucesso"});
  },
}
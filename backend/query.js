const db = require('./models/index');

// find all seller users
const query = async () =>{

  //get all projects
  
  const projects = await db.User.findAll({
      attributes:['firstName', 'id']
  });
  console.log("All projects:", JSON.stringify(projects, null, 2));
}

query();

const db = require('./models/selleruser');

// find all seller users
const query = async () =>{

  //get all projects
  
  const projects = await db.SellerUser.findAll({
      attributes:['first_name', 'id']
  });
  console.log("All projects:", JSON.stringify(projects, null, 2));
}

query();

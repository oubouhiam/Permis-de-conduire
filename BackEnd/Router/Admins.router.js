module.exports = function (app) {

	const cors = require("cors")

    // --------------------Calling Controller File----------------- 
    var Admins = require('../Controllers/Admins');
  

    
    //------------------------Authentifcation amin---------------------
    app.post('/Admins/Add', Admins.AdminADD);

    //------------------------Login ADmin---------------------
    app.post('/Admins/login', Admins.AdminLogin);
    
        //  // ______________________get Product by id__________________
        //  app.post('/send_mail', cors(),Admins.Email);



    //------------------------get all Conducteur---------------------
    app.get('/Conducteur', Admins.getConducteur);

    //------------------------update Conducteur---------------------
    app.post('/Conducteur/update/:id', Admins.UpdateConducteur);
    
    //------------------------get all Conducteur---------------------
    app.get('/Admins', Admins.getadmins);

    //------------------------get all Conducteur---------------------
    app.get('/Conducteur/update/:id', Admins.getconductorById);
    


}
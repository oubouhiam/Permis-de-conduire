module.exports = function (app) {



    // --------------------Calling Controller File----------------- 
    var Conducteur = require('../Controllers/Conducteur');
  

    
    //------------------------get all Catigories---------------------
    app.post('/Conducteur/Add', Conducteur.ConducteurAdd);
    //------------------------get all Catigories---------------------
    app.get(`/validateAccount/:token`, Conducteur.conducteurActivated);

    
    //------------------------get all Conducteur---------------------
    app.get('/Conducteur', Conducteur.getConducteur);

    // ______________________get Product by id__________________
    app.get('/Conducteur/:Matricule', Conducteur.getconductorBymatricule);
}
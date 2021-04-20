//__________________CALL MODEL____________________
const Admins = require('../Models/Admin.models');
//__________________CALL MODEL____________________
const Conducteur = require('../Models/Conducteur.Models');

//Call Packages JSON Web Token & BCRYPT
const jwt = require('jsonwebtoken');
//A library to help you hash passwords.
const bcrypt = require('bcrypt');
// _____________PACKAGES NODEMAILER___________
const nodemailer = require("nodemailer");

//------------------------Admin authentication---------------------
exports.AdminADD = (req, res) => {
    //10==saltRounds
    bcrypt.hash(req.body.Password, 10, function (err, hashPassword) {
      if (err) {
        res.json({
          error: err
        })
      }
      const Login = req.body.Login;
      const Password = hashPassword;
      const role = "Admin";
      const AdminPush = new Admins({
        Login,
        Password,
        role
      });
      AdminPush
        .save()
        .then(() => res.json("Admin authentication successfully"))
        .catch((err) => res.status(400).json("Error :" + err));
    });
  }
  

//-------------------------login User-----------------------------

exports.AdminLogin = (req, res) => {

    let Login = req.body.Login;
    let Password = req.body.Password;
  
    Admins.findOne({
        Login: Login
      })
      .then(Admins => {
  
        if (Admins) {
          bcrypt.compare(Password, Admins.Password, function (err, result) {
            if (err) {
              res.json({
                error: err
              })
            }
            if (result) {
              let token = jwt.sign({
                Login: Login
              }, 'tokenkey', (err, token) => {
                res.cookie("token", token)
                res.json({
                res:"YES"
                })
              })
            } 
            
          })
        } else {
          res.json({
            message: 'Admin not found'
          })
        }
      }).catch((err) => res.status(400).json("Error :" + err));
  }
  


    //______________________get all conducteur_____________________ 
exports.getConducteur = (req, res) => {
  Conducteur.find()
    .then(ConducteurInfos => {
      res.status(200).json(ConducteurInfos);
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error!",
        error: error
      });
    });
};




    //______________________get all Admins_____________________ 
    exports.getadmins = (req, res) => {
      Admins.find()
        .then(AdminsInfos => {
          res.status(200).json(AdminsInfos);
        }).catch(error => {
          console.log(error);
          res.status(500).json({
            message: "Error!",
            error: error
          });
        });
    };





//________________________updating Conducteur____________________
exports.UpdateConducteur = async(req, res) => {
  // Find Product By ID and update it
  Conducteur.findOneAndUpdate({
      _id: req.params.id
    }, {
      Nombre_de_Point: req.body.Nombre_de_Point
    })
    .then(response => {
    

         // send notification in email
const transport = nodemailer.createTransport({

service: "gmail",
    auth: {
      user: 'tt951920@gmail.com',//email
      pass: 'Brief2020'//password
    }
})
// // email = Conducteur.email;
transport.sendMail({
  from: 'tt951920@gmail.com',
    to:response.Email ,
    subject: "Nombre de Point",
    html: `<div className="email" style="
    border: 1px solid black;
    padding: 20px;
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px; 
    ">
    <h2>Nous avons changer votre solde</h2>
    <p>Votre solde et ${req.body.Nombre_de_Point}<p>
     </div>
`})
  res.status(200);
    }



//   // send notification in email
// const transport = nodemailer.createTransport({

// service: "gmail",
//     auth: {
//       user: 'tt951920@gmail.com',//email
//       pass: 'Brief2020'//password
//     }
// })
// // email = Conducteur.email;
// transport.sendMail({
//   from: 'tt951920@gmail.com',
//     to:Email ,
//     subject: "Nombre de Point",
//     html: `<div className="email" style="
//     border: 1px solid black;
//     padding: 20px;
//     font-family: sans-serif;
//     line-height: 2;
//     font-size: 20px; 
//     ">
//     <h2>Nous avons changer votre solde</h2>
//     <p>Votre solde et ${req.body.Nombre_de_Point}<p>
//      </div>
// `})
// })
    
    )
      .catch((err) => res.status(400).json("Error :" + err));

     
  };














// ______________________get conductor by id__________________
exports.getconductorById = (req, res) => {
  Conducteur.findById(req.params.id)
      .then(Delivery => {
        res.status(200).json(Conducteur);
      }).catch(err => {
          if(err.kind === 'ObjectId') {
              return res.status(404).send({
                  message: "Conducteur not found with id " + req.params.id,
                  error: err
              });                
          }
          return res.status(500).send({
              message: "Error retrieving Category with id " + req.params.id,
              error: err
          });
      });
};






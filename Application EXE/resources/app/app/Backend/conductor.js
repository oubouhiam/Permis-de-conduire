// Display all constractor
$(function () {
    var $getContructor = $('#getContructor');

    $.ajax({
        type: 'GET',
        url: 'https://permis-cond.herokuapp.com/Conducteur',
        success: function (getContructor) {
            $.each(getContructor, function (i, row) {
                $getContructor.append(`
        <tr>
        <td>${row.Matricule}</td>
        <td>${row.Nom}</td>
        <td>${row.Telephone}</td>
        <td>${row.Email}</td>
        <td>${row.Nombre_de_Point}</td>
        <td class="text-center py-0 align-middle">
        <div class="btn-group btn-group-sm">
            <button class="btn btn-primary" onclick="updateConstractor('${row._id}')" type="button" >
            Edite
          </button>
        </div>
    </td>
      </tr>

        `)
            });
        }
    });

})

// add new constractor 
$('#add_Conducteur').on('click', function (e) {
    var $Nomfild = $('#Nomfl');
    var $Matriculefild = $('#Matriculefl');
    var $Telephonefild = $('#Telephonefl');
    var $Emailfild = $('#Emailfl');
    var $Nombre_de_Pointfild = $('#Nombre_de_Pointfl');
    if ($Nomfild.val() == "" || $Matriculefild.val() == "" ||  $Telephonefild.val() == "" || $Emailfild.val() == ""||  $Nombre_de_Pointfild.val() == "" ) {
        alert("please make sure that you fill out all the fill!!");
        e.preventDefault();
    } else {

        $.post('https://permis-cond.herokuapp.com/Conducteur/Add',
                    data= {
                Matricule: $Matriculefild.val(),
                Nom: $Nomfild.val(),
                Telephone: $Telephonefild.val(),
                Email: $Emailfild.val(),
                Nombre_de_Point: $Nombre_de_Pointfild.val()
            },
            success= function () {
                alert("Your Info Added");
                location.href = "index.html"
            });

    }
});

// Login if admin/conductor 
$('#login_conductor').on('click', function (e) {
    var $Usernamefild = $('#Username');
    var $Passfild = $('#pass');

    if ($Usernamefild.val() == "" || $Passfild.val() == "") {
        alert("please make sure that you fill out all the fill!!");
        e.preventDefault();
        } else {

        $.post('https://permis-cond.herokuapp.com/Admins/login',
                    data= {
                        Login: $Usernamefild.val(),
                        Password: $Passfild.val()
            },
            success= function (response) {
                console.log(response)
                if(response.res == "YES"){
                    location.href = "dashboard-admin.html"
                }else{
                    alert("Invalid username and password!");
                }
            }
        )}
});


function updateConstractor(_id) {
    localStorage.setItem('id', _id);
    location.href = "dashboard-admin-edit.html"
}
$(document).ready(()=>{

$("#edit").on('click', function () {
    var id = localStorage.getItem('id');
    var $number= $('#number');
  
   if ($number.val() == "") {
        alert("please make sure that you fill out all the fill!!");
    }else{
        console.log($number.val());
        $.post(`https://permis-cond.herokuapp.com/Conducteur/update/${id}`,
        data= {
            Nombre_de_Point: $number.val()
        },
        success= function () {
            
        }
        
        )
        window.location.href="dashboard-admin.html";
}

});
})


$('#Check').on('click', function (e) {

    var $Matricule= $('#Matriculefld');
    var $getContructor = $('#getContructorbtmat');

    if ($Matricule.val() == "") {
        alert("Matricule file is empty");
        e.preventDefault();
    } else {
        Matricule2 = $Matricule.val();
        $.ajax({
            type: 'GET',
            url: `https://permis-cond.herokuapp.com/Conducteur/${Matricule2}`,
            success: function (getContructor) {
                $.each(getContructor, function (i, row) {
            if(row.Matricule != ""){
                $getContructor.append(`
                <tr>
                <td>${row.Matricule}</td>
                <td>${row.Nom}</td>
                <td>${row.Telephone}</td>
                <td>${row.Email}</td>
                <td>${row.Nombre_de_Point}</td>
              </tr>
          `)
            }else{
                alert("there is no one with matricule:"+Matricule2);
        }
        });
    }
});

    }
});
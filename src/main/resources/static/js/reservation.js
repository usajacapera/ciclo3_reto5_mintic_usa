//let ruta = "http://150.136.171.92:8080"
let ruta ="http://localhost:8080"

function getReservations(){
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success: function(respuesta){
            console.log(respuesta);
            $("#resultadoReservaciones").empty();
            showReservations(respuesta)
        },
        error: function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Peticion completada");
        }
    });
}
function queryByIdReservation(){
    let id = $("#SetIdReservation").val();
    if(id == ""){
        alert("Debe digitar el ID")
    }else{
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation" + "/" + id,
            type:"GET",
            datatype:"JSON",
            success: function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                if(respuesta != null){
                    if(respuesta.boat == null && respuesta.client == null){
                        vacioCliente = "Sin cliente asignao"
                        vacioBarco = "Sin barco asignado";
                        idvacio = 0;
                        $("#idReservation").val(respuesta.idReservation);
                        $("#startDate").val(respuesta.startDate);
                        $("#devolutionDate").val(respuesta.devolutionDate);
                        $("#devolutionDate").val(respuesta.status);
                        $("#dataBoat").val(vacioBarco);
                        $("#idGetBoat").val(idvacio);
                        $("#dataClient").val(vacioCliente);
                        $("#idGetClient").val(idvacio);
                    }else{
                        $("#idReservation").val(respuesta.idReservation);
                        $("#startDate").val(respuesta.startDate);
                        $("#devolutionDate").val(respuesta.devolutionDate);
                        $("#devolutionDate").val(respuesta.status);
                        $("#dataBoat").val(respuesta.boat.name + " " + "(" + "Categoria: " +  respuesta.boat.category.name + "-" + respuesta.boat.category.description + ")");
                        $("#idGetBoat").val(respuesta.boat.id);
                        $("#dataClient").val(respuesta.client.name);
                        $("#idGetClient").val(respuesta.client.idClient)
                    }
                    alert("Producto encontrado satisfactoriamente")
                }else{
                    alert("el ID no se encuentra resgistrado")
                }
            },
            error: function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }
}
function showReservations(respuesta){
    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr>";
    myTable += "<td>"+"ID"+"</td>";
    myTable += "<td>"+"STARTDATE"+"</td>";
    myTable += "<td>"+"DEVOLUTIONDATE"+"</td>";
    myTable += "<td>"+"STATUS"+"</td>";
    myTable += "<td>"+"BARCO"+"</td>";
    myTable += "<td>"+"CLIENT"+"</td>";
    myTable += "<td>"+"SCORE"+"</td>";
    myTable += "<td>"+"BUTTON"+"</td>";
    myTable += "</tr>";
    myTable += "</thead>";
    for(i = 0; i < respuesta.length; i++){
        if(respuesta[i].boat == null && respuesta[i].client == null && respuesta[i].score == null){
            let vacioBoat = "Sin barco asignado";
            let vacioClient = "Sin cliente asignado";
            let vacioScore = "Sin calificación";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].status + "</td>";
            myTable += "<td>" + vacioBoat + "</td>";
            myTable += "<td>" + vacioClient + "</td>";
            myTable += "<td>" + vacioScore + "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }else if(respuesta[i].boat != null && respuesta[i].client != null && respuesta[i].score == null){
            let vacioScore = "Sin calificación";
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].status + "</td>";
            if(respuesta[i].boat.category == null){
                myTable += "<td>" + respuesta[i].boat.name + " " + "(" + "Sin categoria asignada" + ")" + "</td>";
            }else{
                myTable += "<td>" + respuesta[i].boat.name + " " + "(" + respuesta[i].boat.category.name + "-" + respuesta[i].boat.category.description + ")" + "</td>";
            }
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + vacioScore+ "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }else{
            myTable += "<tr>";
            myTable += "<td>" + respuesta[i].idReservation + "</td>";
            myTable += "<td>" + respuesta[i].startDate + "</td>";
            myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
            myTable += "<td>" + respuesta[i].status + "</td>";
            myTable += "<td>" + respuesta[i].boat.name + " " + "(" + respuesta[i].boat.category + ")" + "</td>";
            myTable += "<td>" + respuesta[i].client.name + "</td>";
            myTable += "<td>" + respuesta[i].score.name + " " + "(" + respuesta[i].score.description + ")" + "</td>";
            myTable += "<td> <button onclick='removeReservation("+respuesta[i].idReservation+")'>Borrar</button>";
            myTable += "</tr>";
        }
    }
    myTable += "</table>";
    $("#resultadoReservaciones").append(myTable);
}
function createReservation(){
    if($("#idGetBoat").val() != null && $("#idGetClient").val() != null){
        let myData2 = {
            idClient:$("#idGetClient").val()
        };
        let myData3 = {
            id:$("#idGetBoat").val()
        };
        let myData = {
            idReservation:$("#idReservation").val(),
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            client:myData2,
            boat:myData3,
        };
        let dataToSend = JSON.stringify(myData);
        $.ajax({
            headers:{
                accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
            },
            url: ruta + "/api/Reservation/save",
            type:"POST",
            data:dataToSend,
            contentType: "application/json",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#resultadoReservaciones").empty();
                $("#devolutionDate").val("");
                $("#status").val("");
                $("#idGetBoat").val("");
                $("#idGetClient").val("");
                alert("Se ha creado la reserva exitosamente")
                getReservations();
            },
            error : function(xhr, status){
                alert("ha sucedido un problema");
                console.log(status);
            },
            complete : function(xhr, status){
                console.log("Petición completada");
            }
        });
    }else{
        alert("Debe asignar un barco y un cliente a la reserva")
    }

}
function modReservation(){
    let myData2 = {
        idClient:$("#idGetClient").val()
    };
    let myData3 = {
        id:$("#idGetBoat").val()
    };
    let myData = {
        idReservation:$("#idReservation").val(),
        startDate:$("#startDate").val(),
        devolutionDate:$("#devolutionDate").val(),
        status:$("#status").val(),
        client:myData2,
        boat:myData3,
    };
    console.log(myData);
    let dataToSend=JSON.stringify(myData);
    $.ajax({
        headers:{
            accept: 'application/json',"Access-Control-Allow-Origin":"*", "Content-Type": 'application/json'
        },
        url: ruta + "/api/Reservation/update",
        type:"PUT",
        data:dataToSend,
        contentType:"application/JSON",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            $("#resultadoReservaciones").empty();
            $("#devolutionDate").val("");
            $("#status").val("");
            $("#idGetBoat").val("");
            $("#idGetClient").val("");
            alert("Se ha actualizado la reserva exitosamente")
            getReservations();
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
function removeReservation(idElemento){
    id = parseInt(idElemento);
    $.ajax({
        url: ruta + "/api/Reservation" + "/" + id,
        type:"DELETE",
        datatype:"JSON",
        success:function(respuesta){
            $("#resultadoReservaciones").empty();
            getReservations();
            alert("Se ha cancelado la reserva exitosamente")
        },
        error : function(xhr, status){
            alert("ha sucedido un problema");
            console.log(status);
        },
        complete : function(xhr, status){
            console.log("Petición completada");
        }
    });
}
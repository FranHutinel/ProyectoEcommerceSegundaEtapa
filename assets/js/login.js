let usuarios = [
    {
        nombre: "sebastian.piñera",
        password: "123456",
        correo: "elseba@gmail.com"
    },
    {
        nombre: "pepe.kast",
        password: "123456",
        correo: "pepitokast@gmail.com"
    },
    {
        nombre: "adolfito.hitler",
        password: "123456",
        correo: "adolfhitler@gmail.com"
    },
    {
        nombre: "dalai.lama",
        password: "123456",
        correo: "dalailama@gmail.com"
    },

]


document.getElementById("form-login").addEventListener("submit", function(event){
    event.preventDefault();
    let nombre = document.getElementById("login-nombre").value;
    let password = document.getElementById("login-password").value;

    let encontrado = usuarios.find(usuario => usuario.nombre == nombre && usuario.password == password)

    if(encontrado){
        alert("Usuario autenticado.");
        location.href= "./index.html";
    }else{
        alert("Datos incorrectos.");
    }
})
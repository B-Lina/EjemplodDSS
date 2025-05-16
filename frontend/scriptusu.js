function guardar() {
  event.preventDefault();
  
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
      "dni": document.getElementById("dni").value,
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("correo").value
  });

  let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };
  
  fetch("https://ejemplodss.netlify.app/.netlify/functions/usuarios/usuarios", requestOptions)
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json(); // Cambiado a json() en lugar de text()
      })
      .then((result) => {
          console.log("Usuario creado:", result);
          alert("Usuario guardado exitosamente!");
          // Opcional: Limpiar el formulario después de guardar
          document.getElementById("adicionarEstudiante").reset();
      })
      .catch((error) => {
          console.error("Error al guardar:", error);
          alert("Error al guardar el usuario: " + error.message);
      });
}

/*
function guardar(){
 
    let apellidos='';
    let datoingresado = document.getElementById("correo").value;
 
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();
 
    let raw = JSON.stringify({
      "dni": document.getElementById("dni").value,
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("correo").value
    });
 
    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://ejemplodss.netlify.app/.netlify/functions/usuarios/usuarios", requestOptions)
    
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error)); 
}
*/
 
function cargar(resultado){
    let transformado = JSON.parse(resultado);
    var salida="";
    var elemento="";
 
    for (const [clave, valor] of Object.entries(transformado)) {
        console.log(`${clave}: ${valor}`);
        salida = "Clave=" + clave +  " Valor=" + valor + "<br>" + salida;
    }
    document.getElementById("rta").innerHTML = salida;
}

function listar(){
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    let ndoc = document.getElementById("numdoc").value;
    //usuarios?id=user124
         //https://proyectofinaldsws.netlify.app/.netlify/functions/usuarios
    //fetch("https://ejemplodss.netlify.app/.netlify/functions/usuarios?iden="+ndoc, requestOptions)
    //fetch("https://ejemplodss.netlify.app/.netlify/functions/usuarios?iden="+ndoc, requestOptions)
    fetch("https://ejemplodss.netlify.app/.netlify/functions/usuarios/usuarios?iden=" + ndoc, requestOptions)

      .then((response) =>
        response.text())
      .then((result) =>
        cargar(result))
      .catch((error) =>
        console.error(error));
}

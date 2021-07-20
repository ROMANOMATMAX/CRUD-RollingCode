const emailInput = document.getElementById('email');
const passInput = document.getElementById('pass');
const nombreInput = document.getElementById('nombre');
const roleInput = document.getElementById('role')
const tabla = document.getElementById('tabla-contenido');
const bodyModal = document.getElementById('contenedor-detalle-usuario');
console.log(emailInput, passInput, nombreInput, roleInput, tabla);
const usuariosJSON = localStorage.getItem('usuarios');
console.log(usuariosJSON);
let usuarios = JSON.parse(usuariosJSON) || [];
console.log(bodyModal);
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

console.log(create_UUID());

mostrarUsuarios()
function agregarUsuario(event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passInput.value;
    const nombre = nombreInput.value;
    const role = roleInput.value;
    const nuevoUsuario = {id: create_UUID(), email, password, nombre, role, date: Date.now()}
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    usuarios = JSON.parse(localStorage.getItem('usuarios'))
    console.log(usuarios);
    limpiarFormulario();
    mostrarUsuarios()
}

function limpiarFormulario () {
    emailInput.value = ""
    passInput.value = ""
    nombreInput.value="" 
    roleInput.value=""
}

const deleteItem = (man) => {
  console.log("hiciste click en editar");
  console.log(man);
  usuarios = usuarios.filter( usuario => usuario.id !== man);
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  usuarios = JSON.parse(localStorage.getItem('usuarios'))
  mostrarUsuarios()
}

const mostrarDetallesUsuario = (usuarioId) => {
  console.log(usuarioId);
  const usuarioEnCuestion = usuarios.find(usuario => usuario.id = usuarioId);
  console.log(usuarioEnCuestion);
  console.log(usuarioEnCuestion.date);
  console.log(new Date(usuarioEnCuestion.date).toLocaleDateString(undefined, options));
  const contenido = `
  <p>Nombre: ${usuarioEnCuestion.nombre}</p>
  <p>Email: ${usuarioEnCuestion.email}</p>
  <p>Role: ${usuarioEnCuestion.role}</p>
  <p>Fecha de registro: ${new Date(usuarioEnCuestion.date).toLocaleDateString(undefined, options)}</p>
  `
  console.log("hello");
  console.log(contenido);
  bodyModal.innerHTML = contenido;
}

function mostrarUsuarios() {
    const contenido = usuarios.map(usuario => {
        return `<tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.role}</td>
                    <td>
                      <button type="button" onclick="mostrarDetallesUsuario('${usuario.id}')"class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#ModalUsuario">
                        Ver detalles
                      </button>
                      <button onclick="deleteItem('${usuario.id}')" class="btn btn-danger mx-2">Borrar</button>
                      <button class="btn btn-warning">Editar</button>
                      </td>
                </tr>`
    })
    console.log(contenido.join(''));
    const primeraParte = `<thead>
    <tr>
      <th scope="col">Nombre</th>
      <th scope="col">Role</th>
      <th scope="col">Acciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Otto</td>
      <td>@mdo</td>
      <td><button onclick="deleteItem()" class="btn btn-danger mx-2">Borrar</button><button onclick="deleteItem()" class="btn btn-warning">Editar</button></td>
    </tr>
  </tbody>`
  const segundaParte = contenido.join('');
  const theWholeContent = primeraParte + segundaParte;
    tabla.innerHTML = theWholeContent;
}
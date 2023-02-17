let maxCredito;
let montoCredito;
let cuotasTres;
let cuotasSeis;
let cuotasDoce;
let validarNombre;
let validarSueldo;
let validarMonto;
let validarCuotas;
let arregloContenedor;
let cantCuotas ;
let montoCuotas ;
let nombre;
let sueldo;
let validarNombreBuscar;
let validarNombreBorrar;
let validarMontoFiltrar;
let filtrados;

// clases

class Credito {
    constructor(nombre,sueldo,monto,cuotas,valorCuota){
        this.nombre=nombre;        
        this.sueldo=sueldo;
        this.monto=monto;
        this.cuotas=cuotas;
        this.valorCuota=valorCuota;
    }    
}





function afectacionMensualPermitida(sueldo,credito){                        //se fija si la cuota no supera el 20% del sueldo en 3 6 o 12 cuotas    
    if ((sueldo *0.2)>=(credito/3)){                
        cuotasTres =true;
    } 
    if ((sueldo *0.2)>=(credito/6)){            
        cuotasSeis =true;
    } 
    if ((sueldo *0.2)>=(credito/12)){            
        cuotasDoce =true;
    }     
}

function cantidadCuotasPermitida (cuotasTres,cuotasSeis,cuotasDoce,credito,getEventos){                          // te dice en cuantas cuotas podes sacar el prestamo . si el monto de la cuota supera mas del 20% no lo podes sacar en esa cantidad de cuotas    
    if ((cuotasTres==true) && (cuotasSeis==true) && (cuotasDoce==true)) {                                 // en todas las cuotas disposibles 3 , 6 o 12 
        getEventos.innerHTML = ` <h2>Usted lo puede realizar en 3 , 6 o 12 cuotas  </h2>        
            <form action="" id="formulario1cuotas" class="formularioCrear">
            <label for="cuotas1" class="labelForms">Escriba si en 3 , 6 o 12 cuotas: </label>
            <input type="text" id="cuotas1" class="inputForms" required>   
            <span id="spanError3o6o12">Debe elegir entre  3 , 6 o 12 cuotas</span>                  
            <button id="botonEnviarCuotas1" class="botonEnviar">Enviar</button>
            </form>`;

        const getCuotas1 = document.querySelector("#cuotas1");
        getCuotas1.addEventListener('input',(e)=>{
            const getInputSpanError3o6o12 = document.querySelector("#spanError3o6o12");
            validarCuotas = check3o6o12(e.target.value);
            if (validarCuotas){
                getInputSpanError3o6o12.style.display="none";
            }
            else{
                getInputSpanError3o6o12.style.display="block";
            }
        });
        const getFormCuotas1 = document.querySelector("#formulario1cuotas");
        getFormCuotas1.onsubmit = (e)=> {
            e.preventDefault();
            if (validarCuotas) {
                let getCuotas1 = document.querySelector("#cuotas1").value;
                getEventos.innerHTML = `<div class="mostrar_busqueda"> 
                                            <p> Son ${getCuotas1} cuotas de $${(credito/getCuotas1).toFixed(2)}</p> 
                                        </div>`;                
                cantCuotas = getCuotas1;
                cantCuotas=parseInt(cantCuotas);
                montoCuotas = credito/getCuotas1;                
                arregloContenedor.push(new Credito(nombre,sueldo,montoCredito,cantCuotas,montoCuotas));                                         // push y lo carga en el local storage
                localStorage.setItem('arreglo', JSON.stringify(arregloContenedor)); 
                        
            }            
        }               
    }
    else if ((cuotasTres == false) && (cuotasSeis == true) && (cuotasDoce == true)){                        // en 6 o 12 cuotas
        getEventos.innerHTML = ` <h2>Usted lo puede realizar en  6 o 12 cuotas  </h2>        
        <form action="" id="formulario2cuotas" class="formularioCrear">
        <label for="cuotas2" class="labelForms">Escriba si  6 o 12 cuotas: </label>
        <input type="text" id="cuotas2" class="inputForms" required> 
        <span id="spanError6o12">Debe elegir entre 6 o 12 cuotas</span>                 
        <button id="botonEnviarCuotas2" class="botonEnviar">Enviar</button>
        </form>`;
        const getCuotas2 = document.querySelector("#cuotas2");
        getCuotas2.addEventListener('input',(e)=>{
            const getInputSpanError6o12 = document.querySelector("#spanError6o12");
            validarCuotas = check6o12(e.target.value);
            if (validarCuotas){
                getInputSpanError6o12.style.display="none";
            }
            else{
                getInputSpanError6o12.style.display="block";
            }
        });
        const getFormCuotas2 = document.querySelector("#formulario2cuotas");
        getFormCuotas2.onsubmit = (e) => {
            e.preventDefault();
            if (validarCuotas) {
                let getCuotas2 = document.querySelector("#cuotas2").value;
                getEventos.innerHTML = `<div class="mostrar_busqueda"> 
                                            <p> Son ${getCuotas2} cuotas  de $${(credito/getCuotas2).toFixed(2)} </p> 
                                        </div>`;
                cantCuotas = getCuotas2;
                cantCuotas=parseInt(cantCuotas);
                montoCuotas = credito/getCuotas2;
                arregloContenedor.push(new Credito(nombre,sueldo,montoCredito,cantCuotas,montoCuotas));                                         // push y lo carga en el local storage
                localStorage.setItem('arreglo', JSON.stringify(arregloContenedor));
                
            }
        }
    }   
    else if ((cuotasTres == false) && (cuotasSeis == false) && (cuotasDoce == true)){        // en 12 cuotas 
        getEventos.innerHTML = ` <div class="mostrar_busqueda"> 
                                        <h2>Usted lo puede realizar solo en  12 cuotas  </h2>        
                                        <p> Son 12 cuotas de $${(credito/12).toFixed(2)}  </p>
                                </div>`; 
            cantCuotas=12;
            montoCuotas=credito/12;  
            arregloContenedor.push(new Credito(nombre,sueldo,montoCredito,cantCuotas,montoCuotas));                             // push y lo carga en el local storage
            localStorage.setItem('arreglo', JSON.stringify(arregloContenedor));                                   
    }    
}

function checkTexto (valor) {                                   // para checkear que sea texto
    if (/^[a-zA-Z]+$/.test(valor)){               
        return true
    }
    return false
}

function checkNumero (numero) {                             // para checkear que sea solo numeros
    if (/^[0-9]+$/.test(numero)){        
        return true
    }
    return false
}

function check3o6o12 (numero){                          // para checkear q lo escrito sea 3 6 o 12 
    if (/^(3|6|12)$/.test(numero)) { 
        return true
    }
    return false
}

function check6o12 (numero){                // para checkear q lo escrito sea 6 o 12 
    if (/^(6|12)$/.test(numero)) { 
        return true
    }
    return false
}
                                                                                                    /*           cargar creditos                  */
function cargarArreglo() {
    const getBotonCrear = document.querySelector("#botonCrear");
    getBotonCrear.onclick = (e)=>{                                                                      // evento clickear crear credito   , pide nombre y sueldo 
        e.preventDefault();    
        const getEventos = document.querySelector("#eventos");
        getEventos.innerHTML = ` <form action="" id="formulario" class="formularioCrear">
        <label for="nombreC" class="labelForms">Nombre: </label>
        <input type="text" id="nombreC" class="inputForms" required>
        <span id="error_nombre">Debe Escribir solo Texto</span>
        <label for="sueldoC" class="labelForms">Sueldo :</label>
        <input type="text" id="sueldoC" class="inputForms" required>  
        <span id="error_Sueldo">Debe Escribir solo Numeros</span>             
        <button id="botonCrearSueldo" class="botonEnviar">Enviar</button>
        </form>`;
        const getInputNombre = document.querySelector("#nombreC");                              
        getInputNombre.addEventListener ('input', (e)=>{                                     // para checkear que en el input haya solo texto
            validarNombre = checkTexto(e.target.value);                                          
            const getSpanNombre = document.querySelector("#error_nombre");
            if (validarNombre){
                getSpanNombre.style.display="none";
            }
            else{
                
                getSpanNombre.style.display="block";
            }
        }); 
        const getInputSueldo = document.querySelector("#sueldoC");                      
        getInputSueldo.addEventListener ('input', (e)=>{                            // para chechear que en el input haya numeros
            const SpanSueldo = document.querySelector("#error_Sueldo");
            validarSueldo = checkNumero(e.target.value);                            
            if (validarSueldo){
                SpanSueldo.style.display="none"
            }
            else{
                SpanSueldo.style.display="block"
            }
        });    
        const getform1 = document.querySelector("#formulario");                             // pide monto a solicitar y le dice cuanto es el monto maximo que puede solicitar
        getform1.onsubmit = (e)=>{
            e.preventDefault(); 
            if (validarSueldo && validarNombre) {                  
                const  getNombre = document.querySelector("#nombreC");        
                nombre = getNombre.value;
                const  getSueldo = document.querySelector("#sueldoC");        
                sueldo = getSueldo.value;
                sueldo=parseInt(sueldo);
                maxCredito = sueldo * 2 ;
                getEventos.innerHTML = ` <h2 class="mostrar_busqueda"> El monto Maximo que puede solicitar es de : $${maxCredito} </h2>        
                <form action="" id="formulario1" class="formularioCrear">
                <label for="montoC" class="labelForms">Escriba el Monto Solicitado: </label>
                <input type="text" id="montoC" class="inputForms" required> 
                <span id="SpanError_Monto">Debe Escribir solo Numeros</span> 
                <span id="SpanError_MontoSuperado">No puede superar el monto permitido</span>                
                <button id="botonCrearMonto" class="botonEnviar">Enviar</button>
                </form>`;            
                const getform2 = document.querySelector("#formulario1");
                const getMontoCredito = document.querySelector("#montoC");
                const getMontoSuperado = document.querySelector("#SpanError_MontoSuperado");
                getMontoCredito.addEventListener('input',(e)=>{                                                     // se fija que sean solo numeros
                    getMontoSuperado.style.display="none";
                    const getMonto = document.querySelector("#SpanError_Monto");
                    validarMonto = checkNumero(e.target.value);
                    if  (validarMonto){
                        getMonto.style.display="none";
                    }         
                    else{
                        getMonto.style.display="block";
                    }          
                });  
                getform2.onsubmit =    (e)=>{        
                    e.preventDefault();   
                    if   (validarMonto)    {       
                        montoCredito= getMontoCredito.value;
                        montoCredito=parseInt(montoCredito);                                                             
                        if (montoCredito>maxCredito) {                                                                  // se fija que no pase del monto maximo . 
                            getMontoSuperado.style.display="block";                              
                        }
                        else {
                            cuotasTres = false;
                            cuotasSeis = false;
                            cuotasDoce = false; 
                            afectacionMensualPermitida(sueldo,montoCredito);
                            cantidadCuotasPermitida (cuotasTres,cuotasSeis,cuotasDoce,montoCredito,getEventos);                                     // entra en la ultima parte del formulario y genera un push en el arreglo                                   

                        }
                   }
               }
            }
        }             
    }
}

/*                                                                  final de la carga de creditos                        */


function buscarCredito (){                                                                                                          // busca un credito en el arreglo
    const getBotonBuscar = document.querySelector("#botonBuscar");
    getBotonBuscar.onclick = (e) =>{
        e.preventDefault();
        const getEventos = document.querySelector("#eventos");                                                                          // formulario para pedir el credito a buscar 
        getEventos.innerHTML= `<form action="" id="formBuscar" class="formularioCrear">
        <label for="BuscarLab" class="labelForms">Escriba el nombre del cliente a Buscar :  </label>
        <input type="text" id="BuscarIn" class="inputForms" required> 
        <span id="SpanError_NombreBuscar">Debe Escribir solo Texto</span>  
        <button id="botonBuscarCliente" class="botonEnviar">Enviar</button>
        </form>`
        const getBuscarIn = document.querySelector("#BuscarIn");
        getBuscarIn.addEventListener('input', (e)=>{
            const errorSpanBuscar = document.querySelector("#SpanError_NombreBuscar");
            validarNombreBuscar = checkTexto(e.target.value);            
            if (validarNombreBuscar){
                errorSpanBuscar.style.display='none';
            }
            else {
                errorSpanBuscar.style.display='block';
            }
        });
        const getFormBuscar = document.querySelector("#formBuscar");
        getFormBuscar.onsubmit = (e)=>{
            e.preventDefault();
            if (validarNombreBuscar){
                let getNombreBuscar = document.querySelector("#BuscarIn").value;
                let busqueda = arregloContenedor.find(item => item.nombre === getNombreBuscar);                
                if (busqueda===undefined){
                    getEventos.innerHTML= `<p class="mostrar_busqueda" >No se encuentra el credito a Buscar<p>`                                         // no lo encontro
                }
                else{                                    
                    getEventos.innerHTML=                                                                                                   // lo muestra
                    `<div class="mostrar_busqueda">                    
                        <h2>Credito de ${busqueda.nombre}</h2>
                        <p>Sueldo : $${busqueda.sueldo} </p>
                        <p>Monto : $${busqueda.monto} </p>
                        <p>Cuotas : ${busqueda.cuotas} </p>
                        <p>Valor de La Cuota : $${busqueda.valorCuota.toFixed(2)} </p>
                    </div>`                    
                }
            }

        }
    }
}

function borrarCredito(){                                                                                               // borra un credito en el arreglo 
    const getBotonBorrar = document.querySelector("#botonBorrar");
    getBotonBorrar.onclick = (e) =>{
        e.preventDefault();
        const getEventos = document.querySelector("#eventos");
        getEventos.innerHTML= `<form action="" id="formBorrar" class="formularioCrear">
        <label for="BorrarLab" class="labelForms">Escriba el nombre del cliente a Eliminar :  </label>
        <input type="text" id="BorrarIn" class="inputForms" required> 
        <span id="SpanError_NombreBorrar">Debe Escribir solo Texto</span>  
        <button id="botonBorrarCliente" class="botonEnviar">Enviar</button>
        </form>`
        const getBorrarIn = document.querySelector("#BorrarIn");
        getBorrarIn.addEventListener('input', (e)=>{
            const errorSpanBorrar = document.querySelector("#SpanError_NombreBorrar");
            validarNombreBorrar = checkTexto(e.target.value);            
            if (validarNombreBorrar){
                errorSpanBorrar.style.display='none';
            }
            else {
                errorSpanBorrar.style.display='block';
            }
        });
        const getFormBorrar = document.querySelector("#formBorrar");
        getFormBorrar.onsubmit = (e)=>{
            e.preventDefault();
            if (validarNombreBorrar){  
                let getNombreBorrar = document.querySelector("#BorrarIn").value;
                result = arregloContenedor.findIndex(item => item.nombre === getNombreBorrar);                
                if (result===-1){
                    getEventos.innerHTML= `<p class="mostrar_busqueda" >No se encuentra el credito a Eliminar</p>`                 
                } 
                else{
                    arregloContenedor.splice(result,1);
                    localStorage.setItem('arreglo', JSON.stringify(arregloContenedor));                                                 // vuelve actualizado el arreglo al localStorage
                    getEventos.innerHTML= `<p class="mostrar_busqueda">Se Borro perfectamente</p>` 
                }
            }
        }
    }
}

function mostrarArreglo (){                                                                                             // muestra todos los arreglos
    const getBotonMostrar = document.querySelector("#mostrarArreglo");
    getBotonMostrar.onclick= (e)=>{
        e.preventDefault();
        const getEventos = document.querySelector("#eventos");
        getEventos.innerHTML=``;
        if (arregloContenedor.length===0){
            getEventos.innerHTML= 
                `<div class="mostrar_busqueda">                    
                    <P>No hay creditos Cargados </P>
                </div>`  
        }
        else {
            arregloContenedor.forEach((element)=>{
                getEventos.innerHTML+= 
                `<div class="mostrar_busqueda">                    
                    <h2>Credito de ${element.nombre}</h2>
                    <p>Sueldo : $${element.sueldo} </p>
                    <p>Monto : $${element.monto} </p>
                    <p>Cuotas : ${element.cuotas} </p>
                    <p>Valor de La Cuota : $${element.valorCuota.toFixed(2)} </p>
                </div>`  
            });     


        }        
    }
};

function filtrarArreglo(){                                                                                  // filtra arreglos por cantidad de monto , si son superiores al monto los muestra en pantalla
    const getBotonFiltrar = document.querySelector("#botonFiltrar");
    getBotonFiltrar.onclick = (e) =>{
        e.preventDefault();
        const getEventos = document.querySelector("#eventos");
        getEventos.innerHTML= `<form action="" id="formFiltrar" class="formularioCrear">
        <label for="filtrarLab" class="labelForms">Escriba el monto por el cual quiere filtrar los creditos :  </label>
        <input type="text" id="filtrarIn" class="inputForms" required> 
        <span id="SpanError_NombreFiltrar">Debe Escribir solo Numeros</span>  
        <button id="botonfiltrarCliente" class="botonEnviar">Enviar</button>
        </form>`
        const getfiltrarIn = document.querySelector("#filtrarIn");
        getfiltrarIn.addEventListener('input', (e)=>{
            const errorSpanFiltrar = document.querySelector("#SpanError_NombreFiltrar");
            validarMontoFiltrar = checkNumero(e.target.value);                                                              
            if (validarMontoFiltrar){                                                                                       // muestra el span Error si hay un valor incorrecto en el input 
                errorSpanFiltrar.style.display='none';
            }
            else {
                errorSpanFiltrar.style.display='block';
            }
        });
        const getformFiltrar = document.querySelector("#formFiltrar");
        getformFiltrar.onsubmit = (e)=>{
            e.preventDefault();
            const getEventos = document.querySelector("#eventos");            
            if (validarMontoFiltrar){
                let montoFiltrado = document.querySelector("#filtrarIn").value;
                montoFiltrado = parseInt(montoFiltrado);                
                filtrados = arregloContenedor.filter(item => item.monto > montoFiltrado);                
                getEventos.innerHTML=``;
                if (filtrados.length===0){
                    getEventos.innerHTML=`<div class="mostrar_busqueda"> 
                                                <p>No hay creditos superiores a ese monto</p>
                    
                                            </div>`;
                }     
                else{
                    filtrados.forEach((element)=>{ 
                        getEventos.innerHTML+=`<div class="mostrar_busqueda">                    
                                                    <h2>Credito de ${element.nombre}</h2>
                                                    <p>Sueldo : $${element.sueldo} </p>
                                                    <p>Monto : $${element.monto} </p>
                                                    <p>Cuotas : ${element.cuotas} </p>
                                                    <p>Valor de La Cuota : $${element.valorCuota.toFixed(2)} </p>
                                                </div>`  
                    })    
                }              
            }
        }   
    }
}

// programa principal 
if
(localStorage.getItem('arreglo') !== undefined && localStorage.getItem('arreglo')){                     // se fija si hay datos en el storage los agrega en el arreglo , si no hay datos pone el arreglo como vacio 
    arregloContenedor= JSON.parse(localStorage.getItem('arreglo'));
 }
else {
    arregloContenedor=[];
}
cargarArreglo();   
buscarCredito();                  
borrarCredito();
mostrarArreglo ();
filtrarArreglo();                                      


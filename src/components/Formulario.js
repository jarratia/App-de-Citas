import React, {Fragment, useState} from 'react'
import shortid from "shortid";
import PropTypes from "prop-types";


//import uuid from 'uuid/v4';

const Formulario = ({crearCita}) => {

    //State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //Función que se ejectua cada vez que el usuario escribe
    const actualizarState = e =>{
        actualizarCita({
            ...cita,
            [e.target.name]: e.target.value 
        })
    }

    //Extraer valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

    //Agregar cita mendiante botón
    const submitCita = e => {
        e.preventDefault();
        
        //Validación de campos
        if(mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '' ){
            actualizarError(true);
            return;
        }
        //ELiminar el error previo
        actualizarError(false);
        //Asignar ID de registro
        cita.id = shortid();
        //Crear la cita en el state principal
        crearCita(cita);
        //Reinicar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        })
    }
    
    return (
        <Fragment>
            <h2>Crear Cita</h2>
            {/* Mensaje de alerta error campos obligatorios con operador ternario */}
            { error ? <p className="alerta-error">Todos los cambios son obligatorio</p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre de Mascota"
                    onChange={actualizarState}
                    value ={mascota}
                />

                <label>Nombre del Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño"
                    onChange={actualizarState}
                    value ={propietario}
                />

                <label>Fecha Alta Médica</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value ={fecha}
                />

                <label>Hora del Alta Médica</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value ={hora}
                />

                <label>Síntomas</label>
                <textarea 
                className="u-full-width"
                name="sintomas"
                onChange={actualizarState}
                value ={sintomas}>
        
                </textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar cita</button>
            </form>
        </Fragment>  
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
};
 
export default Formulario;

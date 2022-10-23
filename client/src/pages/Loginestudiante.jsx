import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

/*
  Inputs para Login de Estudiante

  email
  password


*/


export const Loginestudiante = () => {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
 ///if login is succes redirect to MainAlumno
    e.preventDefault();
    axios.post('http://localhost:5000/login/estudiante', {
      email,
      password
    })
      .then((response) => {
        if(response.data === 'Alumno logueado'){
          alert(response.data)
          window.location.href = '/mainalumno';  //revisar 
        }
      }, (error) => {
        alert(error.response.data)
      });

  }

  const [errors, setErrors] = React.useState({});

  const validateInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case 'email':
        !value.length
        ? setErrors({ ...errors, email: 'Email requerido' }) 
        : delete errors[name] && setErrors({ ...errors });
        break;
      case 'password':
        !value.length 
        ? setErrors({ ...errors, password: 'Contraseña requerida' }) 
        : delete errors[name] && setErrors({ ...errors });
        break;

      default:
        break;
    }
  };
  return (
    <React.Fragment>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Inicia sesión!</h1>
            <p className="py-6">Para poder obtener muchos mas beneficios, y una mejor calidad de juego por favor inicia sesion.</p>
          </div>
          <form onSubmit={handleSubmit} className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label" htmlFor='email'>
                  <span className="label-text">Email</span>
                </label>
                <input
                  className='input input-bordered'
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={validateInput}
                  type='email'
                  placeholder='Email'
                  required
                />
              </div>
              <div className="form-control">
                <label className="label"  htmlFor='password'>
                  <span className="label-text">Password</span>
                </label>
                <input
                  className='input input-bordered'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validateInput}
                  type='password'
                  placeholder='Password'
                  required
                />
                <label className="label">
                  <Link to="/registrarsealu"className="label-text-alt link link-hover">Registrarse aqui</Link>
                </label>
              </div>
              <div className="form-control mt-6"> 
                <button type='submit' className="btn btn-outline">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>


  )
}


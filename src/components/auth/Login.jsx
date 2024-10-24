import React from 'react'
import { useForm } from '../../hooks/useForm';
import { clienteAxios } from '../../api/axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();

    const { formState, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const { email, password } = formState;

    const handleSubmitUser = async (e) => {
        e.preventDefault();

        await clienteAxios.post('/iniciar-sesion', formState)
            .then(response => {
                const { token } = response.data;
                localStorage.setItem('token', token);

                Swal.fire({
                    title: "Login correcto!",
                    text: "Ahora te llevarémos a visualizar tus clientes",
                    icon: "success",
                    confirmButtonColor: "#198754"
                }).then(result => {
                    if (result.isConfirmed) {
                        navigate('/clientes', {
                            replace: true
                        });
                    }
                });
                console.log(response.data);
            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.mensaje,
                    confirmButtonColor: "#198754"
                });
            });

        onResetForm();
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card text-center">
                        <div className="card-header text-bg-primary">Iniciar Sesión</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmitUser}>
                                <div className="form-group">
                                    <label htmlFor="email">Correo Electrónico</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        placeholder="Ingresa tu correo"
                                        name="email"
                                        value={email}
                                        onChange={onInputChange}
                                        required />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="password">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="Ingresa tu contraseña"
                                        name="password"
                                        value={password}
                                        onChange={onInputChange}
                                        required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block mt-2">Iniciar Sesión</button>
                            </form>
                        </div>
                        <div className="card-footer text-body-secondary">
                            <a href="#">¿Olvidaste tu contraseña?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

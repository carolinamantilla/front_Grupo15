import react, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { addUser } from '../services/UsersService';
import { useHistory } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

const initialValue = {
    identificacion: '',
    profesion: '',
    direccion: '',
    telefono: '',
    sexo: '',
    estado: true,
}

const useStyles = makeStyles({
    container: {
        width: '30%',
        margin: '100px auto 0 auto',
        '& > *': {
            marginTop: 20
        }
    }
})

export function CreateUser() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        setUser(getCurrentUser());
    }, [])

    const [usuario, setUsuario] = useState(initialValue);
    const { fullName, email, password, profesion, identificacion, direccion, telefono, sexo, estado } = usuario;

    const classes = useStyles();
    let history = useHistory();

    const onValueChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const onStateChange = (state) => {
        setUsuario({ ...usuario, "estado": state });
    }

    const addUserData = async () => {
        await addUser(usuario);
        history.push('/usuarios');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Agregar Usuario</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Nombre Completo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="fullName" value={fullName} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="email" value={email} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Contraseña</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="password" value={password} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">sexo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="sexo" value={sexo} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Identificacion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="identificacion" value={identificacion} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">profesion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="profesion" value={profesion} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">direccion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="direccion" value={direccion} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">telefono</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="telefono" value={telefono} id="my-input" />
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Estado</FormLabel>
                <RadioGroup
                    name='estado'
                    onChange={(e) => onStateChange(e.target.value === "disponible")}
                    aria-label="estado"
                    defaultValue="Activo"
                    value={estado ? "Activo" : "Inactivo"}>
                    <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                    <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={(e) => addUserData()} color="primary">Agregar Usuario</Button>
            </FormControl>
        </FormGroup>
    )
}

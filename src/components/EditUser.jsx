import react, { useState, useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography, RadioGroup, FormLabel, FormControlLabel, Radio } from '@material-ui/core';
import { editUser, getUser } from '../services/UsersService';
import { useHistory, useParams } from 'react-router-dom';

const initialValue = {
    email: '',
    contraseña: '',
    direccion:'',
    telefono:'',
    estado: true,
}

const useStyles = makeStyles({
    container: {
        width: '30%',
        margin: '100px auto 0 auto',
               '& > *': {
            marginTop: 15
        
            
        }
    }
})

export function EditUser() {
    const [usuario, setUsuario] = useState(initialValue);
    const {  fullName, email, password, profesion, identificacion, direccion, telefono, sexo, estado } = usuario;
    const classes = useStyles();
    let history = useHistory();

    const { id } = useParams();

    useEffect(() => {
        loadUsuarioData();
    }, [])

    const loadUsuarioData = async () => {
        let response = await getUser(id);
        setUsuario(response.data.data);
    }

    const onValueChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    }

    const onStateChange = (state) => {
        setUsuario({ ...usuario, "estado": state });
    }

    const updateUsuarioData = async () => {
        await editUser(usuario);
        history.push('/usuarios');
    }

    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4">Editar Usuario</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Nombre Completo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="fullName" value={fullName} id="my-input" shrink/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="email" value={email} id="my-input" shrink />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Contraseña</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="password" value={password} id="my-input" shrink/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Sexo</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="sexo" value={sexo} id="my-input" shrink disabled/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Identificacion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="identificacion" value={identificacion} id="my-input" shrink disabled/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">profesion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="profesion" value={profesion} id="my-input" shrink />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">direccion</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="direccion" value={direccion} id="my-input" shrink />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">telefono</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name="telefono" value={telefono} id="my-input" shrink />
            </FormControl>
            <FormControl component="fieldset">
                <FormLabel component="legend">Estado</FormLabel>
                <RadioGroup
                    name='estado'
                    onChange={(e) => onStateChange(e.target.value === "disponible")}
                    aria-label="estado"
                    defaultValue="activo"
                    value={estado ? "activo" : "inactivo"}>
                    <FormControlLabel value="activo" control={<Radio />} label="activo" />
                    <FormControlLabel value="inactivo" control={<Radio />} label="inactivo" />
                </RadioGroup>
            </FormControl>
            <FormControl>
                <Button variant="contained" onClick={() => updateUsuarioData()} color="primary">Editar Usuarioo</Button>
            </FormControl>
        </FormGroup>
    )
}

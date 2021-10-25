import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableCell, TableRow, TableBody, Button, makeStyles } from '@material-ui/core';
import { getUsers, deleteUser } from '../services/UsersService';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/AuthService';

const useStyles = makeStyles({
    table: {
        width: '100%',
        margin: '1% auto 0 auto',
        background: '#F4DEF9'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#F4DEF9',
            color: 'black'
        }
    },
    row: {
        '& > *': {
            fontSize: 15
        }
    },
    button: {
        marginInline: '20px',
        background: '#A2CEAD', /* Green */
        border: 'none',
        color: 'white'
    },
    buttonPersonalizado: {
        marginInline: '20px',
        background: '#d785a2', 
        border: 'none',
        color: 'white'
    },
     button_add: {
        textAlign: 'right',
        marginInline: '20px',
        background: '#7a83b5',
        border: 'none',
        width : '50%',
        color: 'white'
    },

})

export function UsuariosList() {
    const classes = useStyles();

    const [user, setUser] = useState([])
    const [usuarios, setUsuarios] = useState([])

    useEffect(() => {
        getAllUsuarios();
        setUser(getCurrentUser());
    }, [])

    const getAllUsuarios = async () => {
        let response = await getUsers();
        console.log(response);
        setUsuarios(response.data.data);
    }

    const deleteUserData = async (id) => {
        let callbackUser = window.confirm('Esta seguro de elimar el usuario');
        if (callbackUser) {
            await deleteUser(id);
            getAllUsuarios();
        }
    }

    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell>Id</TableCell>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Correo</TableCell>
                        <TableCell>Estado</TableCell>
                    
                        {user && (
                            <TableCell >
                                <Button className={classes.button_add} variant="contained" component={Link} to="usuario/agregar" >Agregar</Button>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        usuarios.map(usuario => (
                            <TableRow className={classes.row} key={usuario._id}>
                                <TableCell>{usuario._id.substring(0,6)}</TableCell>
                                <TableCell>{usuario.fullName}</TableCell>
                                <TableCell>{usuario.email}</TableCell>
                                <TableCell>{usuario.rol ? "activo" : "inactivo"}</TableCell>
                                {user
                                    &&

                                    (<TableCell>
                                        <Button className={classes.button} variant="contained" component={Link} to={`usuario/editar/${usuario._id}`} color="info">Editar</Button>
                                        <Button className={classes.buttonPersonalizado} variant="contained"  onClick={() => deleteUserData(usuario._id)} >Eliminar</Button>
                                    </TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}

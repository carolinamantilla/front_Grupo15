import React, { useState, useEffect } from 'react'
import { Table, TableHead, 
    TableCell, 
    TableRow, 
    TableBody, 
    Button, 
    makeStyles } from '@material-ui/core';
import { getProducts, deleteProduct } from '../services/ProductService';
import { Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    table: {
        width: '50%',
        margin: '1% auto 0 auto'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    },
    button: {
        marginInline: '20px'
    },
    button_add: {
        textAlign: "right"
    }
})

export function ProductList() {
    const classes = useStyles();

    const [user] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts();
    }, [])

    const getAllProducts = async () => {
        let response = await getProducts();
        console.log(response);
        setProducts(response.data.data);
    }

    const deleteProductData = async (id) => {
        let callbackUser = window.confirm('¿Esta seguro de eliminar el prudcto?');
        if (callbackUser) {
            await deleteProduct(id);
            getAllProducts();
        }
    }

    return (
            <Table className={classes.table}>
                <TableHead>
                    <TableRow className={classes.thead}>
                        <TableCell><center>Id</center></TableCell>
                        <TableCell>Descripción</TableCell>
                        <TableCell>Valor</TableCell>
                        <TableCell>Estado</TableCell>
                        {(
                            <TableCell className={classes.button_add}>
                                <center>
                                <Button variant="contained" color="primary" startIcon={<AddIcon/>} component={Link} to="productos/agregar" >Agregar</Button>
                                </center>
                            </TableCell>
                        )}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        products.map(product => (
                            <TableRow className={classes.row} key={product._id}>
                                <TableCell>{product._id}</TableCell>
                                <TableCell>{product.descripcion}</TableCell>
                                <TableCell>{product.valor}</TableCell>
                                <TableCell>{product.estado ? "Disponible" : "Agotado"}</TableCell>
                                {

                                    (<TableCell>
                                        <center>
                                        <Button className={classes.button} variant="contained" startIcon={<EditIcon/>}component={Link} to={`productos/editar/${product._id}`} color="info">Editar</Button>
                                        &nbsp;
                                        </center>
                                        <center>
                                        <Button variant="contained" color="secondary" startIcon={<DeleteIcon/>} onClick={() => deleteProductData(product._id)} >Eliminar</Button>
                                        </center>
                                    </TableCell>)
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    )
}

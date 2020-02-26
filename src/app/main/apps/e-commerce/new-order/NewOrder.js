import React, {useEffect, useState} from 'react';
import {Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography,FormControl,InputLabel,MenuItem,OutlinedInput,Select} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/styles';
import {FuseAnimate, FusePageCarded, FuseChipSelect, FuseUtils, FuseLoading} from '@fuse';
import {useForm} from '@fuse/hooks';
import {Link} from 'react-router-dom';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import _ from '@lodash';
import {useDispatch, useSelector} from 'react-redux';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import InterestTable from './InterestTable';
import reducer from '../store/reducers';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles(theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageUpload      : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
}));



function Product(props)
{
    const [states, setStates] = React.useState({
        gilad: true,
        gilad1: true,
        jason: false,
        antoine: false,
      });
    
      const handleChangeCheckBox = name => event => {
        setStates({ ...states, [name]: event.target.checked });
      };
      const handleChangeCurrency = event => {
        setValue(event.target.value);
      };
    
    
    const dispatch = useDispatch();
    const product = useSelector(({eCommerceApp}) => eCommerceApp.product);
    const state = useSelector(({eCommerceApp}) => eCommerceApp.state.categories);
    const source = useSelector(({eCommerceApp}) => eCommerceApp.state.source);
    const relation = useSelector(({eCommerceApp}) => eCommerceApp.state.relation);
    const client_type = useSelector(({eCommerceApp}) => eCommerceApp.state.client);
    const transaction = useSelector(({eCommerceApp}) => eCommerceApp.state.transaction);
    const property_type = useSelector(({eCommerceApp}) => eCommerceApp.state.property_type);
    const zones = useSelector(({eCommerceApp}) => eCommerceApp.state.zones);
    const clients = useSelector(({eCommerceApp}) => eCommerceApp.orders.data);
    const [value, setValue] = React.useState('female');
    
    const classes = useStyles(props);
    const [tabValue, setTabValue] = useState(0);
    const {form, handleChange, setForm} = useForm(null);
    
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedClientType, setSelectedClientType] = useState('');
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedRelation, setSelectedRelation] = useState(''); 
    const [selectedClient, setSelectedClient] = useState(''); 
    const [selectedTransaction, setSelectedTransaction] = useState(''); 
    const [selectedPropertyType, setSelectedPropertyType] = useState(''); 
    const { gilad, gilad1, jason, antoine } = states;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    useEffect(() => {
        dispatch(Actions.getStates());
        dispatch(Actions.getSource());
        dispatch(Actions.getRelation());
        dispatch(Actions.getClient());
        dispatch(Actions.getTransaction());
        dispatch(Actions.getZones());
        dispatch(Actions.getPropertyType());
        dispatch(Actions.getOrders());
    }, [dispatch]);

    useEffect(() => {
        function updateProductState()
        {
            const params = props.match.params;
            const {clientId} = params;

            if ( clientId == 'new' )
            {
                dispatch(Actions.newProduct());
            }
            else
            {
                dispatch(Actions.getProduct(props.match.params));
            }
        }

        updateProductState();
    }, [dispatch, props.match.params]); 

    useEffect(() => {
        if (
            (product.data && !form) ||
            (product.data && form && product.data.id_client !== form.id_client)
        )
        {
            setForm(product.data);
        }
    }, [form, product.data, setForm]);
    function handleSelectedClientType(event)
    {
        if(form.id_progress){
            setSelectedClientType(form.id_progress = event.target.value);
        }else{
            setSelectedClientType(form.id_progress = event.target.value);
        }
    }

    function handleSelectedClient(event)
    {
        if(form.id_client_type){
            setSelectedClient(form.id_client_type = event.target.value);
        }else{
            setSelectedClient(form.id_client_type = event.target.value);
        }

    }

    function handleSelectedTransaction(event)
    {
        setSelectedTransaction(event.target.value);
    }

    function handleSelectedPropertyType(event)
    {
        setSelectedPropertyType(event.target.value);
    }

    function handleSelectedSource(event)
    {
        setSelectedSource(event.target.value);
    }

    function handleSelectedRelation(event)
    {
        setSelectedRelation(event.target.value);
    }

    function handleChangeTab(event, tabValue)
    {
        setTabValue(tabValue);
    }

    function handleChipChange(value, name)
    {
        setForm(_.set({...form}, name, value.map(item => item.value)));
    }

    function setFeaturedImage(id)
    {
        setForm(_.set({...form}, 'featuredImageId', id));
    }

    function handleUploadChange(e)
    {
        const file = e.target.files[0];
        if ( !file )
        {
            return;
        }
        const reader = new FileReader();
        reader.readAsBinaryString(file);

        reader.onload = () => {
            setForm(_.set({...form}, `images`,
                [
                    {
                        'id'  : FuseUtils.generateGUID(),
                        'url' : `data:${file.type};base64,${btoa(reader.result)}`,
                        'type': 'image'
                    },
                    ...form.images
                ]
            ));
        };

        reader.onerror = function () {
            console.log("error on load image");
        };
    }

    function canBeSubmitted()
    {
        return (
            form.name != '' &&
            !_.isEqual(product.data, form)
        );
    }

    if ( (!product.data || (product.data && props.match.params.productId !== product.data.id)) && props.match.params.clientId !== 'new' )
    {
        return <FuseLoading/>;
    }


    return (
        <FusePageCarded
            classes={{
                toolbar: "p-0",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full">

                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/client" color="inherit">
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Clientes
                                </Typography>
                            </FuseAnimate>

                            <div className="flex items-center max-w-full">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/avatars/avatar.jpg" alt={form.name}/>
                                </FuseAnimate>
                                <div className="flex flex-col min-w-0">
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {form.name ? form.name : 'Nuevo Cliente'}
                                        </Typography>
                                    </FuseAnimate>
                                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography variant="caption">Detalles del cliente</Typography>
                                    </FuseAnimate>
                                </div>
                            </div>
                        </div>
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            {!form.id_client ? (

                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!canBeSubmitted()}
                                    onClick={() => dispatch(Actions.saveProduct(form))}
                                >
                                Guardar
                            </Button>
                        ) : (

                            <Button
                            className="whitespace-no-wrap"
                            variant="contained"
                            disabled={!canBeSubmitted()}
                            onClick={() => dispatch(Actions.updateProduct(form))}
                        >
                        Actualizar
                    </Button>
                )}
                        </FuseAnimate>
                    </div>
                )
            }
            contentToolbar={
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    indicatorColor="secondary"
                    textColor="secondary"
                    variant="scrollable"
                    scrollButtons="auto"
                    classes={{root: "w-full h-64"}}
                >
                    <Tab className="h-64 normal-case" label="Informacion personal"/>
                    <Tab className="h-64 normal-case" label="Intereses"/>
                    <Tab className="h-64 normal-case" label="Nuevo Interés"/>
                    <Tab className="h-64 normal-case" label="Notas"/>
                </Tabs>
            }
            content={
                form && (
                    <div className="p-16 sm:p-24 max-w-2xl">
                        {tabValue === 0 &&
                        (
                            <div>
                                <div className="flex">
                                    <TextField
                                        className="mt-8 mb-16 mr-12"
                                        error={form.name === ''}
                                        required
                                        label="Nombres"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value={!form.name ? ('') : (form.name)}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                    <TextField
                                        className="mt-8 mb-16 mr-12"
                                        error={form.last_name === ''}
                                        required
                                        label="Apellidos"
                                        autoFocus
                                        id="last_name"
                                        name="last_name"
                                        value={!form.last_name ? ('') : (form.last_name)}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>

                                <div className="flex">

                                <TextField
                                    className="mt-8 mb-16 mr-12"
                                    label="Telefono"
                                    autoFocus
                                    id="phone_number"
                                    name="phone_number"
                                    value={!form.phone_number ? ('') : (form.phone_number)}
                                    onChange={handleChange}
                                    variant="outlined"
                                    fullWidth
                                />

                                    <TextField
                                        className="mt-8 mb-16 mr-12"
                                        label="Celular"
                                        autoFocus
                                        id="cellphone"
                                        name="cellphone"
                                        value={!form.cellphone ? ('') : (form.cellphone)}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />

                                </div>
                                <div className="flex">

                                <TextField
                                        className="mt-8 mb-16 mr-12"
                                        label="Email"
                                        autoFocus
                                        id="email"
                                        name="email"
                                        value={!form.email ? ('') : (form.email)}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                />

                                <TextField
                                        className="mt-8 mb-16 mr-12"
                                        label="Email alternativo"
                                        autoFocus
                                        id="email2"
                                        name="email2"
                                        value={!form.email2 ? ('') : (form.email2)}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                />

                                </div>
                                <div className="flex">

                                    <FormControl className="flex w-full md:w-320 mx-106 mr-12" variant="outlined">
                                        <InputLabel htmlFor="category-label-placeholder">
                                            Cliente
                                        </InputLabel>
                                        <Select
                                            value={selectedClient}
                                            onChange={handleSelectedClient}
                                            input={
                                                <OutlinedInput
                                                    labelWidth={("category".length * 9)}
                                                    name="id_progress"
                                                    id="id_progress"
                                                />
                                            }
                                        >

                                        {client_type.map(ct => (
                                            <MenuItem value={ct.id_client_type} key={ct.id_client_type}>{ct.name}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                
                                    <FormControl className="flex w-full md:w-320 mx-106 mr-20" variant="outlined">
                                        <InputLabel htmlFor="category-label-placeholder">
                                            Status
                                        </InputLabel>
                                        <Select
                                            value={!form.id_progress ? selectedClientType : (form.id_progress)}
                                            onChange={handleSelectedClientType}
                                            input={
                                                <OutlinedInput
                                                    labelWidth={("category".length * 9)}
                                                    name="id_progress"
                                                    id="category-label-placeholder"
                                                />
                                            }
                                        >

                                        {state.map(category => (
                                            <MenuItem value={category.id_progress} key={category.id_progress}>{category.name}</MenuItem>
                                        ))}

                                        </Select>
                                        
                                    </FormControl>
                                    <div style={{ width: 500 }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={source}
                                            getOptionLabel={source => source.name}
                                            renderInput={params => (
                                            <TextField
                                                className="mt-8 mb-16 mr-12"
                                                {...params}
                                                variant="standard"
                                                label="Fuente"
                                                margin="normal"
                                                fullWidth
                                            />
                                            )}
                                        />
                                    </div>
                                    

                                </div>

                                <div className="flex">
                                
                                    <div style={{ width: 800, height:75 }}>

                                        <Autocomplete
                                            freeSolo
                                            id="free-solo-2-demo"
                                            options={clients.map(option => option.name + " " + option.last_name)}
                                            renderInput={params => (
                                            <TextField
                                                className="mt-8 mb-16 mr-12"
                                                {...params}
                                                variant="outlined"
                                                label="Contacto relacionado"
                                                value={params.id_client}
                                                margin="normal"
                                                fullWidth
                                            />
                                            )}
                                        />
                                    </div>
                                   
                                    
                                </div>
                                <div className="flex">

<FormControl className="flex w-full md:w-320 mx-106 mr-20" variant="outlined">
    <InputLabel htmlFor="category-label-placeholder">
        Relacion
    </InputLabel>
    <Select
        value={selectedRelation}
        onChange={handleSelectedRelation}
        input={
            <OutlinedInput
                labelWidth={("category".length * 9)}
                name="id_progress"
                id="category-label-placeholder"
            />
        }
    >

    {relation.map(category => (
        <MenuItem value={category.id_relation_type} key={category.id_relation_type}>{category.name}</MenuItem>
    ))}

    </Select>
</FormControl>

</div>
                            </div>
                        )}

{tabValue === 1 && (
                        <div>
                             <div className="flex">
                                <InterestTable client={form.id_client}/>
                             </div>
                        </div>

                                
                        )}
                        {tabValue === 2 && (
                                        <div>
                                        <div className="flex">
                                        <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Codigo de propiedad"
                                               id="codigo_de_propiedad"
                                               name="codigo_de_propiedad"
                                               value={form.property_code}
                                               onChange={handleChange}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start"></InputAdornment>
                                               }}
                                               type="number"
                                               variant="outlined"
                                               autoFocus
                                               fullWidth
                                           />
                                           
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Presupuesto minimo"
                                               id="presupuesto_min"
                                               name="presupuesto_min"
                                               value={form.min_budget}
                                               onChange={handleChange}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start"></InputAdornment>
                                               }}
                                               type="number"
                                               variant="outlined"
                                               autoFocus
                                               fullWidth
                                           />
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Presupuesto maximo"
                                               id="presupuesto_max"
                                               name="presupuestoMax"
                                               value={form.max_budget}
                                               onChange={handleChange}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start"></InputAdornment>
                                               }}
                                               type="number"
                                               variant="outlined"
                                               autoFocus
                                               fullWidth
                                           />  


                                        <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Moneda</FormLabel>
        <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChangeCurrency}>
          <FormControlLabel value="female" control={<Radio />} label="Dolares" />
          <FormControlLabel value="male" control={<Radio />} label="Quetzales" />
        </RadioGroup>
      </FormControl>
           
                                       </div>
           
                                       <div className="flex">
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Frente del terreno"
                                               id="frente_terreno"
                                               name="frente_terreno"
                                               value={form.ground_front}
                                               onChange={handleChange}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start"></InputAdornment>
                                               }}
                                               type="number"
                                               variant="outlined"
                                               autoFocus
                                               fullWidth
                                           />
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Largo del terreno"
                                               id="largo_terreno"
                                               name="largo_terreno"
                                               value={form.ground_length}
                                               onChange={handleChange}
                                               InputProps={{
                                                   startAdornment: <InputAdornment position="start"></InputAdornment>
                                               }}
                                               type="number"
                                               variant="outlined"
                                               autoFocus
                                               fullWidth
                                           />  
           
                                       </div>
           
                                       <div className="flex">
           
                                       <TextField
                                           className="mt-8 mb-16 mr-12"
                                           label="Area de construccion minima"
                                           autoFocus
                                           id="a_construccion"
                                           name="a_construccion"
                                           value={form.min_construction_area}
                                           onChange={handleChange}
                                           variant="outlined"
                                           fullWidth
                                       />
           
                                       <TextField
                                           className="mt-8 mb-16 mr-12"
                                           label="Area del terreno"
                                           autoFocus
                                           id="a_terreno"
                                           name="a_terreno"
                                           value={form.land_area}
                                           onChange={handleChange}
                                           variant="outlined"
                                           fullWidth
                                       />
           
                                       </div>
                                   
           
                                       <div className="flex">
                                
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Dormitorios minimos"
                                               autoFocus
                                               id="min_bedrooms"
                                               name="min_bedrooms"
                                               value={form.min_bedrooms}
                                               onChange={handleChange}
                                               variant="outlined"
                                               fullWidth
                                           />
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Dormitorios maximos"
                                               autoFocus
                                               id="max_bedrooms"
                                               name="max_bedrooms"
                                               value={form.max_bedrooms}
                                               onChange={handleChange}
                                               variant="outlined"
                                               fullWidth
                                           />
           
                                       </div>
                                       <div className="flex">
           
                                       <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Estacionamientos"
                                               autoFocus
                                               id="parking"
                                               name="parking"
                                               value={form.parking}
                                               onChange={handleChange}
                                               variant="outlined"
                                               fullWidth
                                           />
           
                                           <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Baños"
                                               autoFocus
                                               id="bathrooms"
                                               name="bathrooms"
                                               value={form.bathrooms}
                                               onChange={handleChange}
                                               variant="outlined"
                                               fullWidth
                                           />
                                       </div>
           
                                       <div className="flex">
           
                                            <FormControl className="flex w-full md:w-320 mx-106 mr-12" variant="outlined">
                                                <InputLabel htmlFor="category-label-placeholder">
                                                    Inmueble
                                                </InputLabel>
                                                <Select
                                                    value={selectedPropertyType}
                                                    onChange={handleSelectedPropertyType}
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={("category".length * 9)}
                                                            name="category"
                                                            id="category-label-placeholder"
                                                        />
                                                    }
                                                >
                
                                                {property_type.map(t => (
                                                    <MenuItem value={t.id_property_type} key={t.id_property_type}>{t.name}</MenuItem>
                                                ))}
                                                </Select>
                                            </FormControl>
           
                               
           
                                            <FormControl className="flex w-full md:w-320 mx-106 mr-12" variant="outlined">
                                                <InputLabel htmlFor="category-label-placeholder">
                                                    Transaccion
                                                </InputLabel>
                                                <Select
                                                    value={selectedTransaction}
                                                    onChange={handleSelectedTransaction}
                                                    input={
                                                        <OutlinedInput
                                                            labelWidth={("category".length * 9)}
                                                            name="id_source"
                                                            id="category-label-placeholder"
                                                        />
                                                    }
                                                >
        
                                                {transaction.map(t => (
                                                    <MenuItem value={t.id_transaction} key={t.id_transaction}>{t.name}</MenuItem>
                                                ))}
        
                                                </Select>
                                            </FormControl>
                                                    
                                            <FormControl component="fieldset" className={classes.formControl}>
                                            <FormLabel component="legend"></FormLabel>
                                            <FormGroup>
                                            <FormControlLabel
                                                control={<Checkbox checked={gilad1} onChange={handleChangeCheckBox('gilad1')} value="gilad1" />}
                                                label="Amueblado"
                                            />
                                            </FormGroup>
                                        </FormControl>
                                       </div>
                                       <div className="flex">

                                       <div style={{ width: 500 }}>
                                        <Autocomplete
                                            multiple
                                            id="tags-standard"
                                            options={zones}
                                            getOptionLabel={zones => zones.name}
                                            renderInput={params => (
                                            <TextField
                                                className="mt-8 mb-16 mr-12"
                                                {...params}
                                                variant="standard"
                                                label="Zonas de interes"
                                                margin="normal"
                                                fullWidth
                                            />
                                            )}
                                        />
                                    </div>
                                    </div>

                                       <div className="flex">
           
                                       <TextField
                                               className="mt-8 mb-16 mr-12"
                                               label="Intereses extra"
                                               autoFocus
                                               id="comments"
                                               name="comments"
                                               value={form.bathrooms}
                                               onChange={handleChange}
                                               variant="outlined"
                                               fullWidth
                                           />
                                       </div>
                                       <div className="flex">
                                            <Button 
                                            className="mt-8 mb-16 mr-12"
                                            variant="contained" color="primary" type="submit">
                                                Agregar interés
                                            </Button>
                                        </div>
                                   </div>
           
                        )}

                        {tabValue === 3 && (
                        <div>

                            <TextField
                                className="mt-50 mb-50"
                                label="Notas"
                                id="subject"
                                name="subject"
                                value={form.subject}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />

                            <div className="flex">
                                <Button 
                                className="mt-8 mb-16 mr-12"
                                variant="contained" color="primary" type="submit">
                                    Agregar nota
                                </Button>
                            </div>

                        </div>
                        )}
                     
                    </div>
                )
            }
            innerScroll
        />
    )
}

export default withReducer('eCommerceApp', reducer)(Product);

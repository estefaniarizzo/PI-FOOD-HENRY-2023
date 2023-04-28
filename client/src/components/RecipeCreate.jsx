import React, {useEffect , useState} from "react";
import { Link } from "react-router-dom";
import {getTypeDiets , postRecipes} from '../actions/index';
import { useDispatch, useSelector } from "react-redux";
import styles from './RecipeCreate.module.css'
function controlForm (input){
    const reg = new RegExp('^[0-9]+$');
    let errors = {}
    if(!input.title) errors.title= 'ingrese el nombre de la receta'
    if(!input.summary) errors.summary= 'ingrese el tipo de receta'
    if(input.spoonacularScore<0 || input.spoonacularScore>100 || !reg.test(input.spoonacularScore)) errors.spoonacularScore='ingrese a puntuacion entre 0-100'
    if(input.healthScore<0 || input.healthScore>100 || !reg.test(input.healthScore)) errors.healthScore='ingrese a healthScore entre 0-100'
    return errors
}


export default function CreateRecipe() {
    const dispatch = useDispatch()
    let listDiets = useSelector((state) => state.typediets )
    console.log('esto es diet',listDiets);
    const [errors,setErrors]=useState({})      // validaciones
    const [input,setInput] = useState({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })
    
    useEffect(() => {
        dispatch(getTypeDiets())
        },[dispatch])
 function handleChange(e){
        setInput({
            ...input,
    [e.target.name] : e.target.value
})
        setErrors(controlForm({
            ...input,
            [e.target.name] : e.target.value    // copiar del formulario 
        }))                               
}
function handleSelect(e){
    setInput({
        ...input,
        typeDiets:[...input.typeDiets, e.target.value]
    })
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(postRecipes(input))
    alert('Receta exitosa!')
    setInput({
        title :'',
        summary:'',
        spoonacularScore:'',
        healthScore:'',
        analyzedInstructions:'',
        typeDiets:[]
    })
}
function handleDelete(e){
    setInput({
        ...input,
        typeDiets: input.typeDiets.filter(diet => diet !== e )
    }) // borrar tipo dieta 
}  

    return (
        <div className={styles.bkg}>
        <div className={styles.container}>
            <Link to ='/home' ><button className={styles.btn}>Regresar al menu</button></Link>
            <h1 className={styles.h1}>Ingresa los datos para crear una nueva receta</h1>
            <form onSubmit={(e) => {handleSubmit(e)}} className={styles.form}>
                <div>
                    <label>nombre:</label>
                    <input
                    type='text'
                    name='title'
                    value={input.title}
                    onChange={(e) => {handleChange(e)}}
                    />
                    { errors.title && (
                        <p className={styles.error}>{errors.title}</p>
                    ) }
                </div>
                <div>
                    <label>tipo:</label>
                    <input
                    type='text'
                    name='summary'
                    value={input.summary}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.summary && (
                        <p className={styles.error}>{errors.summary}</p>
                    ) }
                </div>
                <div>
                    <label>puntuacion:</label>
                    <input
                    type='text'
                    name='spoonacularScore'
                    value={input.spoonacularScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                    { errors.spoonacularScore && (
                        <p className={styles.error}>{errors.spoonacularScore}</p>
                    ) }
                </div>
                <div>
                    <label>healthScore:</label>
                    <input
                    type='text'
                    name='healthScore'
                    value={input.healthScore}
                    onChange={(e) => {handleChange(e)}} 
                    />
                     { errors.healthScore && (
                        <p className={styles.error}>{errors.healthScore}</p>
                    ) }
                </div>
                <div>
                    <label>pasos:</label>
                    <input
                    type='text'
                    name='analyzedInstructions'
                    value={input.analyzedInstructions}
                    onChange={(e) => {handleChange(e)}} 
                    />
                </div>
                <select onChange={(e) => handleSelect(e)} className={styles.select} >
                    {listDiets?.map((t) => {
                    
                    return <option value={t}> {t} </option>
                    
                    })}
                    
                </select >
                {errors.hasOwnProperty('title') || errors.hasOwnProperty('summary') || errors.hasOwnProperty('spoonacularScore') || errors.hasOwnProperty('healthScore')?  <p className={styles.adv}>porfavor ingrese los campos solicitados</p> : <button type='submit' className={styles.correct}> Crear</button>  }
               
            </form>
            
            {input.typeDiets.map(e => {
               return(
               <div >
                    <h5 className={styles.types}>{e}</h5>
                    <button className={styles.btnx} onClick={() => handleDelete(e)}>X</button>
                   
                </div>
            )})}
        </div>
        </div>
    )

}
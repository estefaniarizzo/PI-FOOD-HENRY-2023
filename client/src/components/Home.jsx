import React from "react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRecipes , filterRecipesByTypeDiet , orderByName , orderByPuntuation,getRecipesByName} from "../actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './Home.module.css'


export default function Home () {
const dispatch = useDispatch();
const allRecipes = useSelector((state) => state.recipes )  // es lo mismo que mapStateToProps


                                                      
const[search,setSearch] =useState('')                  //  searchBar                                    
const[orden,setOrden] =useState('')                                             //              
const[order,setOrder] =useState('')                                             //             
const[currentPage,setCurrentPage] =useState(1)                                  //             
const[recipesPerPage,setrecipesPerPage]=useState(9)                             // 
const indexLastRecipe = currentPage * recipesPerPage                            //  paginado
const indexFirstRecipe = indexLastRecipe - recipesPerPage                       // 
const currentRecipes = allRecipes.slice(indexFirstRecipe,indexLastRecipe)       // 
                                                                              

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect(() => {
    dispatch(getRecipes())   // hook del matchDispatchToProps()
},[dispatch]);

function handleOnClick(e){
e.preventDefault();
dispatch(getRecipes())   //  handle que me traiga devuelta todas las recetas,sin ningun filtro
}

function handleFilterTypeDiet (e) {
    dispatch(filterRecipesByTypeDiet(e.target.value))
}
function handleSort (e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`ordenado ${e.target.value}`)

}
function handlePuntuation (e) {
    e.preventDefault();
    dispatch(orderByPuntuation(e.target.value))
    setCurrentPage(1);
    setOrder(`ordenado ${e.target.value}`)
}

function handleSubmit (e){
        e.preventDefault(e)
        dispatch(getRecipesByName(search))
         setSearch('')
            
         } 
function handleInputName (e){
         setSearch(e.target.value)
         }


return (
    <div className={styles.bkg}>
    <div className={styles.search}>
     <form onSubmit={(e) => {handleSubmit(e)}}> {/* este es para hacer enter y que funcione */}
     <br/>
     <input type='text' placeholder='buscar...' value={search} onChange={(e) => {handleInputName(e)}} className={styles.input}></input>
     <button  type='submit' className={styles.btnsearch}>Buscar</button>
     </form>

     </div>
     <div className={styles.filterC}>
        <Link to = '/recipe'> <button className={styles.create}>Crear receta </button></Link>

        <button onClick = {e => handleOnClick(e)} className={styles.refresh}> Actualizar</button>

                
                <div className={styles.filt}>
               
                <select onChange={e => handleSort(e)} className={styles.select}>
                    <option value="asc">ascendente(A-Z)</option>
                    <option value="des">descendente(Z-A)</option>
                </select>
                </div>
                <div>
                <select  onChange={e => handlePuntuation(e)} className={styles.select}>
                    <option value="mayormenor">mayor a menor </option>
                    <option value="menormayor">menor a mayor </option>
                </select>
                </div>
                <div>
                <select onChange={e => handleFilterTypeDiet(e)} className={styles.select}>
                    <option value="All">todas las recetas</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian </option>
                    <option value="lacto-vegetarian">Lacto-Vegetarian </option>
                    <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="whole 30">Whole 30</option>
                </select>
                </div>
     </div>
     
     <div className={styles.paginado}> 
            <Paginado
            recipesPerPage = {recipesPerPage}
            allRecipes = {allRecipes.length}
            paginado= {paginado}
            />
            </div>     

        <div className={styles.cards}>
            { 
            currentRecipes?.map( e => {
                return (
                    
                    <Link to={'/recipes/' + e.id}>
                    <Card title={e.title} img={e.img} 
                  
                    typeDiets={e.typeDiets} 
                    key={e.id}/>
                    </Link>
                    
                    )  
                })      
            }    
            </div>
           
          
    </div>
)
}
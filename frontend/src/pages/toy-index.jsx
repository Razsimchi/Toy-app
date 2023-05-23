import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { ToysList } from '../cmps/toys-list'
import { loadToys, removeToy} from '../store/toy.action'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { Link } from 'react-router-dom'
import { SET_FILTER_INSTOCK, SET_FILTER_SORT, SET_FILTER_TXT } from '../store/toy.reducer'
import { ToyFilter } from '../cmps/toy-filter'




export function ToyIndex() {
    const dispatch = useDispatch()
    const filterBy = useSelector((storeState) => storeState.toyModule.filterBy)
    const toys = useSelector((storeState) => storeState.toyModule.toys)
    const isLoading = useSelector((storeState) => storeState.toyModule.isLoading)

    useEffect(() => {
        loadToys(filterBy)
    }, [filterBy])
    
    function onRemoveToy(toyId) {
        removeToy(toyId)
            .then(() => {
                showSuccessMsg('Toy removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove toy')
            })
    }
    function handleChange({ target }) {
        const action = {
            type: SET_FILTER_TXT,
            value: target.value
        }
        dispatch(action)
    }
    function onSort({ target }) {
        const action = {
            type: SET_FILTER_SORT,
            value: target.value
        }
        dispatch(action)
    }
    // function onFilter(value) {
    //     const action = {
    //         type: SET_FILTER,
    //         value
    //     }
    //     dispatch(action)
    // }
    function onInStock ({target}){
        const action = {
            type: SET_FILTER_INSTOCK,
            value: target.checked
        }
        dispatch(action)
    }
   
    return (
        <section className="toy-index">
            <main className="main-container">
                <input className="search-input" onChange={handleChange} name="txt" id="txt" type="search" placeholder="Search" />
                <div className="filter-container">
                <ToyFilter
                    onSort={onSort}
                    onInStock={onInStock}
                     />
                <Link className="add-toy-link" to={`/toy/edit`}>Add Toy</Link>
                </div>
                {isLoading && <h4 className="loading-text">Loading...</h4>||
                toys.length === 0 && <h4 className="no-toys-text">No toys to show.. </h4>}
                <ToysList
                 toys={toys}
                 onRemoveToy={onRemoveToy} />
            </main>
        </section>
    )
}
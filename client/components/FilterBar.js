import React from 'react'
import {connect} from 'react-redux'
import {addBreweryFilter, addStyleFilter, addSortFilter, clearBreweryFilter, clearStyleFilter, clearSortFilter, clearSearchInput} from '../store'
import SearchBar from './SearchBar'

const mapStateToProps = state => ({
    product: state.product,
    brewery: state.brewery,
    style: state.style
})

const mapDispatchToProps = dispatch => ({
    handleBreweryFilter(e) {
        dispatch(addBreweryFilter(e.target.value))
    },
    handleStyleFilter(e) {
        dispatch(addStyleFilter(e.target.value))
    },
    handleSortChange(e){
        dispatch(addSortFilter(e.target.value))
    },
    clearAllFilters() {
        dispatch(clearStyleFilter())
        dispatch(clearBreweryFilter())
        dispatch(clearSortFilter())
        dispatch(clearSearchInput())
    }
})

export const FilterBar = (props) => {
    return (
        <div className="filterBar">
            <SearchBar />
            Brewery:
            <select name="breweryId" onChange={props.handleBreweryFilter}>
                {props.brewery.map(b => {
                    return (
                        <option key={b.name} value={b.id}> {b.name} </option>
                    )
                })}
            </select>
            Style:
            <select name="styleId" onChange={props.handleStyleFilter}>
                {props.style.map(s => {
                    return (
                        <option key={s.name} value={s.id}> {s.name} </option>
                    )
                })}
            </select>
            Sort:
            <select name="styleId" onChange={props.handleSortChange}>
                <option value="highToLow"> Price High to Low </option>
                <option value="lowToHigh"> Price Low to High </option>
            </select>
            <button onClick={props.clearAllFilters}> Clear Filters </button>
        </div>
    )
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar)

export default FilterBarContainer


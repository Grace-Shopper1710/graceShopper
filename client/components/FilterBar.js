import React from 'react'
import {connect} from 'react-redux'
import {addBreweryFilter, addStyleFilter, addSortFilter} from '../store'

const mapStateToProps = state => ({
    product: state.product,
    brewery: state.brewery,
    style: state.style,
    styleFilter: state.styleFilter
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
    }
})

export const FilterBar = (props) => {
    return (
        <div>
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
        </div>
    )
}

const FilterBarContainer = connect(mapStateToProps, mapDispatchToProps)(FilterBar)

export default FilterBarContainer


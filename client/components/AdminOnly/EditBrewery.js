import React from 'react'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {updateBrewery, removeBrewery} from '../../store/brewery'

class EditBrewery extends React.Component {
    constructor(props) {
        super(props)
        this.onBrewerySubmit = this.onBrewerySubmit.bind(this)
        this.onBreweryDelete = this.onBreweryDelete.bind(this)
    }

    render() {
        const { breweries } = this.props

        const checkMe = (!breweries.length)

        if (checkMe) return <div />

        const targetBrewery = this.props.breweries.find(brew => brew.id === +this.props.match.params.id)
        if (!targetBrewery) return <div />

        return (
            <div>
                <NavLink to={'/admin/newbrewery'}><button>Create a New Brewery</button></NavLink>
                <button 
                onClick={(e)=>{
                    console.log(this.onBreweryDelete)
                    this.onBreweryDelete(e)
                }}>
                   Delete This Brewery!</button>
                <form onSubmit={
                    this.onBrewerySubmit
                }>
                    <h1>Edit A Brewery</h1>
                    <ul>
                        <li>
                            Name: 
                            <input
                                name="name"
                                defaultValue={targetBrewery.name}
                            />
                        </li>
                        <li>
                            Description: 
                            <textarea
                                name="description"
                                defaultValue={targetBrewery.description}
                            />
                        </li>
                        <li>
                            Image URL: 
                            <textarea
                                name="image"
                                defaultValue={targetBrewery.image}
                            />
                        </li>
                        <li>
                            Date Established:
                            <input
                                name="established"
                                defaultValue={targetBrewery.established}
                            />
                        </li>
                        <li>
                            City:
                            <input
                                name="city"
                                defaultValue={targetBrewery.city}
                            />
                        </li>
                        <li>
                            State:
                            <input
                                name="state"
                                defaultValue={targetBrewery.state}
                            />
                        </li>
                        <li>
                            Country:
                            <input
                                name="country"
                                defaultValue={targetBrewery.country}
                            />
                        </li>
                    </ul>
                    <button type="submit">Submit your changes</button>
                </form>
            </div>
        )
    }
    onBreweryDelete(event){
        event.preventDefault() 
        //console.log("I'm in here")
        this.props.removeBrewery(+this.props.match.params.id, this.props.history)
    }

    onBrewerySubmit(event) {
        event.preventDefault()
        const Brewery = {
            name: event.target.name.value,
            image: event.target.image.value,
            established: +event.target.established.value,
            description: event.target.description.value,
            city: event.target.city.value,
            state: event.target.state.value,
            country: event.target.country.value
        }
        console.log(Brewery)
        this.props.updateBrewery(+this.props.match.params.id, Brewery, this.props.history)
    }
}



const mapStateToProps = state => ({ breweries: state.brewery })

const mapDispatchToProps = {updateBrewery, removeBrewery}

const editBreweryContainer = connect(mapStateToProps, mapDispatchToProps)(EditBrewery)

export default editBreweryContainer
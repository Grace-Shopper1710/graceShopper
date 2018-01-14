import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {updateBeer, removeBeer} from '../../store/product'


class EditSingleBeer extends React.Component {
    constructor(props) {
        super(props)
        this.onBeerSubmit = this.onBeerSubmit.bind(this)
        this.onBeerDelete = this.onBeerDelete.bind(this)
    }

    render() {
        const { styles, beers, breweries } = this.props

        const checkMe = (!styles.length || !breweries.length || !beers.length)

        if (checkMe) return <div />

        const targetBeer = this.props.beers.find(beer => beer.id === +this.props.match.params.id)
        if (!targetBeer) return <div />
        console.log("%%%%%%%%%%%%%",targetBeer)
        const myBrewery = breweries.find(brewery => targetBeer.breweryId === brewery.id)
        if (!myBrewery) return <div />
        const myStyle = styles.find(style => targetBeer.styleId === style.id)
        //console.log(myBrewery, myStyle)
        if (!myStyle) return <div />
        return (
            <div>
                <NavLink to={'/admin/newbeer'}><button>Create a New Beer</button></NavLink>
                <button 
                onClick={this.onBeerDelete}>
                   Delete This Beer!</button>
                <form onSubmit={
                    this.onBeerSubmit
                }>
                    <h1>EDIT A BEER</h1>
                    <ul>
                        <li>
                            Name: 
                            <input
                                name="name"
                                defaultValue={targetBeer.name}
                            />
                        </li>
                        <li>
                            Description: 
                            <textarea
                                name="description"
                                defaultValue={targetBeer.description}
                            />
                        </li>
                        <li>
                            Image URL: 
                            <textarea
                                name="image"
                                defaultValue={targetBeer.image}
                            />
                        </li>
                        <li>
                            Inventory:
                            <input
                                name="inventory"
                                defaultValue={targetBeer.inventory}
                            />
                        </li>
                        <li>
                            Packaging:
                            <input
                                name="packaging"
                                defaultValue={targetBeer.packaging}
                            />
                        </li>
                        <li>
                            Price:
                            <input
                                name="price"
                                defaultValue={targetBeer.price}
                            />
                        </li>
                        <li>
                            Brewery:
                            <select
                                name="breweryId"
                                defaultValue={myBrewery.id}>
                                {
                                    breweries.map(brewery => (
                                        <option key={brewery.id} value={brewery.id}>{brewery.name}</option>
                                    ))
                                }
                            </select>
                        </li>
                        <li>
                            Style:
                            <select
                                name="styleId"
                                defaultValue={myStyle.id}
                            >
                                {
                                    styles.map(style => (
                                        <option key={style.id} value={style.id}>{style.name}</option>
                                    ))
                                }
                            </select>
                        </li>
                    </ul>
                    <button type="submit">Submit your changes</button>
                </form>
            </div>
        )
    }
    onBeerDelete(event){
        console.log("I'm in here")
        event.preventDefault() 
        this.props.removeBeer(+this.props.match.params.id, this.props.history)
    }

    onBeerSubmit(event) {
        event.preventDefault()
        const beer = {
            name: event.target.name.value,
            image: event.target.image.value,
            inventory: +event.target.inventory.value,
            description: event.target.description.value,
            breweryId: +event.target.breweryId.value,
            styleId: +event.target.styleId.value,
            packaging: event.target.packaging.value,
            price: +event.target.price.value
        }
        //console.log(beer)
        this.props.updateBeer(+this.props.match.params.id, beer, this.props.history)
    }
}



const mapStateToProps = state => ({ beers: state.product, breweries: state.brewery, styles: state.style })

const mapDispatchToProps = {updateBeer, removeBeer}

const editSingleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(EditSingleBeer)

export default editSingleBeerContainer
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import {updateBeer} from '../../store/product'


class EditSingleBeer extends React.Component {
    constructor(props) {
        super(props)
        this.onBeerSubmit = this.onBeerSubmit.bind(this)
    }

    render() {
        const { styles, beers, breweries } = this.props

        const checkMe = (!styles.length || !breweries.length || !beers.length)

        if (checkMe) return <div />
        const targetBeer = this.props.beers.find(beer => beer.id === +this.props.match.params.id)

        const myBrewery = breweries.find(brewery => targetBeer.breweryId === brewery.id)

        const myStyle = styles.find(style => targetBeer.styleId === style.id)
        console.log(myBrewery, myStyle)


        return (
            <div>
                <form onSubmit={
                    this.onBeerSubmit
                }>
                    <h1>THIS NEEDS TO BE BUILT TO EDIT SINGLE BEER</h1>
                    <ul>
                        <li>
                            Name: 
                            <input
                                name="name"
                                defaultValue={targetBeer.name}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Description: 
                            <textarea
                                name="description"
                                defaultValue={targetBeer.description}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Image URL: 
                            <textarea
                                name="image"
                                defaultValue={targetBeer.image}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Inventory:
                            <input
                                name="inventory"
                                defaultValue={targetBeer.inventory}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Packaging:
                            <input
                                name="packaging"
                                defaultValue={targetBeer.packaging}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Price:
                            <input
                                name="price"
                                defaultValue={targetBeer.price}
                                onChange={evt => { }}
                            />
                        </li>
                        <li>
                            Brewery:
                            <select
                                name="breweryId"
                                onChange={evt => { }}
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
                                onChange={evt => { }}
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
        console.log(beer)
        this.props.updateBeer(+this.props.match.params.id, beer, this.props.history)
    }
}



const mapStateToProps = state => ({ beers: state.product, breweries: state.brewery, styles: state.style })

const mapDispatchToProps = {updateBeer}

const editSingleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(EditSingleBeer)

export default editSingleBeerContainer
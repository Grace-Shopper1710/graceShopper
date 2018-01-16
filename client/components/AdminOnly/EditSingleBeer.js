import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {putBeer, removeBeer} from '../../store'


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
        const targetBeer = this.props.beers.find(beer => beer.id === +this.props.match.params.id) || {}
        const myBrewery = breweries.find(brewery => targetBeer.breweryId === brewery.id) || {}
        const myStyle = styles.find(style => targetBeer.styleId === style.id) || {}
        
        return (
            <div>
                <NavLink to={'/admin/newbeer'} className="btn btn-primary">New Beer</NavLink>
                <button onClick={this.onBeerDelete} className="btn btn-danger">Delete Beer</button>
                <form onSubmit={this.onBeerSubmit}>
                    <h1>EDIT A BEER</h1>
                        <div>
                            Name:
                            <input
                                name="name"
                                defaultValue={targetBeer.name}
                            />
                        </div><br />
                        <div>
                            Description:
                            <textarea
                                name="description"
                                defaultValue={targetBeer.description}
                            />
                        </div><br />
                        <div>
                            Image URL: 
                            <textarea
                                name="image"
                                defaultValue={targetBeer.image}
                            />
                        </div><br />
                        <div>
                            Inventory:
                            <input
                                name="inventory"
                                defaultValue={targetBeer.inventory}
                            />
                        </div>
                        <div>
                            Packaging:
                            <input
                                name="packaging"
                                defaultValue={targetBeer.packaging}
                            />
                        </div><br />
                        <div>
                            Price:
                            <input
                                name="price"
                                defaultValue={targetBeer.price}
                            />
                        </div><br />
                        <div>
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
                        </div><br />
                        <div>
                            Style:
                            <select
                                name="styleId"
                                defaultValue={myStyle.id}>
                                {
                                    styles.map(style => (
                                        <option key={style.id} value={style.id}>{style.name}</option>
                                    ))
                                }
                            </select>
                        </div><br />
                    <button className="btn btn-success" type="submit">Submit</button>
                </form>
            </div>
        )
    }
    onBeerDelete(event){
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
        this.props.putBeer(+this.props.match.params.id, beer, this.props.history)
    }
}

const mapStateToProps = state => ({ beers: state.product, breweries: state.brewery, styles: state.style })

const mapDispatchToProps = {putBeer, removeBeer}

const editSingleBeerContainer = connect(mapStateToProps, mapDispatchToProps)(EditSingleBeer)

export default editSingleBeerContainer
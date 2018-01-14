import React from 'react'
import {connect} from 'react-redux'
import {addBeer} from '../../store/product'

class NewBeer extends React.Component {
    constructor(props) {
        super(props)
        this.onBeerSubmit = this.onBeerSubmit.bind(this)
    }

    render() {
        const { styles, breweries } = this.props

        const checkMe = (!styles.length || !breweries.length)

        if (checkMe) return <div />

        return (
            <div>
                <form onSubmit={
                    this.onBeerSubmit
                }>
                    <h1>ADD A NEW BEER</h1>
                    <ul>
                        <li>
                            Name: 
                            <input
                                name="name"
                                defaultValue="add a name"
                            />
                        </li>
                        <li>
                            Description: 
                            <textarea
                                name="description"
                                defaultValue="add a description"
                            />
                        </li>
                        <li>
                            Image URL: 
                            <textarea
                                name="image"
                                defaultValue="add the image url"
                            />
                        </li>
                        <li>
                            Inventory:
                            <input
                                name="inventory"
                                defaultValue="the # in inventory"
                            />
                        </li>
                        <li>
                            Packaging:
                            <input
                                name="packaging"
                                defaultValue="how is it packaged?"
                            />
                        </li>
                        <li>
                            Price:
                            <input
                                name="price"
                                defaultValue="add the price"
                            />
                        </li>
                        <li>
                            Brewery:
                            <select
                                name="breweryId">
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
                            >

                                {
                                    styles.map(style => (
                                        <option key={style.id} value={style.id}>{style.name}</option>
                                    ))
                                }
                            </select>
                        </li>
                    </ul>
                    <button type="submit">Add this Beer</button>
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
        this.props.addBeer(beer, this.props.history)
    }
}



const mapStateToProps = state => ({ breweries: state.brewery, styles: state.style })

const mapDispatchToProps = {addBeer}

const NewBeerContainer = connect(mapStateToProps, mapDispatchToProps)(NewBeer)

export default NewBeerContainer
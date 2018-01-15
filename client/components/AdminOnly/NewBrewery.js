import React from 'react'
import {connect} from 'react-redux'
import {addBrewery} from '../../store'

class NewBrewery extends React.Component {
  constructor(props) {
    super(props)
    this.onBrewerySubmit = this.onBrewerySubmit.bind(this)
}

render() {
    return (
        <div>
          <form onSubmit={this.onBrewerySubmit}>
                <h1>Make A New Brewery</h1>
                <ul>
                    <li>
                        Name:
                        <input
                            name="name"
                            defaultValue="enter the name"
                        />
                    </li>
                    <li>
                        Description: 
                        <textarea
                            name="description"
                            defaultValue="enter the description"
                        />
                    </li>
                    <li>
                        Image URL: 
                        <textarea
                            name="image"
                            defaultValue="add an image url"
                        />
                    </li>
                    <li>
                        Date Established:
                        <input
                            name="established"
                            defaultValue="date established"
                        />
                    </li>
                    <li>
                        City:
                        <input
                            name="city"
                            defaultValue="enter the city"
                        />
                    </li>
                    <li>
                        State:
                        <input
                            name="state"
                            defaultValue="enter the state"
                        />
                    </li>
                    <li>
                        Country:
                        <input
                            name="country"
                            defaultValue="enter the country"
                        />
                    </li>
                </ul>
                <button type="submit">Submit your changes</button>
            </form>
        </div>
    )
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
    this.props.addBrewery(Brewery, this.props.history)
}
}

const mapDispatchToProps = {addBrewery}

const newBreweryContainer = connect(null, mapDispatchToProps)(NewBrewery)

export default newBreweryContainer
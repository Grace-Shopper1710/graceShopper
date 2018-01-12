var Promise = require("bluebird")
const  db  = require('../server/db/')
const {
  Style,
    Brewery,
    Product,
    User,
    Reviews,
} = require('../server/db/models')
//didn't do reviews yet

var data = {
    style: [
        {
            name: "IPA",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa."
        },
        {
            name: "Stout",
            description: "Donec porttitor ut ligula vel rutrum. Aenean eu elit non felis pharetra tincidunt. Nulla sodales sed mi quis semper. Ut lectus odio, dictum eu tempor sed, efficitur ut enim. Duis id tortor eu erat ultricies viverra ut quis risus. Cras facilisis sapien nulla, eget sagittis urna laoreet eleifend. Mauris pulvinar nibh ac nulla aliquet facilisis."
        },
        {
            name: "Ale",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse placerat rutrum libero, sit amet ornare nisi lacinia non. Nulla quis dolor molestie, finibus velit lobortis, tempor nisl. Vestibulum in dolor metus."
        },
        {
            name: "Lager",
            description: "Sed ut porta lacus. Nulla commodo lorem at purus rhoncus, in faucibus nunc tempus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tempus velit sem, a tincidunt eros varius pellentesque. Praesent vulputate eget nibh id auctor. In cursus felis eu scelerisque condimentum. Sed feugiat sit amet enim at hendrerit. Nunc elementum imperdiet elit, vel feugiat nisi ultrices eget. Aliquam sed massa volutpat lacus pharetra volutpat vel quis sem."
        }
    ],

    //breweries have: name,  image, description, established, city, state, country
    brewery: [
        {
            name: "Great Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1902,
            city: "Tallahassee",
            state: "FL",
            country: "USA"

        },
        {
            name: "Best Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1990,
            city: "Boson",
            state: "MA",
            country: "USA"

        },
        {
            name: "Le Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1992,
            city: "Paris",
            state: "NA",
            country: "France"

        },
        {
            name: "Super Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 2002,
            city: "San Fransisco",
            state: "CA",
            country: "USA"

        },
        {
            name: "Another Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1952,
            city: "Athens",
            state: "GA",
            country: "USA"

        },
        {
            name: "What a Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1972,
            city: "Chicago",
            state: "IL",
            country: "USA"

        },
        {
            name: "Cerveza Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1942,
            city: "Barcelona",
            state: "NA",
            country: "Spain"

        },
        {
            name: "Wonderful Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1962,
            city: "Providence",
            state: "RI",
            country: "USA"

        },
        {
            name: "NYC Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 2011,
            city: "New York",
            state: "NY",
            country: "USA"

        },
        {
            name: "Getting Bored Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1969,
            city: "Raleigh",
            state: "NC",
            country: "USA"

        },
        {
            name: "The LAST Brewery",
            image: "http://www.brewerygems.com/images/Bellingham%20Bay%20Brewery%20drawing_small.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1890,
            city: "Portland",
            state: "OR",
            country: "USA"

        }
    ],
    //user (email, password, isAdmin)
    user: [
        {
            email: "sara@sara.sara",
            password: "123",
            isAdmin: true
        },
        {
            email: "tadpole@gmail.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "julia@julia.julia",
            password: "123",
            isAdmin: true
        },
        {
            email: "lily@gmail.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "lyssa@lyssa.lyssa",
            password: "123",
            isAdmin: true
        },
        {
            email: "alex@gmail.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "kohsin@kohsin.kohsin",
            password: "123",
            isAdmin: true
        },
        {
            email: "charlie@gmail.com",
            password: "123",
            isAdmin: false
        },
    ],
    //products: name, image, inventory, price, packaging, description, abv, breweryId, styleId
    product: [
        {
            name: "beer1",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 3,
            price: 13.99,
            packaging: "6 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 3.4,
            breweryId: 1,
            styleId: 1
        },
        {
            name: "beer2",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 6,
            price: 14.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 5.4,
            breweryId: 2,
            styleId: 2
        },
        {
            name: "beer3",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 10,
            price: 19.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 9.4,
            breweryId: 3,
            styleId: 3
        },
        {
            name: "beer4",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 100,
            price: 12.99,
            packaging: "6 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 2.4,
            breweryId: 4,
            styleId: 4
        },
        {
            name: "beer5",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 299,
            price: 18.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 7.4,
            breweryId: 5,
            styleId: 1
        },
        {
            name: "beer6",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 188,
            price: 16.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 6.4,
            breweryId: 6,
            styleId: 2
        },
        {
            name: "beer7",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 28,
            price: 10.99,
            packaging: "6 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 5.6,
            breweryId: 7,
            styleId: 3
        },
        {
            name: "beer8",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 2,
            price: 13.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 9.0,
            breweryId: 8,
            styleId: 4
        },
        {
            name: "beer9",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 10,
            price: 6.99,
            packaging: "6 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 5.4,
            breweryId: 9,
            styleId: 1
        },
        {
            name: "beer10",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 9,
            price: 15.99,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 6.4,
            breweryId: 10,
            styleId: 2
        },
        {
            name: "beer11",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 11,
            price: 11.11,
            packaging: "11 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 11.1,
            breweryId: 11,
            styleId: 3
        },
        {
            name: "beer12",
            image: "https://279173f3.nuajik.io/589-large_default/duff-beer-bottle.jpg",
            inventory: 12,
            price: 12.12,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 6.6,
            breweryId: 1,
            styleId: 4
        },

    ],
    reviews:[
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 2,
            userId: 3,
            productId: 8

        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 3,
            productId: 6
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 1,
            productId: 4
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 1,
            productId: 1
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 2,
            productId: 7
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 3,
            userId: 4,
            productId: 6
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 3,
            productId: 10
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 5,
            productId: 7
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 2,
            productId: 7
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 3,
            productId: 10
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 3,
            productId: 7
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 1,
            productId: 8
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 1,
            productId: 3
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 2,
            productId: 10
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 6,
            productId: 9
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 4,
            userId: 4,
            productId: 10
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 5,
            userId: 6,
            productId: 8
        },
        {
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            rating: 2,
            userId: 7,
            productId: 6
        }


    ]
}

db.sync({ force: true })
    .then(function () {
        console.log("Dropped old data, now inserting data")
        return Promise.map(Object.keys(data), function (name) {
            return Promise.map(data[name], function (item) {
                return db.model(name).create(item)
            })
        })
    })
    .then(function () {
        console.log("Finished inserting data")
    })
    .catch(function (err) {
        console.error("There was totally a problem", err, err.stack)
    })
    .finally(function () {
        db.close()
        console.log("connection closed")
        return null
    })




// /**
//  * Welcome to the seed file! This seed file uses a newer language feature called...
//  *
//  *                  -=-= ASYNC...AWAIT -=-=
//  *
//  * Async-await is a joy to use! Read more about it in the MDN docs:
//  *
//  * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//  *
//  * Now that you've got the main idea, check it out in practice below!
//  */
// const db = require('../server/db')
// const {User} = require('../server/db/models')

// async function seed () {
//   await db.sync({force: true})
//   console.log('db synced!')
//   // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
//   // executed until that promise resolves!

//   const users = await Promise.all([
//     User.create({email: 'cody@email.com', password: '123'}),
//     User.create({email: 'murphy@email.com', password: '123'})
//   ])
//   // Wowzers! We can even `await` on the right-hand side of the assignment operator
//   // and store the result that the promise resolves to in a variable! This is nice!
//   console.log(`seeded ${users.length} users`)
//   console.log(`seeded successfully`)
// }

// // Execute the `seed` function
// // `Async` functions always return a promise, so we can use `catch` to handle any errors
// // that might occur inside of `seed`
// seed()
//   .catch(err => {
//     console.error(err.message)
//     console.error(err.stack)
//     process.exitCode = 1
//   })
//   .then(() => {
//     console.log('closing db connection')
//     db.close()
//     console.log('db connection closed')
//   })

// /*
//  * note: everything outside of the async function is totally synchronous
//  * The console.log below will occur before any of the logs that occur inside
//  * of the async function
//  */
// console.log('seeding...')

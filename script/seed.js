var Promise = require("bluebird")
const  db  = require('../server/db/')
const {
  Style,
    Brewery,
    Product,
    User,
    Reviews,
    Order
} = require('../server/db/models')
//didn't do reviews yet

var data = {
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
        {
            email: "janeDoe@janedoe.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "johnwayne@johnwayne.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "bettedavis@bettedavis.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "audreyhepburn@gmail.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "elizabethtaylor@etaylor.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "jenniferjones@jjones.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "johndoe@jDoe.com",
            password: "123",
            isAdmin: false
        },
        {
            email: "janedoe@jdoe.com",
            password: "123",
            isAdmin: false
        }
    ],
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
            image: "https://assets3.thrillist.com/v1/image/1593830/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1902,
            city: "Tallahassee",
            state: "FL",
            country: "USA"

        },
        {
            name: "Best Brewery",
            image: "https://assets3.thrillist.com/v1/image/1605324/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1990,
            city: "Boson",
            state: "MA",
            country: "USA"

        },
        {
            name: "Le Brewery",
            image: "https://assets3.thrillist.com/v1/image/1593811/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1992,
            city: "Paris",
            state: "NA",
            country: "France"

        },
        {
            name: "Super Brewery",
            image: "https://assets3.thrillist.com/v1/image/1593840/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 2002,
            city: "San Fransisco",
            state: "CA",
            country: "USA"

        },
        {
            name: "Another Brewery",
            image: "https://assets3.thrillist.com/v1/image/1750134/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1952,
            city: "Athens",
            state: "GA",
            country: "USA"

        },
        {
            name: "What a Brewery",
            image: "https://assets3.thrillist.com/v1/image/1596577/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1972,
            city: "Chicago",
            state: "IL",
            country: "USA"

        },
        {
            name: "Cerveza Brewery",
            image: "https://assets3.thrillist.com/v1/image/1596588/size/tl-horizontal_main.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1942,
            city: "Barcelona",
            state: "NA",
            country: "Spain"

        },
        {
            name: "Wonderful Brewery",
            image: "https://assets3.thrillist.com/v1/image/1489122/size/tmg-article_default_mobile.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1962,
            city: "Providence",
            state: "RI",
            country: "USA"

        },
        {
            name: "NYC Brewery",
            image: "https://i1.wp.com/aladyofleisure.com/wp-content/uploads/2014/05/Reception-e1461172304195.jpg?zoom=2&resize=672%2C372",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 2011,
            city: "New York",
            state: "NY",
            country: "USA"

        },
        {
            name: "Getting Bored Brewery",
            image: "https://stepoutbuffalo.com/wp-content/uploads/2015/11/new-york-beer-project-outside.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1969,
            city: "Raleigh",
            state: "NC",
            country: "USA"

        },
        {
            name: "The LAST Brewery",
            image: "https://i.pinimg.com/originals/ab/3e/73/ab3e7367d6bd16e581b4f3c74107e20e.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            established: 1890,
            city: "Portland",
            state: "OR",
            country: "USA"

        }
    ],
    //products: name, image, inventory, price, packaging, description, abv, breweryId, styleId
    product: [
        {
            name: "beer1",
            image: "http://s3.amazonaws.com/simplemost/wp-content/uploads/2015/09/15222355/pumpkick_l.png",
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
            image: "http://dbertolineandsons.com/wp-content/uploads/2016/08/shock-top-belgian-white-6pack.png",
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
            image: "https://i.pinimg.com/originals/bf/64/8b/bf648b0be06d761df4a2057660968589.png",
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
            image: "http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/citradelic_l.png",
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
            image: "https://lh3.googleusercontent.com/-B6PQsCgyDYU/WbvxKfpE5NI/AAAAAAAFCLY/kZij3oGkrnwZThyRZwOWjTtmLzSBVgmqQCHMYCw/lab1_thumb%255B3%255D?imgmax=800",
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
            image: "http://images.mentalfloss.com/sites/default/files/styles/insert_main_wide_image/public/PILS-Photo-6-pack-Profile.png",
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
            image: "https://ei.marketwatch.com/Multimedia/2015/07/10/Photos/NS/MW-DP862_transa_20150710111402_NS.png?uuid=4c820ea4-2716-11e5-90bf-0015c588dfa6",
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
            image: "http://www.americancraftbeer.com/wp-content/uploads/2016/09/Hardywood-VIPA.png",
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
            image: "https://cdn.shopify.com/s/files/1/0227/0581/products/custom_resized_c512ed9b-6599-4bc8-813e-1c095ff5eade.png?v=1509655559",
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
            image: "http://www.newyorkbeverage.com/wp-content/uploads/2016/07/domestic-beer.png",
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
            image: "http://theaposition.com/tombedell/wp-content/uploads/sites/15/2014/09/FW-oaktoberfest.png",
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
            image: "http://ipourit.ipourit.netdna-cdn.com/images/beer/eead27b8-d554-4da5-a454-734df4de1895_PipelinePorter_600.png",
            inventory: 12,
            price: 12.12,
            packaging: "12 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 6.6,
            breweryId: 1,
            styleId: 4
        }

     ]}
     var data2 = {reviews: [
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


    ]}
    var data3 = { order: [
        {
            name: 'Doe Last',
            address: '123 Server Lane',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total:  150.00,
            status: 'PROCESSING',
            userId: 9
        },
        {
            name: 'Wayne Lame',
            address: '123 Express Boulevard',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: 38.00,
            status: 'COMPLETED',
            userId: 10
        },
        {

            name: 'Joey Davis',
            address: '123 Node Street',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total:  48.00,
            status: 'CANCELLED',
            userId: 11
        },
        {

            name: 'Aud Hepburn',
            address: '123 Compiler Avenue',
            zipCode: '10000',
            city: 'Queens',
            state: 'NY',
            total: 100.00,
            status: 'PROCESSING',
            userId: 12
        },
        {
            name: 'Taylor Jones',
            address: '123 React Lane',
            zipCode: '10000',
            city: 'Long Island',
            state: 'NY',
            total: 500.00,
            status: 'COMPLETED',
            userId: 13
        },
        {

            name: 'Also Name',
            address: '123 Server Street',
            zipCode: '10000',
            city: 'Long Island',
            state: 'NY',
            total: 40.00,
            status: 'CREATED',
            userId: 14
        },
        {
            name: 'This Is Name',
            address: '123 Server Lane',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: '150',
            status: 'CANCELLED',
            userId: 15
        },
        {
            name: 'Another Name',
            address: '123 Server Lane',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: 68.00,
            status: 'PROCESSING',
            userId: 16
        }
      ]}


db.sync({ force: true })
    .then(function () {
        console.log("Dropped old data, now inserting data")
        return Promise.map(Object.keys(data), function (name) {
            console.log("name", name)
            return Promise.map(data[name], function (item) {
                console.log("another time name", name)
                return db.model(name).create(item)
            })
        })
    })
    .then(function () {
        console.log("Dropped old data, now inserting data")
        return Promise.map(Object.keys(data2), function (name) {
            console.log("name", name)
            return Promise.map(data2[name], function (item) {
                console.log("another time name", name)
                return db.model(name).create(item)
            })
        })
    })
    .then(function () {
      console.log("Dropped old data, now inserting order data")
      return Promise.map(Object.keys(data3), function (name) {
          return Promise.map(data3[name], function (item) {
              //console.log("another time name", name)
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

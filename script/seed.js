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
            name: "American Double / Imperial IPA",
            description: "Take an India Pale Ale and feed it steroids, ergo the term Double IPA. Although open to the same interpretation as its sister styles, you should expect something robust, malty, alcoholic and with a hop profile that might rip your tongue out. The Imperial usage comes from Russian Imperial stout, a style of strong stout originally brewed in England for the Russian Imperial Court of the late 1700s; though Double IPA is often the preferred name."
        },
        {
            name: "American IPA",
            description: "The American IPA is a different soul from the reincarnated IPA style. More flavorful than the withering English IPA, color can range from very pale golden to reddish amber. Hops are typically American with a big herbal and / or citric character, bitterness is high as well. Moderate to medium bodied with a balancing malt backbone."
        },
        {
            name: "American Wild Ale",
            description: "Sometimes Belgian influenced, American Wild Ales are beers that are introduced to 'wild' yeast or bacteria, such as: Brettanomyces (Brettanomyces Bruxellensis, Brettanomyces Lambicus or Brettanomyces Anomolus), Pediococcus or Lactobacillus. This introduction may occur from oak barrels that have been previously inoculated, pitched into the beer, or gained from various 'sour mash' techniques. Regardless of which and how, these little creatures often leave a funky calling card that can be quite strange, interesting, pleasing to many, but also often deemed as undesirable by many."
        },
        {
            name: "American Pale Ale (APA)",
            description: "Of British origin, this style is now popular worldwide and the use of local ingredients, or imported, produces variances in character from region to region. Generally, expect a good balance of malt and hops. Fruity esters and diacetyl can vary from none to moderate, and bitterness can range from lightly floral to pungent."
        },
        {
            name: "Saison / Farmhouse Ale",
            description: "Saisons are sturdy farmhouse ale that was traditionally brewed in the winter, to be consumed throughout the summer months. Not so long ago it was close to being an endangered style, but over recent years there's been a massive revival; especially in the US. This is a very complex style; many are very fruity in the aroma and flavor. Look for earthy yeast tones, mild to moderate tartness. Lots of spice and with a medium bitterness. They tend to be semi-dry with many only having touch of sweetness."
        },
        {
            name: "English Stout",
            description: "As mysterious as they look, stouts are typically dark brown to pitch black in color. A common profile amongst Stouts, but not in all cases, is the use of roasted barley (unmalted barley that is kilned to the point of being charred) which lends a dry character to the beer as well as a huge roasted flavor that can range from burnt to coffee to chocolate. A different balance of hops is up to the brewers preference, but the roasted character must be there."
        }
    ],

    //breweries have: name,  image, description, established, city, state, country
    brewery: [
        {
            name: "The Alchemist Brewery",
            image: "https://alchemistbeer.com/wp-content/uploads/2017/07/cropped_LUVLENS_ALCHEMISTSPRING17_drone-64.jpg",
            description: "The Alchemist is a 7 barrel brew pub specializing in hand-crafted  beer and casual pub fare.  All of our ales flow directly from our  basement brewery, which was designed and installed by our brewer and  co-proprietor John Kimmich.   We use only the finest imported malts and  domestic hops available to bring you the tastiest and finest selection  of beers in Vermont!",
            established: 2003,
            city: "Waterbury",
            state: "VT",
            country: "USA"

        },
        {
            name: "Russian River Brewing Company",
            image: "https://cdn-png3.thedailymeal.com/sites/default/files/styles/tdm_slideshow_large/public/6-russianriver2_edit%20png.png?itok=DCFcII3o",
            description: "Russian River Brewing Company (RRBC) was originally owned by Korbel Champagne Cellars in Guerneville, California and was founded on their historic and beautiful property amidst vineyards and redwoods near the Russian River. When Korbel decided to get out of the beer business in 2003, they generously offered the brewmaster, Vinnie Cilurzo and his wife Natalie the rights to the brand. Russian River Brewing might be something completely different now if it weren't for this incredible opportunity.\r\nOn April 3, 2004, Vinnie and Natalie reopened RRBC as a brewpub in downtown Santa Rosa to great success and began self-distributing to nearby clients. In 2008, they opened a production brewery about 1 mile from their brewpub allowing them to triple production, take on more accounts locally, and distribute some beer in 4 more states.",
            established: 1997,
            city: "Santa Rosa",
            state: "CA",
            country: "USA"

        },
        {
            name: "Maine Beer Company",
            image: "http://www.theforecaster.net/wp-content/uploads/2016/08/Maine_Beer_Company.jpg",
            description: "Maine Beer Company is a very small micro brewery located in Portland, Maine.  We don\u2019t concentrate on any particular style of beer.  We don\u2019t do just  big beers or small beers or light beers or dark beers. \r\n\r\nOur production is limited and our process is slow (our beers are 100% bottle conditioned) but our dedication to brewing really good beer and doing what\u2019s right always comes first.",
            established: 2009,
            city: "Paris",
            state: "NA",
            country: "France"

        },
        {
            name: "Tree House Brewing Company",
            image: "http://valleyadvocate.com/wp-content/uploads/2016/11/PV-treehouse-4141-1024x666.jpg",
            description: "Tree House Brewing Co. is an artisanal brewery located in a small red barn overlooking the Pioneer Valley in Monson, Massachusetts. We hand craft small batches of beer using well water and the finest ingredients available. Our goal is to make the best beer in the world at an exceptional value and without compromises. We hope to inspire friends and family, brothers and sisters, to share and enjoy our beer in the company of those they love - and to seek out like minded, passionate companies who are working on sustainable, local models that aim provide the customer with an exceptional drinking and culinary experience.\r\n\r\nWe think quality of life is less about the things you have and more about the experiences you enjoy and the friends you slow down and laugh with. This project is a natural extension of the simple life we aim to lead. We very much look forward to making friends with you along the way.\r\n\r\nFounded by:\r\n\r\nDean Rohan, Jonathan Weisbach, Damien Goudreau, & Nathan Lanier",
            established: 2011,
            city: "Freeport",
            state: "ME",
            country: "USA"

        },
        {
            name: "Three Floyds Brewing Company",
            image: "https://assets3.thrillist.com/v1/image/1750134/size/tl-horizontal_main.jpg",
            description: "Three Floyds Brewing Company LLC was founded in 1996 by brothers Nick and Simon with their father Mike Floyd. The original brewery was built by Nick and Simon in a run down warehouse located in Hammond, Indiana. The first beers brewed by the brothers were designed to be a departure from the fairly bleak craft brewing scene in the region. Nick and Simon brewed intense balanced beers that were and still remain \u201cnot normal\u201d by conventional standards.\r\n\r\nIn November of 2005, after receiving numerous visitors to the brewery over the years, Three Floyds opened its own brewpub at the production facility. What was once office space is now a refuge for the craft beer enthusiast. With all the Three Floyds mainstays, seasonal offerings, special small batch beers and many guest beers it is a mecca for craft beer. The pub also has a full service kitchen providing pub fare of the best quality supported by a 3000 square foot organic herb and vegetable garden.",
            established: 1996,
            city: "Munster",
            state: "IN",
            country: "USA"

        },
        {
            name: "Pipeworks Brewing Company",
            image: "http://beerpulse.com/wp-content/uploads/2011/11/Pipeworks-Brewing-logo.jpg",
            description: "Pipeworks began, as many breweries do, in the stove top kettles and plastic-bucket fermenters of the home brewer. Beejay Oslon and Gerrit Lewis met while working at Chicago's famous West Lakeview Liquors, a haven for beer geeks in search of new and exciting brews from around the world. While working there, the two got to thinking it was time to turn their passion in to a business.\r\n\r\n The first steps in that long journey  took them to a the small town of Lo in the Belgian countryside. It was there that the Pipeworks boys lived and worked with Urbain Coutteau owner and brewer at the De Struise Brewery. While working there the boys honed their craft, learned the ins and outs of running a brewery, and had the opportunity to create their first commercially available beers. The success of these brews fueled their passion and prepared them for the work ahead of them.\r\n\r\n Upon coming back to the States the two began experimenting with pilot batches, formulating a business plan, and developing an image for Pipeworks.\r\n\r\n Now we are ready to bring what we've learned to the craft beer world!",
            established: 2009,
            city: "Chicago",
            state: "IL",
            country: "USA"

        },
        {
            name: "Hill Farmstead Brewery",
            image: "https://assets3.thrillist.com/v1/image/1596588/size/tl-horizontal_main.jpg",
            description: "Hill Farmstead Brewery is the culmination of travel and insight, of friendships and explorations, and of realizing a sense of one\u2019s place.  Upon the hand hewn land of our forebears, we honor eight generations of Greensboro ancestry by thoughtfully engaging with our heritage and with our distinctive beers. This offering is our effort to revive, diversify, and prolong the memory of the Hill Farmstead. Share. Consider. Enjoy.",
            established: 2010,
            city: "Greensboro Bend",
            state: "VT",
            country: "USA"

        },
        {
            name: "de Garde Brewing",
            image: "http://4.bp.blogspot.com/-rDCsYkXAnbk/UT0N8CInlpI/AAAAAAAASgU/bAVM8yU-8FI/s640/De+Garde+Brewing+logo.jpg",
            description: "We are a small rural brewery specializing in many diverse styles of ales, but with a focus on spontaneous fermentations inspired by the European farmhouse traditions.",
            established: 2013,
            city: "Tillamook",
            state: "OR",
            country: "USA"

        },
        {
            name: "Other Half Brewing Co.",
            image: "http://idrinkgoodbeer.com/wp-content/uploads/2015/04/Other-Half-Brewing-Brooklyn.jpg",
            description: "Craft Brewery specializing in IPA's and Sours",
            established: 2011,
            city: "Brookylyn",
            state: "NY",
            country: "USA"

        },
        {
            name: "Jester King Brewery",
            image: "http://jesterkingbrewery.com/images/1430.jpg",
            description: "Located in the beautiful Texas Hill Country, Jester King Craft Brewery is an authentic farmhouse brewery committed to brewing artisan ales of great depth and character. At times drawing influences from the world beyond traditional brewers\u2019 yeast, Jester King\u2019s beer is not rushed to market but allowed to mature \u2013 often in oak barrels \u2013 to create the most enjoyable, interesting and exciting beer we can make. An additional layer of complexity is added to Jester King\u2019s bottled beers by allowing a second fermentation to take place in the bottle. As part of its commitment to sustainability, the slow food movement and Texas, Jester King beer uses as many organic and local ingredients as possible and will soon be brewed with harvested rainwater.",
            established: 2010,
            city: "Austin",
            state: "TX",
            country: "USA"

        },
        {
            name: "Tired Hands Brewing Company",
            image: "http://idrinkgoodbeer.com/wp-content/uploads/2015/05/Tired-Hands-Brewing-Company-Fermentaria-2.jpg",
            description: "We value local over imported, small batches over mass production, and striking a successful balance between giving back to our community and personal profit. Localization guides everything we do, from sourcing raw ingredients and materials, to employing area talent.\r\n\r\nTired Hands Brewing Company will operate at 16 Ardmore Avenue, Ardmore Pa, on a six barrel brewhouse. We will focus our brewing on two very broad styles of beers that hold a special place in my heart: Belgian\/French farmhouse ales and American hop-forward ales.\r\n\r\nAll cheeses, meats, and seasonal produce served at our cafe (simple and satisfying fare from honest local producers) will be sourced from within 100 miles of our brewery.",
            established: 2011,
            city: "Ardmore",
            state: "PA",
            country: "USA"

        }
    ],
    //products: name, image, inventory, price, packaging, description, abv, breweryId, styleId
    product: [
        {
            name: "Heady Topper",
            image: "https://static1.squarespace.com/static/52810817e4b0a82a769586ee/t/54d92c18e4b0f7abf28c9044/1423518746915/?format=300w",
            inventory: 5,
            price: 12.50,
            packaging: "4 pack",
            description: "We love hops – that’s why our flagship Double IPA, Heady Topper, is packed full of them. Heady Topper was designed to showcase the complex flavors and aromas these flowers produce. The Alchemist has been brewing Heady Topper since 2003. This Double IPA is not intended to be the strongest or most bitter DIPA. It is brewed to give you wave after wave of hop flavor without any astringent bitterness. We brew Heady Topper with a proprietary blend of six hops – each imparting its own unique flavor and aroma. Take a big sip of Heady and see what hop flavors you can pick out. Orange? Tropical Fruit? Pink Grapefruit? Pine? Spice? There is just enough malt to give this beer some backbone, but not enough to take the hops away from the center stage.",
            abv: 8.00,
            breweryId: 1,
            styleId: 1
        },
        {
            name: "Focal Banger",
            image: "https://cdn.gearpatrol.com/wp-content/uploads/2016/04/Best-IPA-Gear-Patrol-_0015_CQ0A9534.jpg",
            inventory: 6,
            price: 15.00,
            packaging: "4 pack",
            description: "Focal Banger is an American India Pale Ale. We have a real love for IPAs here at Alchemist, and we strive to offer you the best hop experience that we possibly can. \r\n\r\nThis beer is brewed using Citra and Mosaic hops and our favorite British malts. Truly an abundance of hoppy goodness...\r\n\r\nFreshness and control have always been my main concern when it comes to our beer. We are committed to providing you with an unfiltered and unpasteurized hop experience.",
            abv: 7.0,
            breweryId: 1,
            styleId: 2
        },
        {
            name: "Pliny The Elder",
            image: "https://48tk9j3a74jb133e1k2fzz2s-wpengine.netdna-ssl.com/wp-content/uploads/2015/05/Pliny-The-Elder-bottle.jpg",
            inventory: 10,
            price: 19.99,
            packaging: "4 pack",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 8.00,
            breweryId: 2,
            styleId: 1
        },
        {
            name: "Supplication",
            image: "http://draftmag.com/wp-content/uploads/2016/11/WEB_20161122_Supplication_small.jpg",
            inventory: 48,
            price: 12.99,
            packaging: "375 ml BTL",
            description: "Brown Ale aged in used Pinot Noir barrels from local Sonoma County wineries. It is aged for about 12 months with sour cherries, brettanomyces, lactobacillus, and pediococcus added to each barrel. Flavors from the cherries, Pinot Noir and oak balance each other nicely with a little funk from the brett.",
            abv: 7.00,
            breweryId: 2,
            styleId: 3
        },
        {
            name: "Consecration",
            image: "https://www.porchdrinking.com/wp-content/uploads/2015/08/Consecration.jpg",
            inventory: 64,
            price: 14.99,
            packaging: "375 ml BTL",
            description: "Dark Ale aged in Cabernet Sauvignon barrels from local wineries. It is aged for 4 to 8 months with black currants, brettanomyces, lactobacillus, and pediococcus added to each barrel. Rich flavors of chocolate truffle, spice, tobacco, currants, and a bit of Cabernet. Very full-bodied, sip slowly!",
            abv: 10,
            breweryId: 2,
            styleId: 3
        },
        {
            name: "Julius",
            image: "https://static1.squarespace.com/static/501bb93ec4aa651f100e3b0f/5648e70fe4b0c64ed27ad823/5648e86ee4b0e20612058137/1447618686616/IMG_5760.jpg?format=2500w",
            inventory: 48,
            price: 18.99,
            packaging: "6 pack",
            description: "Bursting with 1.6 oz per gallon of American hops, Julius is loaded with notes of passionfruit, mango, and citrus. At 6.8% alcohol, it is refreshing and freakishly drinkable.",
            abv: 6.8,
            breweryId: 4,
            styleId: 2
        },
        {
            name: "Dinner",
            image: "http://cdn1.bostonmagazine.com/wp-content/uploads/2015/10/bottle-dinner.jpg",
            inventory: 28,
            price: 9.99,
            packaging: "375 ml BTL",
            description: "Our first Double IPA – dry, refreshing and hoppy. We really focused on hop flavor and aroma here. To maximize hop character, we dry hopped Dinner twice with over 6 lbs. of hops per barrel. For the best experience, please enjoy fresh as possible.",
            abv: 8.2,
            breweryId: 3,
            styleId: 1
        },
        {
            name: "MO",
            image: "https://static1.squarespace.com/static/56f17f6f45bf211d1030c046/t/57ebaa74d482e9f4d47af121/1475062391763/DSC_3288+%282000x1841%29.jpg",
            inventory: 2,
            price: 13.99,
            packaging: "375 ml BTL",
            description: "Our first run at an American Pale Ale. Flavors and aromas of zesty citrus, passionfruit, and pine present themselves throughout. A very subtle malt sweetness for balance, but this is intended to finish dry.Just after opening our brewery, working long nights, weekends, and still maintaining our day jobs, my brother Daniel (the brewer) had twins. Cheers to his courage and dedication to making better beer.",
            abv: 6.0,
            breweryId: 3,
            styleId: 4
        },
        {
            name: "Zombie Dust",
            image: "https://48tk9j3a74jb133e1k2fzz2s-wpengine.netdna-ssl.com/wp-content/uploads/2014/11/3-Floyds-Zombie-Dust-Six-pack.jpg",
            inventory: 10,
            price: 22.00,
            packaging: "6 pack",
            description: "This intensely hopped and gushing undead Pale Ale will be one’s only respite after the zombie apocalypse. Created with our marvelous friends in the comic industry. 60 IBU. Formerly known as Cenotaph: A medium bodied single hop beer showcasing Citra hops from the Yakima Valley, USA.",
            abv: 6.2,
            breweryId: 5,
            styleId: 4
        },
        {
            name: "Lizard King",
            image: "http://www.archerliquors.com/Pipeworks/all_files/Pipeworks%20Lizard%20King%401x.png",
            inventory: 9,
            price: 15.99,
            packaging: "4 pack",
            description: "Throughout the epic battle, the Ninjas and the Unicorns have been waiting for something, anything, to tip the scale in their favor. After all, The Unicorns and The Ninjas have been fighting this epic battle for nearly and epoch. In this age-old battle, will the Lizard King be the one to end the battle? Will there finally be peace among the two warring parties? Will this be the end of rhetorical questions?!",
            abv: 6.00,
            breweryId: 10,
            styleId: 4
        },
        {
            name: "Anna",
            image: "http://cdn.pastemagazine.com/www/articles/hill%20farmstead%20anna%20%28Custom%29.jpg",
            inventory: 9,
            price: 15.99,
            packaging: "750 ml BTL",
            description: "Anna is Bière de Miel, brewed with 20% raw wildflower Vermont honey and our house saison yeast.",
            abv: 6.4,
            breweryId: 10,
            styleId: 5
        },
        {
            name: "Nectarine Premiere",
            image: "https://scontent-sea1-1.cdninstagram.com/t51.2885-15/s480x480/e35/c148.0.783.783/17663627_1030054860472685_6283648887622205440_n.jpg?ig_cache_key=MTQ4NjU2MzY1MzY2Mjg3Mjk0Mg%3D%3D.2.c",
            inventory: 12,
            price: 13.99,
            packaging: "750 ml BTL",
            description: "A Wild Farmhouse Ale Aged in Oak Barrels with Nectarines",
            abv: 7.1,
            breweryId: 10,
            styleId: 5
        },
        {
            name: "Double Dry Hopped Double Mosaic Dream",
            image: "https://res.cloudinary.com/ratebeer/image/upload/w_250,c_limit/beer_452212.jpg",
            inventory: 11,
            price: 22,
            packaging: "6 pack",
            description: "Double Dry Hopped Double Mosaic Dream is our standard Double Mosaic dry hopped a second time with a mosaic lupulin powder. Lupulin powder is a new hop product that is similar to our standard hops but with all the extra plant filler stripped away. It’s pure hops and it’s awesome.",
            abv: 8.5,
            breweryId: 9,
            styleId: 1
        },
        {
            name: "DDH DAYDREAM IN GREEN",
            image: "https://www.mybeercollectibles.com/uploads/cache/26154391_309801732843681_5175791932231647232_n-500x500-crop.jpg",
            inventory: 12,
            price: 20.00,
            packaging: "4 pack",
            description: "Double dry hopped imperial oat IPA w / citra, motueka + wai-iti",
            abv: 8.0,
            breweryId: 9,
            styleId: 1
        },
        {
            name: "Atrial Rubicite",
            image: "https://farm5.staticflickr.com/4294/35869150971_ec942d70fa_z.jpg",
            inventory: 11,
            price: 18,
            packaging: "750 ml BTL",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in diam nec orci dignissim iaculis sit amet sit amet diam. In quis mollis felis. In aliquam libero vitae leo vehicula, vulputate consectetur libero eleifend. Aenean feugiat dolor id orci euismod, quis vehicula eros luctus. Aenean eget mauris ac lorem condimentum venenatis id non massa.",
            abv: 5.80,
            breweryId: 10,
            styleId: 3
        },
        {
            name: "Omniscience & Proselytism",
            image: "https://farm8.staticflickr.com/7129/27078857403_5343878d17_z.jpg",
            inventory: 11,
            price: 11.11,
            packaging: "750 ml BTL",
            description: "Ale Refermented in Oak Barrels With Strawberries: Strawberries from Fredericksburg, Texas were added to oak barrels containing mature sour beer. The beer was then allowed to referment to dryness. Unfiltered, unpasteurized and naturally conditioned. The name Omniscience & Proselytism does not refer to any claims of inducing omniscience.",
            abv: 5.0,
            breweryId: 10,
            styleId: 3
        },
        {
            name: "Alien Church",
            image: "https://3.bp.blogspot.com/-oAYAKQ4mocs/WRxGLTEtN2I/AAAAAAAAFRc/dY4OMkBblK0b4sa1hIvluSo3yVg3gXvuwCLcB/s1600/DSC_0687.JPG",
            inventory: 24,
            price: 7.0,
            packaging: "4 pack",
            description: "IPA Brewed with oats. Hopped with Mosaic, Citra, Chinook, Centennial and Columbus. An otherworldly IPA. Bow down before the ALien Church! Notes of blueberries, fresh orange slices, dank, deep pine, honeydew melons.",
            abv: 5.0,
            breweryId: 11,
            styleId: 2
        }

     ]}
     var data2 = {reviews: [
        {
            content: " Another beer from Houser, thank you, sir. Poured into a pint glass at 38 degrees. A white foamy and airy two finger head with okay retention. The head slowly dissipates and tats lacing on the glass. The color of the beer is SRM 4 a pale gold color. The clarity of the beer is hazy. The initial aroma is pine, grass, tropical, grapefruit and floral. Additional flavors are lightly toasted malt, resin, crackers, and yeast. The hops citrus flavors dominate the other lesser flavors of floral, pine, resin, and grass. Additional flavors in the beer are crackers, toasted malt, herbal, and a touch of phenols. The mouthfeel of the beer is astringent and murky. The body of the beer is medium, the carbonation is medium, and a medium finish. The beer leans towards a New England IPA, citrus dominate hops with supporting actors. Love the can art. I am glad I got to try this IPA.",
            rating: 4,
            userId: 3,
            productId: 17

        },
        {
            content: "Among the best jester king beers i have ever had, this is absolutely sensational. up there with atrial and the tempranillo one, just so amazing. it doesnt have a lot of head, and the carbonation is a bit light for what i look for in the style, but the flavor is positively next level. the strawberries are about as forward and natural here as i have ever known them to be in any beer, ripe, sweet, juicy, and really the essence of summer, with a funky and mature labic type beer underneath. the berries sweeten it up just enough, and the sourness accentuates the pulpy, seedy, perfectly ripe berry goodness, its on point! pink to almost unnatural red in color, very little head. sweet oak, light vanilla, lemons, red currant piquancy, floral funk, also very summery for brett, and as complex and awesome as can be, equal parts fruit and awesome beer in the flavor, and not too sour to drink a couple glasses of, at least for me. these guys do some of the most complete and special fruited wild beers anywhere in the world, and this is one of their very best in this impressive series. maybe the best strawberry beer i have ever had. after a couple of good but not mind bending jester king beers, this one was outrageously good! tons of strawberry and so natural too, wow!",
            rating: 5,
            userId: 3,
            productId: 16
        },
        {
            content: "Look: Dark red/purple with medium pink head that recedes quickly. Has medium carbonation. Smell: Jammy raspberries, lacto, Funk, and ice cream. Taste: Lightly tart, jammy raspberries, lacto, and funk. Mouthfeel: Medium. Overall: A great sour from Jester King.",
            rating: 4,
            userId: 1,
            productId: 15
        },
        {
            content: "Lovely pour to this as the beer had a wonderfully juicy appearance and hue to it with a near-perfect head to top it off. Not much lacing left behind though there were some scattered bubbles left on the side of my teku glass. A good amount of grass, orange juice, lemon, lime, and chalkiness were in the nose with all of those coming through in a wonderfully smooth manner in the taste. The oat malt and wheat gave this body as the lactose was a bit harder to pick out. This was probably due to the range of flavors found here as this was a bit too dank and juicy to let the sweetness fully emerge. Regardless, the carbonation was light to moderate but spot-on as there was plenty of bit and a crisp, bubbly aftertaste that kept this light and bright from start to finish. As usual, the amount of alcohol here was higher than I would have been led to believe, as it could only be felt via a mild warming by the time I polished this off. Though canned on 3/17 with 'MR. DAYDREAM' written on top it if, it held up well over the intervening 5 months. This was yet another example of how Other Half's nailing it right now, to the point where even yours truly was daydreaming in green!",
            rating: 4,
            userId: 1,
            productId: 14
        },
        {
            content: "Pours a cloudy orange with a one finger white head that left spots of lacing. Smells of over ripe tropical fruits, citrus fruits and a hint of malt. Tastes of delicious over ripe mangoes and pineapple, sweet orange, a sweet malt presence and a bit of grass. Medium bodied and carbonation, minimal bitterness, creamy mouth feel.",
            rating: 5,
            userId: 2,
            productId: 14
        },
        {
            content: "Sooo good but very hard to come by. Your best bet is to locate a store where the beer is sold, find out when they receive their delivery, and wait in the parking lot. Seriously. That said, this beer is the center of much hype and you can just as easily swing by a local pizza joint and order one.",
            rating: 3,
            userId: 4,
            productId: 1
        },
        {
            content: "I just recently 'converted' to IPA style beers. I found this one to be very palatable and enjoyed it out of the can and in a glass. It did not leave me with a bitter after-taste and definitely was worthwhile throughout. The color was as expected from an IPA and the taste was smooth and piney. I will look for it again, perhaps some day enjoying it from the tap.",
            rating: 4,
            userId: 3,
            productId: 1
        },
        {
            content: "It's great now that the Stowe brewery makes getting this alot easier than it used to be; only a six hour drive and I am restocked! The hunt was a lot of fun in the old days, I'll admit. I love IPAs and try different brewers efforts regularly, but find my self coming back to HT time and time again. It is truly the benchmark, both in the can and in an appropriate glass (also available at your local Heady retailer!).",
            rating: 5,
            userId: 5,
            productId: 1
        },
        {
            content: "What can be said about this standard setter that has not already be said? I happen to love it and consider it the Gold Standard in American style IPAs. Fellow hop heads will say its over-rated, no so great, etc. I call bullshit. Its an awesome beer when you can get your hands on some, and never let it age, the quality suffers quickly.",
            rating: 4,
            userId: 2,
            productId: 3
        },
        {
            content: "So. Wow. But not in a good way. Or a bad way. It's fine. It's good. Not great. Doesn't come close to Heady. Pours a clear light gold. No sticky lacing. Aroma is an even blend of pine and citrus. Taste is similar, nice and bitter, but no real juiciness to this. Feel is medium bodied with medium carbonation. My favorite part about this is the semi-dry finish. Overall, good, not great. Try it if you've been looking but definitely lower expectations.",
            rating: 5,
            userId: 3,
            productId: 3
        },
        {
            content: "Looks great, smells decent, and hits with intense lemon. Can’t properly call it a New England IPA (or what’s become known as such) - too rough + bitter, with not enough creamy body. It’s no juice bomb, either, but damn, is there some (mostly Citra) hop oil. This can came through channels to get to Ireland via the UK; its dates are all good but maybe I’d get more if I could vouch for the handling. ",
            rating: 5,
            userId: 3,
            productId: 2
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
            userId: 9,
            updatedAt: new Date()
        },
        {
            name: 'Wayne Lame',
            address: '123 Express Boulevard',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: 38.00,
            status: 'COMPLETED',
            userId: 10,
            updatedAt: '2018-01-11 18:10:21.394-05'
        },
        {

            name: 'Joey Davis',
            address: '123 Node Street',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total:  48.00,
            status: 'CANCELLED',
            userId: 11,
            updatedAt: '2018-01-12 18:10:21.394-05'
        },
        {

            name: 'Aud Hepburn',
            address: '123 Compiler Avenue',
            zipCode: '10000',
            city: 'Queens',
            state: 'NY',
            total: 100.00,
            status: 'PROCESSING',
            userId: 12,
            updatedAt: '2018-01-12 18:10:21.394-05'
        },
        {
            name: 'Taylor Jones',
            address: '123 React Lane',
            zipCode: '10000',
            city: 'Long Island',
            state: 'NY',
            total: 500.00,
            status: 'COMPLETED',
            userId: 13,
            updatedAt: '2018-01-13 18:10:21.394-05'
        },
        {

            name: 'Also Name',
            address: '123 Server Street',
            zipCode: '10000',
            city: 'Long Island',
            state: 'NY',
            total: 40.00,
            status: 'CREATED',
            userId: 14,
            updatedAt: '2018-01-14 18:10:21.394-05'
        },
        {
            name: 'This Is Name',
            address: '123 Server Lane',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: '150',
            status: 'CANCELLED',
            userId: 15,
            updatedAt: '2018-01-14 18:10:21.394-05'
        },
        {
            name: 'Another Name',
            address: '123 Server Lane',
            zipCode: '10000',
            city: 'New York',
            state: 'NY',
            total: 68.00,
            status: 'PROCESSING',
            userId: 16,
            updatedAt: '2018-01-15 18:10:21.394-05'
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

const User = require('./user')
const Order = require('./order')
const Reviews = require('./reviews')
const Product = require('./product')
const Brewery = require('./brewery')
const Style = require('./style')
const LineItem = require('./lineItem')


Reviews.belongsTo(User)
Product.hasMany(Reviews)
Reviews.belongsTo(Product)
User.hasMany(Reviews)
Order.belongsTo(User)
User.hasMany(Order)
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
Product.belongsTo(Brewery)
Product.belongsTo(Style)
Brewery.hasMany(Product)
Style.hasMany(Product)
LineItem.belongsTo(Order)
LineItem.belongsTo(Product)
Product.hasMany(LineItem)
Order.hasMany(LineItem)

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  Reviews,
  Order,
  User,
  Product,
  Brewery,
  Style,
  LineItem
}

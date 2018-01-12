const User = require('./user')
const Order = require('./order')
const Reviews = require('./reviews')
const Product = require('./product')
const Brewery = require('./brewery')
const Style = require('./style')
const LineItem = require('./lineItem')


Reviews.belongsTo(User)
User.hasMany(Reviews)

Reviews.belongsTo(Product)
Product.hasMany(Reviews)

Order.belongsTo(User)
User.hasMany(Order)

Product.belongsTo(Brewery)
Brewery.hasMany(Product)

Product.belongsTo(Style)
Style.hasMany(Product)

LineItem.belongsTo(Order)
Order.hasMany(LineItem)

LineItem.belongsTo(Product)
Product.hasMany(LineItem)


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

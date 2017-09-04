module.exports = function (api) {
  // const GroceryItem = api.db.models['grocery-item'];
  const CartItem = api.db.models['cart-item'];
  const GroceryItem = api.db.models['grocery-item'];

  return function (req, res) {
    // let queryOptions = prepareQuery(req.query || {});
    
    return CartItem.findAll({ include: [{model: GroceryItem, as: 'groceryItem'}] })
      .then((results) => {
        let plainResults = results.map((x) => x.get({plain: true}))
        res.json({data: plainResults});
        return plainResults;
      })
      .catch((err) => {
        res.json({ error: `Problem fetching data: ${err}` });
      });
  }
}
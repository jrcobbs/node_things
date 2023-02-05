// // GET /products/all
test('when user wants all products', () => {
    const res = require("../resources/products-all.json");
    expect(res.length).toBe(6);
  });

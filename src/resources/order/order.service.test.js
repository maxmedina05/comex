const { computeTotalPrice } = require('./order.service');

test('compute order total price', () => {
	const items = [
		{
			qty: 2,
			discount: 0,
			unitPrice: 100
		},
		{
			qty: 3,
			discount: 0,
			unitPrice: 80
		},
		{
			qty: 5,
			discount: 0,
			unitPrice: 25
		}
	];

	expect(computeTotalPrice(items)).toBe(565);
});

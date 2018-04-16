module.exports = {
	computeTotalPrice: items => {
		let total = 0;
		for (const item of items) {
			total += Math.abs(item.unitPrice - item.discount) * item.quantity;
		}
		return total;
	}
};

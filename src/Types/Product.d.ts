class Product {
	public id: number;
	public price: number;
	public name: string;
	public imageUrl: string;
	public disabled: boolean;
	public ratingSum: number;
	public ratingCount: number;
	public rating: number;
	public description: string;
	public category: string[];

	constructor(
		id: number = 0,
		price: number = 0,
		name: string = "",
		imageUrl: string = "",
		disabled: boolean = false,
		rating: number = 0,
		description: string = "",
		category: string = ""
	) {
		this.id = id;
		this.price = price;
		this.name = name;
		this.imageUrl = imageUrl;
		this.disabled = disabled;
		this.description = description;
		this.category = category;
		this.rating = rating;
	}
}

// [
//     {
//         "id": 1,
//         "name": "Reusable Bamboo Cutlery Set",
//         "description": "An eco-friendly cutlery set made from 100% natural bamboo. Perfect for on-the-go meals.",
//         "price": 12.99,
//         "image": "https://example.com/images/bamboo-cutlery.jpg",
//         "category": "Kitchenware"
//     },
//     {
//         "id": 2,
//         "name": "Organic Cotton Tote Bag",
//         "description": "A durable and stylish tote bag made from organic cotton. Ideal for shopping or everyday use.",
//         "price": 15.00,
//         "image": "https://example.com/images/cotton-tote.jpg",
//         "category": "Bags"
//     },
//     {
//         "id": 3,
//         "name": "Biodegradable Phone Case",
//         "description": "A protective phone case made from biodegradable materials, designed to reduce plastic waste.",
//         "price": 24.99,
//         "image": "https://example.com/images/biodegradable-case.jpg",
//         "category": "Electronics"
//     },
//     {
//         "id": 4,
//         "name": "Recycled Paper Notebook",
//         "description": "A notebook made from 100% recycled paper, perfect for jotting down notes and ideas.",
//         "price": 9.99,
//         "image": "https://example.com/images/recycled-notebook.jpg",
//         "category": "Stationery"
//     },
//     {
//         "id": 5,
//         "name": "Natural Soy Candle",
//         "description": "Hand-poured natural soy candle with essential oils, providing a clean and eco-friendly burn.",
//         "price": 18.50,
//         "image": "https://example.com/images/soy-candle.jpg",
//         "category": "Home Decor"
//     },
//     {
//         "id": 6,
//         "name": "Stainless Steel Straws Set",
//         "description": "Set of reusable stainless steel straws with a cleaning brush, perfect for reducing plastic waste.",
//         "price": 10.00,
//         "image": "https://example.com/images/stainless-straws.jpg",
//         "category": "Kitchenware"
//     },
//     {
//         "id": 7,
//         "name": "Organic Herbal Tea Sampler",
//         "description": "A selection of organic herbal teas, ethically sourced and packed in eco-friendly packaging.",
//         "price": 15.99,
//         "image": "https://example.com/images/herbal-tea.jpg",
//         "category": "Food & Beverage"
//     },
//     {
//         "id": 8,
//         "name": "Eco-Friendly Cleaning Spray",
//         "description": "A natural cleaning spray made from plant-based ingredients, safe for you and the environment.",
//         "price": 14.99,
//         "image": "https://example.com/images/cleaning-spray.jpg",
//         "category": "Home Care"
//     }
// ]

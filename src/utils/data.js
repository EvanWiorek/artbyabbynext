const data = {
  products: [
    {
      name: 'Tie Blanket',
      slug: 'tie-blanket',
      images: ['/static/images/product-images/tie-blanket1.jpg', '/static/images/product-images/tie-blanket2.jpg'],
      price: {
        Small: 15,
        Medium: 20,
        Large: 25
      },
      countInStock: 20,
      options: ['Red', 'Blue', 'Pink', 'Yellow'],
      description: 'This is a handmade tie blanket! It comes in three sizes (small, medium, and large) and from a choice of four colors(red, blue, pink, and yellow).'
    },
    {
      name: 'Fireflies Painting',
      slug: 'fireflies-painting',
      images: ['/static/images/product-images/painting1.jpg', '/static/images/product-images/painting2.jpg'],
      price: {
        price: 120
      },
      countInStock: 20,
      options: [],
      description: 'This is a handmade painting made by me!'
    },
  ],
}

export default data;
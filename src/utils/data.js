const data = {
  products: [
    {
      name: 'Tie Blanket',
      images: ['/static/images/product-images/tie-blanket1.jpg', '/static/images/product-images/tie-blanket2.jpg'],
      description: 'This is a handmade tie blanket! It comes in three sizes (small, medium, and large) and from a choice of four colors(red, blue, pink, and yellow).',
      slug: 'tie-blanket',
      category: 'Blankets',
      //need to remove below, this was for toast testing
      countInStock: 5,
      additionalOptions: ['Red', 'Green', 'Blue', 'Yellow'],
      priceOptions: [
        {
          optionName: 'Small',
          images: ['/static/images/product-images/small.png'],
          price: 15,
          countInStock: 20,
          description: 'This is a small size tie blanket.'
        },
        {
          optionName: 'Medium',
          images: ['/static/images/product-images/medium.png'],
          price: 20,
          countInStock: 20,
          description: 'This is a medium size tie blanket.'
        },
        {
          optionName: 'Large',
          images: ['/static/images/product-images/large.png'],
          price: 25,
          countInStock: 20,
          description: 'This is a large size tie blanket.'
        },
      ]
    },
    {
      name: 'Fireflies Painting',
      category: 'Paintings',
      images: ['/static/images/product-images/painting1.jpg', '/static/images/product-images/painting2.jpg'],
      slug: 'fireflies-painting',
      priceOptions: [

      ],
      countInStock: 20,
      additionalOptions: [],
      description: 'This is a handmade painting made by me!'
    },
  ],
}

export default data;
const data = {
  products: [
    {
      name: 'Tie Blanket',
      images: ['/static/images/product-images/tie-blanket1.jpg', '/static/images/product-images/tie-blanket2.jpg'],
      description: 'This is a handmade tie blanket! It comes in three sizes (small, medium, and large) and from a choice of four colors(red, blue, pink, and yellow).',
      slug: 'tie-blanket',
      category: 'Blankets',
      countInStock: 5,
      additionalOptions: [
        {
          optionName: 'Red',
          optionType: 'Color',
          images: ['/static/images/product-images/red.png'],
        },
        {
          optionName: 'Blue',
          optionType: 'Color',
          images: ['/static/images/product-images/blue.png'],
        },
        {
          optionName: 'Pink',
          optionType: 'Color',
          images: ['/static/images/product-images/pink.png'],
        },
        {
          optionName: 'Yellow',
          optionType: 'Color',
          images: ['/static/images/product-images/yellow.png'],
        },
      ],
      priceOptions: [
        {
          optionName: 'Small',
          optionType: 'Size',
          images: ['/static/images/product-images/small.png'],
          price: 15,
          description: 'This is a small size tie blanket.'
        },
        {
          optionName: 'Medium',
          optionType: 'Size',
          images: ['/static/images/product-images/medium.png'],
          price: 20,
          description: 'This is a medium size tie blanket.'
        },
        {
          optionName: 'Large',
          optionType: 'Size',
          images: ['/static/images/product-images/large.png'],
          price: 25,
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
        {
          optionName: 'ONE_OPTION',
          price: 120,
        }
      ],
      countInStock: 1,
      additionalOptions: [],
      description: 'This is a handmade painting made by me!'
    },
    {
      name: 'Chain Necklace',
      images: ['/static/images/product-images/necklace1.webp', '/static/images/product-images/necklace2.webp', '/static/images/product-images/necklace3.webp'],
      description: 'Beautiful chain necklace that comes in various sizes.',
      slug: 'chain-necklace',
      category: 'Jewelry',
      countInStock: 5,
      additionalOptions: [],
      priceOptions: [
        {
          optionName: '20"',
          optionType: 'Length',
          images: [],
          price: 104,
          description: ''
        },
        {
          optionName: '22"',
          optionType: 'Length',
          images: [],
          price: 109,
          description: ''
        },
        {
          optionName: '24"',
          optionType: 'Length',
          images: [],
          price: 114,
          description: ''
        },
        {
          optionName: '26"',
          optionType: 'Length',
          images: [],
          price: 119,
          description: ''
        },
      ]
    },
    {
      name: 'Stickers',
      images: ['/static/images/product-images/stickers.jpg', '/static/images/product-images/stickers2.png'],
      description: 'Select from a variety of stickers!',
      slug: 'stickers',
      category: 'Stickers',
      countInStock: 100,
      additionalOptions: [
        {
          optionName: 'Blue',
          optionType: 'Option',
          images: ['/static/images/product-images/stickers.jpg'],
        },
        {
          optionName: 'Purple',
          optionType: 'Option',
          images: ['/static/images/product-images/stickers3.jpg'],
        },
        {
          optionName: 'Pink',
          optionType: 'Option',
          images: ['/static/images/product-images/stickers4.jpg'],
        },
        {
          optionName: 'White',
          optionType: 'Option',
          images: ['/static/images/product-images/stickers5.jpg'],
        },
        {
          optionName: 'Rose',
          optionType: 'Option',
          images: ['/static/images/product-images/stickers6.jpg'],
        },
      ],
      priceOptions: [
        {
          optionName: 'ONE_OPTION',
          price: 2.50,
        }
      ]
    },
  ],
}

export default data;
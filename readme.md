# Product Management API

This API allows you to manage products in a system. You can create, retrieve, update, and delete products.

## API Endpoints

### Create a New Product
- **Endpoint:** `POST /api/product`
- **Description:** Create a new product with the details specified in the request body.
- **Request Body:**
  ```json
  {
    "name": "Sample Product",
    "price": 49.99,
    "description": "This is a sample product description.",
    "category": "Sample Category",
    "image": "https://placehold.co/600x600?text=Sample+Product"
  }
  ```

### Create New Products
- **Endpoint:** `POST /api/products`
- **Description:** Create multiple products with the details specified in the request body.
- **Request Body:**
  ```json
  [
    {
      "name": "Sample Product 1",
      "price": 29.99,
      "description": "This is a sample product description for product 1.",
      "category": "Sample Category 1",
      "image": "https://placehold.co/600x600?text=Sample+Product+1"
    },
    {
      "name": "Sample Product 2",
      "price": 49.99,
      "description": "This is a sample product description for product 2.",
      "category": "Sample Category 2",
      "image": "https://placehold.co/600x600?text=Sample+Product+2"
    }
  ]
  ```

### Retrieve All Products
- **Endpoint:** `GET /api/products`
- **Description:** Fetch all the products available in the system.

### Retrieve a Specific Product by ID
- **Endpoint:** `GET /api/product/:id`
- **Description:** Retrieve a product by its unique ID.

### Delete a Product by ID
- **Endpoint:** `DELETE /api/product/:id`
- **Description:** Delete a product by its unique ID.

### Replace a Product by ID
- **Endpoint:** `PUT /api/product/:id`
- **Description:** Replace a product's details by its unique ID.
- **Request Body:**
  ```json
  {
    "name": "Updated Product",
    "price": 59.99,
    "description": "This is an updated product description.",
    "category": "Updated Category",
    "image": "https://placehold.co/600x600?text=Updated+Product"
  }
  ```

### Update a Product by ID
- **Endpoint:** `PATCH /api/product/:id`
- **Description:** Update specific fields of a product by its unique ID.

## Error Handling
All endpoints return appropriate HTTP status codes and error messages in case of failure.

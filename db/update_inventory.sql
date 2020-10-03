UPDATE products
SET name = $2,
price = $3,
image = $4
WHERE product_id = $1;
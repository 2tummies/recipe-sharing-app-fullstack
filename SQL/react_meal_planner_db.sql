DROP TABLE IF EXISTS user_recipe_list;
DROP TABLE IF EXISTS recipe_ingredient;
DROP TABLE IF EXISTS recipe_cooking_method;
DROP TABLE IF EXISTS recipe_additional_tools;
DROP TABLE IF EXISTS recipe_recipe_tags;
DROP TABLE IF EXISTS cooking_methods;
DROP TABLE IF EXISTS measurement_units;
DROP TABLE IF EXISTS additional_tools;
DROP TABLE IF EXISTS ingredients;
DROP TABLE IF EXISTS recipes;
DROP TABLE IF EXISTS recipe_tags;
DROP TABLE IF EXISTS ingredient_components;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(30) UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        date_joined DATE NOT NULL,
        birthday DATE,
        is_active BOOLEAN NOT NULL,
        is_staff BOOLEAN NOT NULL,
        is_superuser BOOLEAN NOT NULL,
        last_login TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS cooking_methods(
        cooking_method_id SERIAL PRIMARY KEY,
        cooking_method_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS additional_tools(
        additional_tool_id SERIAL PRIMARY KEY,
        additional_tool_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS measurement_units(
        measurement_unit_id SERIAL PRIMARY KEY,
        measurement_unit_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS ingredients(
        ingredient_id SERIAL PRIMARY KEY,
        ingredient_name TEXT UNIQUE NOT NULL,
        ingredient_caloric_value NUMERIC
);

CREATE TABLE IF NOT EXISTS ingredient_components(
        ingredient_component_id NUMERIC PRIMARY KEY,
        ingredient_component_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipe_tags(
        recipe_tag_id SERIAL PRIMARY KEY,
        recipe_tag_name TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS recipes(
        recipe_id SERIAL PRIMARY KEY,
        recipe_name VARCHAR(100) UNIQUE NOT NULL,
        recipe_description VARCHAR (500),
        recipe_cook_time SMALLINT,
        recipe_prep_time SMALLINT,
        recipe_instructions VARCHAR(150)[15] NOT NULL,
        is_shared BOOLEAN
);

CREATE TABLE IF NOT EXISTS user_recipe_list(
        user_id INT REFERENCES users,
        recipe_id INT REFERENCES recipes,
        
        PRIMARY KEY (user_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS recipe_ingredient(
        recipe_id INT REFERENCES recipes,
        ingredient_id INT REFERENCES ingredients,
        measurement_unit_id SMALLINT REFERENCES measurement_units,
        measurement_quantity DECIMAL NOT NULL,

        PRIMARY KEY (recipe_id, ingredient_id, measurement_unit) 
);

CREATE TABLE IF NOT EXISTS recipe_cooking_method(
        recipe_id INT REFERENCES recipes,
        cooking_method_id INT REFERENCES cooking_methods,
        cooking_method_quantity SMALLINT,

        PRIMARY KEY (recipe_id, cooking_method_id)
);

CREATE TABLE IF NOT EXISTS recipe_additional_tools(
        recipe_id INT REFERENCES recipes,
        additional_tool_id INT REFERENCES additional_tools,
        additional_tool_quantity SMALLINT,

        PRIMARY KEY (recipe_id, additional_tool_id)
);

CREATE TABLE IF NOT EXISTS recipe_recipe_tags(
        recipe_id INT REFERENCES recipes,
        recipe_tag_id INT REFERENCES recipe_tags,

        PRIMARY KEY (recipe_id, recipe_tag_id)
);

INSERT INTO cooking_methods (cooking_method_id, cooking_method_name)
VALUES
(DEFAULT, 'Oven'),
(DEFAULT, 'Microwave'),
(DEFAULT, 'Air Fryer'),
(DEFAULT, 'Griddle'),
(DEFAULT, 'Cast-Iron'),
(DEFAULT, 'Skillet'),
(DEFAULT, 'Crock Pot'),
(DEFAULT, 'Dutch Oven'),
(DEFAULT, 'Deep Fryer'),
(DEFAULT, 'No Heating Required')
;

INSERT INTO additional_tools (additional_tool_id, additional_tool_name)
VALUES
(DEFAULT, 'Rolling Pin'),
(DEFAULT, 'Whisk'),
(DEFAULT, 'Hand Mixer'),
(DEFAULT, 'Stand Mixer'),
(DEFAULT, 'Mixing Bowl (L)'),
(DEFAULT, 'Mixing Bowl (M)'),
(DEFAULT, 'Mixing Bowl (S)'),
(DEFAULT, 'Baking Sheet'),
(DEFAULT, 'Wax Paper'),
(DEFAULT, 'Aluminum Foil'),
(DEFAULT, 'Sieve'),
(DEFAULT, 'Colander'),
(DEFAULT, 'Rubber Spatula'),
(DEFAULT, 'Knife')
;

INSERT INTO measurement_units (measurement_unit_id, measurement_unit_name)
VALUES
(DEFAULT, 'Oz'),
(DEFAULT, 'Fl Oz'),
(DEFAULT, 'Lbs'),
(DEFAULT, 'Cup(s)'),
(DEFAULT, 'Quart(s)'),
(DEFAULT, 'Gallon(s)'),
(DEFAULT, 'Tbsp'),
(DEFAULT, 'Tsp')
;

INSERT INTO recipe_tags (recipe_tag_id, recipe_tag_name)
VALUES
(DEFAULT, 'Breakfast'),
(DEFAULT, 'Second Breakfast'),
(DEFAULT, 'Elevensies'),
(DEFAULT, 'Tea Time'),
(DEFAULT, 'Brunch'),
(DEFAULT, 'Lunch'),
(DEFAULT, 'Dinner'),
(DEFAULT, 'Dessert'),
(DEFAULT, 'Sweet'),
(DEFAULT, 'Savory'),
(DEFAULT, 'Gluten-Free'),
(DEFAULT, 'Low Fat')
;
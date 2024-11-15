SELECT * FROM ingredients;
SELECT ingredient_name, ingredient_caloric_value FROM ingredients;

INSERT INTO ingredients (ingredient_id, ingredient_name, ingredient_caloric_value) VALUES (DEFAULT, 'Hummus, commercial', 229);

SELECT * FROM additional_tools;

SELECT * FROM measurement_units;

SELECT * FROM cooking_methods;

SELECT * FROM recipe_tags;

SELECT * FROM recipes;

INSERT INTO recipes (recipe_id, recipe_name, recipe_description, recipe_cook_time, recipe_prep_time, recipe_instructions)
VALUES (DEFAULT, 'name', 'desc', 10, 10, ARRAY['step 1', 'step 2']);

INSERT INTO 
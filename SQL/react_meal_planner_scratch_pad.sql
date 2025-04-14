INSERT INTO measurement_units
VALUES
(DEFAULT, 'Each'),
(DEFAULT, 'Whole')
;

INSERT INTO measurement_units
VALUES
(DEFAULT, 'Butter Knife'),
(DEFAULT, 'Knife')
;

SELECT * FROM ingredients;
SELECT ingredient_name, ingredient_caloric_value FROM ingredients;

INSERT INTO ingredients (ingredient_id, ingredient_name, ingredient_caloric_value) VALUES (DEFAULT, 'Hummus, commercial', 229);

SELECT * FROM additional_tools;

SELECT * FROM measurement_units;

SELECT * FROM cooking_methods;

SELECT * FROM recipe_tags;

SELECT * FROM recipes;
UPDATE recipes
SET recipe_prep_time = 0;

SELECT recipe_instructions FROM recipes;

SELECT * FROM recipe_ingredient;

SELECT * FROM recipe_cooking_method;

SELECT * FROM recipe_additional_tools;

SELECT * FROM recipe_recipe_tags;

INSERT INTO recipes (recipe_id, recipe_name, recipe_description, recipe_cook_time, recipe_prep_time, recipe_instructions)
VALUES (DEFAULT, 'name', 'desc', 10, 10, ARRAY['step 1', 'step 2']);

INSERT INTO recipe_ingredient (recipe_pk, ingredient_pk, measurement_unit, measurement_quantity)
VALUES
(2, 1, 1, 10),
(2, 2, 3, 5),
(2, 3, 4, 7);

INSERT INTO recipe_additional_tools (recipe_id, additional_tool_id, additional_tool_quantity)
VALUES
(2, 1, 1),
(2, 2, 1);

INSERT INTO recipe_cooking_method (recipe_id, cooking_method_id, cooking_method_quantity)
VALUES
(2, 1, 1),
(2, 2, 1);

INSERT INTO recipe_recipe_tags(recipe_id, recipe_tag_id) 
VALUES
(2, 1),
(2, 2);

INSERT INTO users(user_id, username, date_created, birthday)
VALUES
(DEFAULT, 'username1', '2025-04-14', '1995-01-28')
(DEFAULT, 'username2', '2025-04-14', '1995-01-28');

SELECT * FROM users;

SELECT EXISTS (
        SELECT username FROM users WHERE username='username3'
);

SELECT user_id FROM users WHERE username = 'username3';

SELECT EXISTS (
        SELECT username FROM users WHERE username = 'username' AND password_hash = 'password hash'
);
const prefix = 'use_create_recipe_fields'

export default function useCreateRecipeFields ({form: {control}}) {
    const fields = {
        recipeTitle : {
            name : `${prefix}-recipeTitle`,
            id : `${prefix}_recipe_title`,
            defaultValue : 'Recipe Title',
            type : 'text',
            rules: {
                required : true,
            },
            control
        },
        recipeDescription : {
            name : `${prefix}-recipeDescription`,
            id : `${prefix}_recipe_description`,
            defaultValue : 'Recipe Description',
            type : 'text',
            rules: {
            },
            control
        },
        recipeIngredients : {
            name : `${prefix}-recipeIngredients`,
            id : `${prefix}_recipe_ingredients`,
            defaultValue : '',
            type : 'select',
            options : [
                {value : 'Test1', label : 'Test1'},
                {value : 'Test2', label : 'Test2'}
            ],
            rules : {
                required : true,
            },
            control
        },
        recipeCookingMethod : {
            name : `${prefix}-recipeCookingMethod`,
            id : `${prefix}_recipe_cooking_method`,
            defaultValue : '',
            type : 'select',
            options : [
                {value : 'Test1', label : 'Test1'},
                {value : 'Test2', label : 'Test2'}
            ],
            rules : {
                required : true,
            },
            control
        },
        recipeAdditionalTools : {
            name : `${prefix}-recipeAdditionalTools`,
            id : `${prefix}_recipe_additional_tools`,
            defaultValue : '',
            type : 'select',
            options : [
                {value : 'Test1', label : 'Test1'},
                {value : 'Test2', label : 'Test2'}
            ],
            rules : {
                required : true,
            },
            control
        },
        recipePrepTime : {
            name : `${prefix}-recipeTitle`,
            id : `${prefix}_recipe_title`,
            defaultValue : 'Recipe Title',
            type : 'text',
            rules: {
                required : true,
            },
            control
        },
        recipeCookTime : {
            recipeTitle : {
                name : `${prefix}-recipeTitle`,
                id : `${prefix}_recipe_title`,
                defaultValue : 'Recipe Title',
                type : 'text',
                rules: {
                    required : true,
                },
                control
            },
        }
    }

    return fields
}
from django.urls import path
from . import views

urlpatterns = [
    path('ingredients/', views.IngredientListCreate.as_view(), name='ingredients-list'),
    path('additional_tools/', views.AdditionalToolsListCreate.as_view(), name='additional-tools-list'),
    path('measurement_units/', views.MeasurementUnitsListCreate.as_view(), name='measurement-units-list'),
    path('recipe_tags/', views.RecipeTagsListCreate.as_view(), name='recipe-tags'),
    path('cooking_methods/', views.CookingMethodListCreate.as_view(), name='cooking-methods'),
    path('recipes/', views.Recipes.as_view(), name='shared-recipes-list'),
    path('recipes/<int:recipe_id>/', views.RecipesById.as_view(), name='shared-recipe-by-id'),
    path('user/<int:user_id>/recipes/', views.UserRecipeList.as_view(), name='edit-saved-recipes')
]

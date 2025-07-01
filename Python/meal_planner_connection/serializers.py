from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields= ['id', 'username']
    
class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['ingredient_id', 'ingredient_name', 'ingredient_caloric_value']

class AdditionalToolsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdditionalTools
        fields = ['additional_tool_id', 'additional_tool_name']

class CookingMethodsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CookingMethods
        fields = ['cooking_method_id', 'cooking_method_name']

class MeasurementUnitsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MeasurementUnits
        fields = ['measurement_unit_id', 'measurement_unit_name']

class RecipeTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeTags
        fields = ['recipe_tag_id', 'recipe_tag_name']

class RecipesSerializer(serializers.ModelSerializer):
   class Meta:
       model = Recipes
       fields = ['recipe_id', 'recipe_name', 'recipe_description', 'recipe_cook_time', 'recipe_prep_time', 'recipe_instructions', 'recipe_ingredients', 'recipe_additional_tools', 'recipe_cooking_methods', 'recipe_tags']
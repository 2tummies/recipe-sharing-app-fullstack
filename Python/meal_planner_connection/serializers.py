from django.contrib.auth.models import User
from rest_framework import serializers

from .models import *

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields= ['user_id', 'username', 'password', 'date_joined', 'birthday', 'is_active', 'is_staff', 'is_superuser', 'last_login']
        read_only_fields = ['user_id', 'date_joined']
    
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
        model = MeasurementUnit
        fields = ['measurement_unit_id', 'measurement_unit_name']

class RecipeTagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeTags
        fields = ['recipe_tag_id', 'recipe_tag_name']

class BaseRecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseRecipe
        fields = ['recipe_id', 'recipe_name', 'recipe_description', 'recipe_cook_time', 'recipe_prep_time', 'recipe_instructions', 'author_id']

class DetailedRecipeSerializer(serializers.ModelSerializer):
   class Meta:
       model = DetailedRecipe
       fields = ['recipe_id', 'recipe_name', 'recipe_description', 'recipe_cook_time', 'recipe_prep_time', 'recipe_instructions', 'author_id', 'recipe_ingredients', 'recipe_additional_tools', 'recipe_cooking_methods', 'recipe_tags']

# TODO: Add serializer for comprehensive list of recipes by user

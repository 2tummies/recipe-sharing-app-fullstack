from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .ingredients import ingredients_sql
from .additional_tools import additional_tools_sql
from .cooking_methods import cooking_methods_sql
from .measurement_units import measurement_units_sql
from .recipe_tags import recipe_tags_sql
from .recipes import recipes_sql

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
        model = Recipe
        fields = ['recipe_id', 'recipe_name', 'recipe_description', 'recipe_cook_time', 'recipe_prep_time', 'recipe_instructions', 'author_id']

class DetailedRecipeSerializer(BaseRecipeSerializer):
    recipe_ingredients = serializers.SerializerMethodField()
    recipe_additional_tools = serializers.SerializerMethodField()
    recipe_tags= serializers.SerializerMethodField()
    recipe_cooking_methods= serializers.SerializerMethodField()

    def get_recipe_ingredients(self, obj):
        return ingredients_sql.get_ingredients_for_recipe(obj.recipe_id)

    def get_recipe_additional_tools(self, obj):
        return additional_tools_sql.get_additional_tools_for_recipe(obj.recipe_id)

    def get_recipe_tags(self, obj):
        return recipe_tags_sql.get_recipe_tags_for_recipe(obj.recipe_id)

    def get_recipe_cooking_methods(self, obj):
        return cooking_methods_sql.get_cooking_methods_for_recipe(obj.recipe_id)

class RecipeIngredientInputSerializer(serializers.Serializer):
    ingredient_id = serializers.IntegerField()
    measurement_unit_id = serializers.IntegerField()
    measurement_quantity = serializers.DecimalField(max_digits=10, decimal_places=2)

class RecipeAdditionalToolInputSerializer(serializers.Serializer):
    additional_tool_id = serializers.IntegerField()
    additional_tool_quantity = serializers.IntegerField()

class RecipeCookingMethodInputSerializer(serializers.Serializer):
    cooking_method_id= serializers.IntegerField()
    cooking_method_quantity = serializers.IntegerField()

class RecipeTagInputSerializer(serializers.Serializer):
    recipe_tag_id = serializers.IntegerField()

class CreateRecipeSerializer(serializers.ModelSerializer):
    recipe_ingredients = RecipeIngredientInputSerializer(
        many=True,
        write_only=True
    )
    recipe_additional_tools = RecipeAdditionalToolInputSerializer(
        many=True,
        required=False,
        write_only=True
    )
    recipe_cooking_methods = RecipeCookingMethodInputSerializer(
        many=True,
        required=False,
        write_only=True
    )
    recipe_tags = RecipeTagInputSerializer(
        many=True,
        required=False,
        write_only=True
    )

    class Meta:
        model = Recipe
        fields = [
            'recipe_name',
            'recipe_description',
            'recipe_cook_time',
            'recipe_prep_time',
            'recipe_instructions',
            'author_id',
            'recipe_ingredients',
            'recipe_additional_tools',
            'recipe_cooking_methods',
            'recipe_tags',
        ]

    def create(self, validated_data):
        recipe_id = recipes_sql.add_new_recipe(validated_data)
        return {'recipe_id' : recipe_id}

# Overrides
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['user_id'] = user.pk
        token['username'] = user.username
        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data['user_id'] = self.user.pk
        data['username'] = self.user.username
        return data
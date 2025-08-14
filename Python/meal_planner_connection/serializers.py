from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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

class BaseRecipeSerializer(serializers.Serializer):
    class Meta:
        model = BaseRecipe
        fields = ['recipe_id', 'recipe_name', 'recipe_description', 'recipe_cook_time', 'recipe_prep_time', 'recipe_instructions', 'author_username']

class DetailedRecipeSerializer(BaseRecipeSerializer):
    recipe_ingredients = serializers.SerializerMethodField()
    recipe_additional_tools = serializers.SerializerMethodField()
    recipe_tags= serializers.SerializerMethodField()
    recipe_cooking_methods= serializers.SerializerMethodField()

    class Meta(BaseRecipeSerializer.Meta):
        model = DetailedRecipe
        fields = BaseRecipeSerializer.Meta.fields + [
            'recipe_ingredients',
            'recipe_additional_tools',
            'recipe_tags',
            'recipe_cooking_methods'
        ]

# TODO: Add serializer for comprehensive list of recipes by user

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
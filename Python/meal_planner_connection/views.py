from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import *
from .ingredients import ingredients_sql
from .additional_tools import additional_tools_sql
from .cooking_methods import cooking_methods_sql
from .measurement_units import measurement_units_sql
from .recipe_tags import recipe_tags_sql
from .recipes import recipes_sql

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def create_user(self, request):
        

class LoginUserView():
    serializer_class = UserSerializer

    def validate_login(self, request):
        return

class IngredientListCreate(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    # TODO: add in when authentication is active
    # permission_classes = [IsAuthenticated]

    def get(self, request):
        return ingredients_sql.get_ingredients_list()

class AdditionalToolsListCreate(generics.ListCreateAPIView):
    serializer_class = AdditionalToolsSerializer

    def get(self, request):
        return additional_tools_sql.get_all_additional_tools()
    
class MeasurementUnitsListCreate(generics.ListCreateAPIView):
    serializer_class = MeasurementUnitsSerializer

    def get(self, request):
        return measurement_units_sql.get_all_measurement_units()
    
class RecipeTagsListCreate(generics.ListCreateAPIView):
    serializer_class = RecipeTagsSerializer

    def get(self, request):
        return recipe_tags_sql.get_all_recipe_tags()
    
class CookingMethodListCreate(generics.ListCreateAPIView):
    serializer_class = CookingMethodsSerializer

    def get(self, request):
        return cooking_methods_sql.get_all_cooking_methods()
    
class SharedRecipesListCreate(generics.ListCreateAPIView):
    serializer_class = RecipesSerializer

    def get(self, request):
        return recipes_sql.get_shared_recipes_list()

class GetSharedRecipeById(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        return recipes_sql.get_shared_recipe_by_id(recipe_id)
    
class AddNewRecipe(generics.ListCreateAPIView):
    serializer_class = RecipesSerializer

    def post(self, request):
        try:
            print(request.data)
            recipes_sql.add_new_recipe(request.data)
            return Response({"message":"Recipe created successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"message":"Error creating recipe: " + e}, status=status.HTTP_400_BAD_REQUEST)
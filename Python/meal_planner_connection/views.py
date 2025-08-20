from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login, get_user_model

from .serializers import *
from .ingredients import ingredients_sql
from .additional_tools import additional_tools_sql
from .cooking_methods import cooking_methods_sql
from .measurement_units import measurement_units_sql
from .recipe_tags import recipe_tags_sql
from .recipes import recipes_sql

User = get_user_model()

class CreateUserView(APIView):
    serializer_class = UserSerializer
    permission_classes = [ AllowAny ]

    def post(self, request):
        try:
            username = request.data.get('username')
            data = {
                'username': username,
                'password': request.data.get('password'),
            }
            if birthday := request.data.get('birthday'):
                data['birthday'] = birthday
            if User.objects.filter(username=username).exists():
                return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
            user = User.objects.create_user(**data)
            refresh = RefreshToken.for_user(user)
            return Response({
                'user_id': user.pk,
                'username': user.username,
                'access': str(refresh.access_token),
                'refresh': str(refresh)
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message': f'Error creating user: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class LoginUserView(APIView):
    serializer_class = UserSerializer
    permission_classes = [ AllowAny ]

    def post(self, request):
        try:
            username = request.data.get('username')
            password = request.data.get('password')
            if not username or not password:
                return Response({'message': 'add credentials'})      
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return Response({'user_id': user.pk, 'username': user.username})
            else:
                return Response({'error':'invalid credentials'})
        except Exception as e:
            return Response({'message':f'Error logging in: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class IngredientListCreate(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer

    def get(self, request):
        return ingredients_sql.get_ingredients_list()

class AdditionalToolsListCreate(generics.ListCreateAPIView):
    serializer_class = AdditionalToolsSerializer
    permission_classes = [ AllowAny ]

    def get(self, request):
        return additional_tools_sql.get_all_additional_tools()
    
class MeasurementUnitsListCreate(generics.ListCreateAPIView):
    serializer_class = MeasurementUnitsSerializer
    permission_classes = [ AllowAny ]

    def get(self, request):
        return measurement_units_sql.get_all_measurement_units()
    
class RecipeTagsListCreate(generics.ListCreateAPIView):
    serializer_class = RecipeTagsSerializer
    permission_classes = [ AllowAny ]

    def get(self, request):
        return recipe_tags_sql.get_all_recipe_tags()
    
class CookingMethodListCreate(generics.ListCreateAPIView):
    serializer_class = CookingMethodsSerializer
    permission_classes = [ AllowAny ]

    def get(self, request):
        return cooking_methods_sql.get_all_cooking_methods()
    
class SharedRecipes(generics.ListCreateAPIView):
    serializer_class = BaseRecipeSerializer

    def get(self, request):
        data = recipes_sql.get_shared_recipes_list()
        # TODO: change get_shared_recipes to filtered ones
        # filter = request.query_params.get('filter')
        # if filter == 'basic':
            # data = recipes_sql.basic_shared_recipes_list()
        # elif filter == 'advanced':
            # data = recipes_sql.advanced_shared_recipes_list()
        return Response(data)
    
    def post(self, request):
        try:
            if not request.user.is_authenticated:
                raise
            serializer = CreateRecipeSerializer(data=request.data)
            if serializer.is_valid():
                recipe = serializer.save()
                return Response({'recipe_id': recipe['recipe_id']}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({'message':f'Error creating recipe: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

class GetSharedRecipeById(generics.ListCreateAPIView):
    serializer_class = DetailedRecipeSerializer

    def get(self, request, *args, **kwargs):
        recipe_id = kwargs['recipe_id']
        return recipes_sql.get_shared_recipe_by_id(recipe_id)
    
class EditUserRecipeList(generics.ListCreateAPIView):
    def post(self, request, *args, **kwargs):
        try:
            user_id = kwargs['user_id']
            recipe_id = request.data.get('recipe_id')
            action = request.data.get('action')
            if recipe_id != request.user.pk:
                raise
            if not user_id or recipe_id is None or action is None:
                raise
            if action == 'add':
                recipes_sql.add_recipe_to_saved(user_id, recipe_id)
                return Response({'message':'recipe successfully added'})
            elif action == 'remove':
                recipes_sql.remove_recipe_from_saved(user_id, recipe_id)
                return Response({'message':'recipe successfully removed'})
        except Exception as e:
            return Response({'message':f'Error updating list: {str(e)}'})


# Overrides
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
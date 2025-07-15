from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from .recipe_tags import recipe_tags_sql
from .additional_tools import additional_tools_sql
from .cooking_methods import cooking_methods_sql
from .ingredients import ingredients_sql

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, birthday=None):
        if not username:
            raise ValueError('Users need a username')
        user = self.model(username=username, birthday=birthday)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(null=False, max_length=30, unique=True)
    # TODO: Verify that null=false is needed
    password = models.TextField(null=False)
    date_joined = models.DateField(auto_now_add=True)
    birthday = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'

    class Meta:
        managed = False
        db_table = 'users'

class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.TextField(unique=True)
    ingredient_caloric_value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ingredients'

class AdditionalTools(models.Model):
    additional_tool_id = models.AutoField(primary_key=True)
    additional_tool_name = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'additional_tools'

class CookingMethods(models.Model):
    cooking_method_id = models.AutoField(primary_key=True)
    cooking_method_name = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'cooking_methods'

class MeasurementUnit(models.Model):
    measurement_unit_id = models.AutoField(primary_key=True)
    measurement_unit_name = models.TextField(unique=True)

    class Meta:
        managed = False
        db_table = 'measurement_units'
    
class RecipeTags(models.Model):
    recipe_tag_id = models.AutoField(primary_key=True)
    recipe_tag_name = models.CharField(unique=True)

    class Meta:
        managed = False
        db_table = 'recipe_tags'

class Recipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_name = models.CharField(max_length=100, unique=True)
    recipe_description = models.CharField(max_length=500, blank=True, null=True)
    recipe_cook_time = models.IntegerField(blank=True, null=True)
    recipe_prep_time = models.IntegerField(blank=True, null=True)
    recipe_instructions = ArrayField(
        models.CharField(max_length=150),
        blank=True,
        null=True
    )
    author_id = models.ForeignKey(CustomUser, models.DO_NOTHING, db_column='user_id')

    class Meta:
        managed = False
        db_table = 'recipes'

class RecipeAdditionalTools(models.Model):
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    additional_tool_id = models.ForeignKey(AdditionalTools, models.DO_NOTHING, db_column='additional_tool_id')
    additional_tool_quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipe_additional_tools'
        constraints = [models.UniqueConstraint(fields=['recipe_id', 'additional_tool_id'], name='unique_recipe_additional_tools')]

class RecipeCookingMethod(models.Model):
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    cooking_method_id = models.ForeignKey(CookingMethods, models.DO_NOTHING, db_column='cooking_method_id')
    cooking_method_quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipe_cooking_method'
        constraints = [models.UniqueConstraint(fields=['recipe_id', 'cooking_method_id'], name='unique_recipe_cooking_method')]

class RecipeIngredient(models.Model):
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    ingredient_id = models.ForeignKey(Ingredient, models.DO_NOTHING, db_column='ingredient_id')
    measurement_unit_id = models.ForeignKey(MeasurementUnit, models.DO_NOTHING, db_column='measurement_unit_id', blank=True, null=True)
    measurement_quantity = models.DecimalField(decimal_places=2, max_digits=6)

    class Meta:
        managed = False
        db_table = 'recipe_ingredient'
        constraints = [models.UniqueConstraint(fields=['recipe_id', 'ingredient_id', 'measurement_unit_id'], name='unique_recipe_ingredient')]

class UserRecipeListItem(models.Model):
    user_id = models.ForeignKey(CustomUser, models.DO_NOTHING, db_column='user_id')
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')

    class Meta:
        managed = False
        db_table = 'user_recipe_list'
        constraints = [models.UniqueConstraint(fields=['user_id', 'recipe_id'], name='unique_user_recipe')]

class RecipeTagList:
    def __init__(self, recipe: Recipe):
        self.recipe_id = recipe.recipe_id
        self.tags_list = self.get_tags()
    def get_tags(self):
        return recipe_tags_sql.get_recipe_tags_for_recipe(self.recipe_id)
    
class AdditionalToolList:
    def __init__(self, recipe: Recipe):
        self.recipe_id = recipe.recipe_id
        self.additional_tool_list = self.get_additional_tools()
    def get_additional_tools(self):
        return additional_tools_sql.get_additional_tools_for_recipe(self.recipe_id)
    
class CookingMethodList:
    def __init__(self, recipe: Recipe):
        self.recipe_id = recipe.recipe_id
        self.cooking_method_list = self.get_cooking_methods()
    def get_cooking_methods(self):
        return cooking_methods_sql.get_cooking_methods_for_recipe(self.recipe_id)
    
class IngredientList:
    def __init__(self, recipe: Recipe):
        self.recipe_id = recipe.recipe_id
        self.ingredients_list = self.get_ingredients()
    def get_ingredients(self):
        return ingredients_sql.get_ingredients_for_recipe(self.recipe_id)

class BaseRecipe:
    def __init__(self, recipe: Recipe):
        self.recipe_id = recipe.recipe_id
        self.recipe_name = recipe.recipe_name
        self.recipe_description = recipe.recipe_description
        self.recipe_cook_time = recipe.recipe_cook_time
        self.recipe_prep_time = recipe.recipe_prep_time
        self.recipe_instructions = recipe.recipe_instructions
        self.author_id = recipe.author_id

class DetailedRecipe(BaseRecipe):
    def __init__(self, recipe):
        super().__init__(recipe)
        self.tag_list = RecipeTagList(self.recipe_id).tags_list
        self.additional_tool_list = AdditionalToolList(self.recipe_id).additional_tool_list
        self.cooking_method_list = CookingMethodList(self.recipe_id).cooking_method_list
        self.ingredients_list = IngredientList(self.recipe_id).ingredients_list

# TODO: Add model for comprehensive list of recipes by user
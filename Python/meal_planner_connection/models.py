from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

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
    measurement_quantity = models.DecimalField()

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

# TODO: Add model for comprehensive list of recipes by user
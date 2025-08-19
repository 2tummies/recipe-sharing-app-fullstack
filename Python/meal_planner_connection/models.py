from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone

from .recipe_tags import recipe_tags_sql
from .additional_tools import additional_tools_sql
from .cooking_methods import cooking_methods_sql
from .ingredients import ingredients_sql
from .users import users_sql

class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users need a username')
        current_time = timezone.now()
        extra_fields.setdefault('birthday', None)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        extra_fields.setdefault('last_login', current_time)
        extra_fields.setdefault('date_joined', current_time)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError('Users need a username')
        current_time = timezone.now()
        extra_fields.setdefault('birthday', None)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('last_login', current_time)
        extra_fields.setdefault('date_joined', current_time)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(null=False, blank=False, max_length=30, unique=True)
    password = models.TextField(null=False, blank=False, db_column='password_hash')
    date_joined = models.DateField(auto_now_add=True)
    birthday = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'

    @property
    def id(self):
        return self.user_id

    class Meta:
        managed = False
        db_table = 'users'

class Ingredient(models.Model):
    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.TextField(unique=True, null=False, blank=False)
    ingredient_caloric_value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ingredients'

class AdditionalTools(models.Model):
    additional_tool_id = models.AutoField(primary_key=True)
    additional_tool_name = models.TextField(unique=True, null=False, blank=False)

    class Meta:
        managed = False
        db_table = 'additional_tools'

class CookingMethods(models.Model):
    cooking_method_id = models.AutoField(primary_key=True)
    cooking_method_name = models.TextField(unique=True, null=False, blank=False)

    class Meta:
        managed = False
        db_table = 'cooking_methods'

class MeasurementUnit(models.Model):
    measurement_unit_id = models.AutoField(primary_key=True)
    measurement_unit_name = models.TextField(unique=True, null=False, blank=False)

    class Meta:
        managed = False
        db_table = 'measurement_units'
    
class RecipeTags(models.Model):
    recipe_tag_id = models.AutoField(primary_key=True)
    recipe_tag_name = models.CharField(unique=True, null=False, blank=False)

    class Meta:
        managed = False
        db_table = 'recipe_tags'

class Recipe(models.Model):
    recipe_id = models.AutoField(primary_key=True)
    recipe_name = models.CharField(max_length=100, unique=True, null=False, blank=False)
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

class RecipeRecipeTags(models.Model):
    recipe_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_id')
    recipe_tag_id = models.ForeignKey(Recipe, models.DO_NOTHING, db_column='recipe_tag_id')

    class Meta:
        managed = False
        db_table = 'recipe_recipe_tags'
        constraints = [models.UniqueConstraint(fields=['recipe_id', 'recipe_tag_id'], name='unique_recipe_recipe_tag')]

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

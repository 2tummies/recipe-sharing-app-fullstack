from django.db import models
from django.contrib.postgres.fields import ArrayField

from django.contrib.auth.models import User

class Ingredient(models.Model):

    ingredient_id = models.AutoField(primary_key=True)
    ingredient_name = models.CharField(unique=True, max_length=200)
    ingredient_caloric_value = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'ingredients'

    def __str__(self):
        return self.ingredient_name

class AdditionalTools(models.Model):

    additional_tool_id = models.AutoField(primary_key=True)
    additional_tool_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'additional_tools'

    def __str__(self):
        return self.additional_tool_name

class CookingMethods(models.Model):

    cooking_method_id = models.AutoField(primary_key=True)
    cooking_method_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'cooking_methods'

    def __str__(self):
        return self.cooking_method_name

class MeasurementUnits(models.Model):

    measurement_unit_id = models.AutoField(primary_key=True)
    measurement_unit_name = models.CharField(unique=True, max_length=50)

    class Meta:
        managed = False
        db_table = 'measurement_units'

    def __str__(self):
        return self.measurement_unit_name
    
class RecipeTags(models.Model):

    recipe_tag_id = models.AutoField(primary_key=True)
    recipe_tag_name = models.CharField(unique=True, max_length=75)

    class Meta:
        managed = False
        db_table = 'recipe_tags'

class Recipes(models.Model):

    recipe_id = models.AutoField(primary_key=True)
    recipe_name = models.CharField(max_length=75)
    recipe_description = models.CharField(max_length=150, blank=True, null=True)
    recipe_cook_time = models.IntegerField(blank=True, null=True)
    recipe_prep_time = models.IntegerField(blank=True, null=True)
    recipe_instructions = ArrayField(
        models.CharField(max_length=250),
        blank=True,
        null=True
    )

    class Meta:
        managed = False
        db_table = 'recipes'
    
    def __str__(self):
        return self.recipe_name

class RecipeAdditionalTools(models.Model):

    recipe = models.OneToOneField('Recipes', models.DO_NOTHING, primary_key=True)
    additional_tool = models.ForeignKey(AdditionalTools, models.DO_NOTHING)
    additional_tool_quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipe_additional_tools'
        unique_together = (('recipe', 'additional_tool'),)

class RecipeCookingMethod(models.Model):

    recipe = models.OneToOneField('Recipes', models.DO_NOTHING, primary_key=True)
    cooking_method = models.ForeignKey(CookingMethods, models.DO_NOTHING)
    cooking_method_quantity = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'recipe_cooking_method'
        unique_together = (('recipe', 'cooking_method'),)

class RecipeIngredient(models.Model):

    recipe_pk = models.OneToOneField('Recipes', models.DO_NOTHING, db_column='recipe_pk', primary_key=True)
    ingredient_pk = models.ForeignKey(Ingredient, models.DO_NOTHING, db_column='ingredient_pk')
    measurement_unit = models.ForeignKey(MeasurementUnits, models.DO_NOTHING, db_column='measurement_unit', blank=True, null=True)
    measurement_quantity = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'recipe_ingredient'
        unique_together = (('recipe_pk', 'ingredient_pk', 'measurement_unit'),)
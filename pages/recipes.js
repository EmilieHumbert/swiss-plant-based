import RecipeDetails from "../components/recipeDetails";
import RecipeIngredients from "../components/recipeIngredients";
import RecipeInstructions from "../components/recipeInstructions";

export default function Recipes() {
  return (
    <>
      <h1>Recipe</h1>
      <RecipeDetails />
      <RecipeInstructions />
      <RecipeIngredients />
    </>
  );
}

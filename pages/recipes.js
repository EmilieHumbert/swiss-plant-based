import RecipeDetail from "../components/recipeDetail";
import RecipeIngredient from "../components/recipeIngredient";
import RecipeInstruction from "../components/recipeInstruction";

export default function Recipes() {
  return (
    <>
      <h1>Recipes</h1>
      <RecipeDetail />
      <RecipeInstruction />
      <RecipeIngredient />
    </>
  );
}

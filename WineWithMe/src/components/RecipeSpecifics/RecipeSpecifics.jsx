import veganImage from '../../images/vegan.png';
import vegetarianImage from '../../images/vegetarian.png';
import dairyFreeImage from '../../images/dairy-free.png';
import glutenFreeImage from '../../images/gluten-free.png'
import "./RecipeSpecifics.css"

function recipeSpecifics(recipe){
    const images = [
        recipe.dairyFree ? <img key="dairyFree" src={dairyFreeImage} alt="Dairy-free" className="recipe-specifics-img" title="Dairy Free" /> : null,
        recipe.glutenFree ? <img key="glutenFree" src={glutenFreeImage} alt="Gluten-free" className="recipe-specifics-img" title="Gluten Free" /> : null,
        recipe.vegan ? <img key="vegan" src={veganImage} alt="Vegan" className="recipe-specifics-img" title="Vegan" /> : null,
        recipe.vegetarian ? <img key="vegetarian" src={vegetarianImage} alt="Vegetarian" className="recipe-specifics-img" title="Vegetarian" /> : null,
      ];  
    return(
        <div>
            {images}
        </div>
    )
}

export { recipeSpecifics }
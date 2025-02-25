import TextElement from '../../sharedcomponents/TextElement'

const RecipeTag = ({
    tagName
}) => {
    return (
        <>
            <TextElement textValue={tagName} />
        </>
    )
}

export default RecipeTag
import {Link} from "react-router-dom";

interface IProps {
    name: string;
    id: number;
    breed: string;
    animal: string;
    location: string;
    images: string[]
}

const Pet = ({ name, id, breed, animal, images, location }: IProps) => {
    const hero = images && images.length ? images[0] : "http://pets-images.dev-apis.com/pets/none.jpg";

    return (
        <Link to={`/details/${id}`} className="pet relative block">
            <div className='image-container'>
                <img src={hero} alt={name} data-testid="thumbnail" />
            </div>
            <div className="info absolute bottom-0 left-0 bg-gradient-to-tr from-white to-transparent pr-2 pt-2">
                <h1>{name}</h1>
                <h2>
                    {animal} - {breed} - {location}
                </h2>
            </div>
        </Link>
    );
};

export default Pet;

const Pet = ({ name, id, breed, animal, images, location }) => {
    let hero = images.length ? images[0] : "http://pets-images.dev-apis.com/pets/none.jpg";

    return (
        <a className="pet">
            <div className="image-container">
                <img src={hero} alt={name} />
            </div>
            <div className="info">
                <h1>{name}</h1>
                <h2>
                    {animal} - {breed} - {location}
                </h2>
            </div>
        </a>
    );
};

export default Pet;

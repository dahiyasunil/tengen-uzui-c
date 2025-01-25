const NewArrivalCard = ({
  collectionType,
  image,
  catchPhrase,
  collectionHandler,
}) => {
  return (
    <div>
      <button
        data-collectiontype={collectionType}
        onClick={collectionHandler}
        className="flex rounded bg-gradient-to-r from-beige-300 to-beige-100/5 p-6"
      >
        <img src={image} alt="collection" className="w-44 rounded" />
        <div className="flex h-32 flex-col justify-between gap-10 p-10 text-grey-700">
          <p>New Arrival</p>
          <p>{catchPhrase}</p>
        </div>
      </button>
    </div>
  );
};

export default NewArrivalCard;

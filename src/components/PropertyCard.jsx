import { Draggable } from "react-beautiful-dnd";

const PropertyCard = ({ property, index }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <Draggable key={property._id} draggableId={property._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">{property.propertyName}</h5>
                            <p className="card-text">Group: {property.group}</p>
                            <p className="card-text">City: {property.city}</p>
                            <p className="card-text">Fixed Cost: {property.fixedCost}</p>
                            <p className="card-text">Contract Start Date: {formatDate(property.contractStartDate)}</p>
                            <p className="card-text">Contract End Date: {formatDate(property.contractEndDate)}</p>
                            {property?.tag && (
                                <p className="tag-item">Tag: {property?.tag}</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default PropertyCard;

import { Droppable } from "react-beautiful-dnd";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ droppableId, properties, columnName }) => (
    <Droppable droppableId={droppableId}>
        {(provided) => (
            <div className="col-lg-4 col-md-4 box-column" ref={provided.innerRef} {...provided.droppableProps}>
                <h3>{columnName} <span className="fw-light">({properties?.length})</span></h3>
                {properties.map((property, index) => (
                    <PropertyCard key={property._id} property={property} index={index} />
                ))}
                {provided.placeholder}
            </div>
        )}
    </Droppable>
);

export default PropertyList;

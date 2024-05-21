import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { getProperties, updatePropertyGroup } from './api/functions/properties';
import PropertyList from './components/PropertyList';
import toast, { Toaster } from 'react-hot-toast';
import ModalForm from './components/ModalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Loader from './components/Loader';

const App = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getProperties();
            if (response.status === 200) {
                setProperties(response.data.properties);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const onDragEnd = async (result) => {
        const { destination, source, draggableId } = result;

        if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
            return;
        }

        const draggedProperty = properties.find(property => property._id === draggableId);
        const updatedProperties = properties.filter(property => property._id !== draggableId);

        // Insert dragged property at the top of the destination list
        updatedProperties.splice(0, 0, { ...draggedProperty, group: destination.droppableId });

        setProperties(updatedProperties);

        const response = await updatePropertyGroup(draggableId, destination.droppableId);
        toast.success(response.data.message);
    };

    const addNewProperty = (newProperty) => {
        setProperties([newProperty, ...properties]);
    };

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredProperties = properties.filter(property =>
        property?.propertyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.tag?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.group?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property?.fixedCost?.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <div className="container pt-5 pb-5 bg-light">
                <div className="row justify-content-between align-items-center mb-5 ">
                    <div className="col-lg-4">
                        <button type='button' className='btn rounded-0 ps-4 pe-4 py-3 text-dark' data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Add New Property
                        </button>
                    </div>
                    <div className="col-lg-4">
                        <form className='position-relative' onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search properties..."
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                            <button type='button' className='btn btn_search position-absolute top-0 end-0'>
                                <FontAwesomeIcon icon={faMagnifyingGlass} color='#16d6cd' />
                            </button>
                        </form>
                    </div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="row">
                        <PropertyList
                            columnName="Cleanings Required"
                            droppableId="Exited"
                            properties={filteredProperties.filter(property => property.group === 'Exited')}
                        />
                        <PropertyList
                            columnName="Cleanings Pending"
                            droppableId="Cleanings Pending"
                            properties={filteredProperties.filter(property => property.group === 'Cleanings Pending')}
                        />
                        <PropertyList
                            columnName="Cleaning Done"
                            droppableId="Full Property List"
                            properties={filteredProperties.filter(property => property.group === 'Full Property List')}
                        />
                    </div>
                    <Toaster />
                </DragDropContext>
            </div>

            <ModalForm addNewProperty={addNewProperty} />
        </>
    );
};

export default App;

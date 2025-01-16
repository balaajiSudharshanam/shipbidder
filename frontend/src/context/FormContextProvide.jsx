import React, { useState, createContext, useContext } from 'react';
import { userState } from './UserContextProvider';
import axios from 'axios';
import CreateLocation from '../CreateAuctionForm/CreateLocation';
import CreateItem from '../CreateAuctionForm/CreateItem';
import AuctionForm from '../CreateAuctionForm/AuctionForm';

// Create the context
const FormContext = createContext();

const FormContextProvider = ({ children }) => {
    const { user } = userState();
    const [Errors, setErrors] = useState({});
    const [itemErrors, setItemErrors] = useState({});
    const steps = [
        <CreateLocation />,
        <CreateItem />,
        <AuctionForm />
      ];
    const [locationFormData, setLocationFormData] = useState({
        pickupAddress: '',
        pickupCity: '',
        pickupState: '',
        pickupPostalCode: '',
        pickupLatitude: '',
        pickupLongitude: '',
        dropAddress: '',
        dropCity: '',
        dropState: '',
        dropPostalCode: '',
        dropLatitude: '',
        dropLongitude: '',
    });

    const [itemFormData, setItemFormData] = useState({
        createdBy:'',
        pic: '',
        height: '',
        length: '',
        width: '',
        weight: '',
        category: '',
        subCategory: '',
        isFragile: false,
        isHazardous: false,
        description: '',
    });

    const [auction, setAuctionData] = useState({
        jobTitle: '',
        jobDescription: '',
        pickupDateTime: '',
        dropDateTime: '',
        jobProvider: '',
        budget: '', 
    });

    const fetchCoordinates = async (address) => {
        const apiKey = 'd3540bd1-d845-4c29-a663-235b97d384a6';
        try {
            const response = await axios.get(`https://graphhopper.com/api/1/geocode`, {
                params: {
                    q: address,
                    locale: 'en',
                    limit: 1,
                    key: apiKey,
                },
            });
            if (response.data.hits && response.data.hits.length > 0) {
                const { lat, lng } = response.data.hits[0].point;
                return { lat, lng };
            } else {
                console.log(`No coordinates found for ${address}.`);
                return null;
            }
        } catch (error) {
            console.error(`Error fetching coordinates for ${address}:`, error);
            return null;
        }
    };

    const creatauction = async () => {
        const newErrors={};
        const requiredFields=[
            'jobTitle',
            'pickupDateTime',
            'dropDateTime',
            'budget'
        ];
        requiredFields.forEach((field)=>{
            if(!auction[field]){
                newErrors[field]='This field is required'
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors); 
            return;
        }
        const pickupAddress = `${locationFormData.pickupAddress}, ${locationFormData.pickupCity}, ${locationFormData.pickupState} - ${locationFormData.pickupPostalCode}`;
        const dropAddress = `${locationFormData.dropAddress}, ${locationFormData.dropCity}, ${locationFormData.dropState} - ${locationFormData.dropPostalCode}`;

        // Fetch coordinates for pickup and drop locations
        const [pickupCoordinates, dropCoordinates] = await Promise.all([
            fetchCoordinates(pickupAddress),
            fetchCoordinates(dropAddress),
        ]);

        if (pickupCoordinates && dropCoordinates) {
            setLocationFormData((prevData) => ({
                ...prevData,
                pickupLatitude: pickupCoordinates.lat,
                pickupLongitude: pickupCoordinates.lng,
                dropLatitude: dropCoordinates.lat,
                dropLongitude: dropCoordinates.lng,
            }));

            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`,
                },
            };

            try {
                // 1. Create location
                const locationResponse = await axios.post(
                    'http://localhost:3500/api/location',
                    {
                        ...locationFormData,
                        pickupLatitude: pickupCoordinates.lat,
                        pickupLongitude: pickupCoordinates.lng,
                        dropLatitude: dropCoordinates.lat,
                        dropLongitude: dropCoordinates.lng,
                    },
                    config
                );

                const locationData = locationResponse.data;

                // 2. Create item
                const itemResponse = await axios.post('http://localhost:3500/api/item', itemFormData, config);
                const itemData = itemResponse.data;
                console.log(itemData);
                // 3. Create auction
                const auctionResponse = await axios.post(
                    'http://localhost:3500/api/auction',
                    {
                        ...auction,
                        pickupLocation: locationData.pickupLocation._id,
                        dropLocation: locationData.dropLocation._id,
                        item: itemData._id,
                       
                    },
                    config
                );

                console.log("Auction created successfully:", auctionResponse.data);
            } catch (error) {
                console.error("Error creating auction:", error);
            }
        } else {
            console.log("Unable to fetch coordinates for either pickup or drop location.");
        }
    };

    return (
        <FormContext.Provider value={{ locationFormData, setLocationFormData, itemFormData, setItemFormData, auction, setAuctionData, creatauction, Errors, setErrors,itemErrors, setItemErrors, steps }}>
            {children}
        </FormContext.Provider>
    );
};

// Hook for using the form context
export const useFormState = () => {
    return useContext(FormContext);
};

export default FormContextProvider;

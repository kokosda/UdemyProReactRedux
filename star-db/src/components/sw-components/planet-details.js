import React from 'react';
import ItemDetails, { Record } from '../item-details';
import {withSwapiService} from '../hoc-helpers';

const PlanetDetails = (props) => {
    return (
        <ItemDetails {... props}>
            <Record field="population" labe l="Population" />
            <Record field="rotationPeriod" label="Rotation Period" />
            <Record field="diameter" label="Diameter" />
        </ItemDetails>
    );
};

const mapMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);
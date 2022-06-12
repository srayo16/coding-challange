import React from 'react';

const Done = ({ doneSingle, index }) => {
    const { titlePro, descriptionPro } = doneSingle;
    // console.log(doneSingle);

    return (
        <tr>
            <td>{index + 1}</td>
            <td>{titlePro}</td>
            <td>{descriptionPro}</td>
        </tr>
    );
};

export default Done;
import React from 'react';

const Progress = ({ progress, index }) => {
    const { titlePro, descriptionPro } = progress;
    // console.log(progress)
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{titlePro}</td>
            <td>{descriptionPro}</td>
        </tr>
    );
};

export default Progress;
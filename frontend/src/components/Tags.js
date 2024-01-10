// Bibliothèques
import React from "react";
import Tableau from "./Tableau";
import FetchData from "./FetchData";
import { getTagsURL } from "./Urls";

const COLUMNS = [
    {
        field: 'id',
        renderHeader: () => (
            <strong className="fs-5">
                {'Id'}
            </strong>
        ),
        width: 250
    },
    {
        field: 'nom',
        renderHeader: () => (
            <strong className="fs-5">
                {'Nom'}
            </strong>
        ),
        width: 250
    }
];

/**
 * This component generates the Tag page.
 */
function Tags() {
    const API_URL_TAGS = getTagsURL();
    const { data } = FetchData(API_URL_TAGS);

    return (
        <div className="container my-4">
            <div className="mx-auto">
                <Tableau data={data} columns={COLUMNS} />
            </div>
        </div>
    );
}

// Exportation
export default Tags;
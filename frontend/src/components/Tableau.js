// Bibliothèques
import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import FetchData from "./FetchData";
import { getArticlesURL } from "./Urls";

const COLUMNS = [
    {
        field: 'titre',
        headerName: 'Titre',
        width: 250,
        renderCell: (params) => (
            <a href={params.row.url_article} target="_blank" rel="noopener noreferrer">
                {params.row.titre}
            </a>
        ),
    },
    { field: 'auteur', headerName: 'Auteur', width: 150 },
    {
        field: 'url_site',
        headerName: 'Site',
        width: 250,
        renderCell: (params) => (
            <a href={params.row.url_site} target="_blank" rel="noopener noreferrer">
                {params.row.url_site}
            </a>
        ),
    },
    { field: 'date', headerName: 'Date', width: 70 },
    {
        field: 'synopsis',
        headerName: 'Synopsis',
        width: 400,
        renderCell: (params) => (
            <div style={{ whiteSpace: 'pre-line', wordWrap: 'break-word' }}>
                {params.row.synopsis}
            </div>
        ),
    },
];

function Tableau() {
    const API_URL_ARTICLES = getArticlesURL();
    const { data } = FetchData(API_URL_ARTICLES);

    return (
        <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={data} columns={COLUMNS} getRowHeight={() => 'auto'} />
        </div>
    )
}

export default Tableau;
import React from "react";
import Tableau from "./Tableau";
import Ajout from "./Ajout";
import FetchData from "./FetchData";
import { getArticlesURL } from "./Urls";

function Page() {
    const API_URL_ARTICLES = getArticlesURL();
    const { data, fetchData } = FetchData(API_URL_ARTICLES);

    return (
        <>
            <Ajout fetchData={fetchData} />
            <Tableau data={data} />
        </>
    )
}

export default Page;
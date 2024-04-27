// Libraries
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
// Configuration Files
import { Article } from "../Tools/Types";
import { getArticlesURL } from "../Tools/Urls";
import { useArticles } from "../../redux/selectors";
// Components
import DataTable from "../Structure/DataTable";
import ButtonEdit from "../Buttons/ButtonEdit";

/**
 * This component generates the Tag page.
 */
function PageFavoris() {
  const currentArticles = useArticles();
  const favoris = currentArticles.filter(
    (article: Article) => article.favorite === true
  );
  const API_URL_ARTICLES: string = getArticlesURL();

  const COLUMNS: GridColDef[] = [
    {
      field: "title",
      width: 450,
      renderHeader: () => <strong className="fs-5">{"Title"}</strong>,
      renderCell: (params) => (
        <a
          href={params.row.url_article}
          target="_blank"
          rel="noopener noreferrer"
        >
          {params.row.name}
        </a>
      ),
    },
    {
      field: "author",
      width: 150,
      renderHeader: () => <strong className="fs-5">{"Author"}</strong>,
    },
    {
      field: "year",
      renderHeader: () => <strong className="fs-5">{"Year"}</strong>,
    },
    {
      field: "read",
      renderHeader: () => <strong className="fs-5">{"Read"}</strong>,
      renderCell: (params) => <Checkbox disabled checked={params.row.read} />,
    },
    {
      field: "read_again",
      width: 150,
      renderHeader: () => <strong className="fs-5">{"Read Again"}</strong>,
      renderCell: (params) => (
        <Checkbox disabled checked={params.row.read_again} />
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      renderHeader: () => <strong className="fs-5">{"Actions"}</strong>,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <ButtonEdit url={API_URL_ARTICLES} activeItem={params.row} />
        </div>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col mx-16 space-y-4">
      <div className="shadow bg-white rounded overflow-auto">
        <DataTable data={favoris} columns={COLUMNS} />
      </div>
    </div>
  );
}

// Exportation
export default PageFavoris;

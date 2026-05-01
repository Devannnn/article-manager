import { GridColDef } from '@mui/x-data-grid';
import { Heart } from 'react-feather';
import { Article } from '../../constants/types';
import { useArticles } from '../../hooks/queries';
import AddButton from '../features/AddButton';
import StatusIcon from '../features/StatusIcon';
import DataTable from '../layout/DataTable';
import EditButton from '../features/EditButton';
import ArticleForm from '../forms/ArticleForm';
import PageHeader from '../layout/PageHeader';

function ArticlesPage() {
  const { data: articles = [] } = useArticles();
  const consultedCount = articles.filter((article) => article.consulted).length;
  const likedCount = articles.filter((article) => article.liked).length;

  const TITLE_ADD_FORM: string = 'Add article';
  const newArticle: Article = {
    id: 0,
    title: '',
    author: '',
    url: '',
    year: new Date().getFullYear(),
    summary: '',
    consulted: false,
    read_later: false,
    liked: false,
    tags: [],
    date_creation: '',
    date_modification: '',
  };
  const COLUMNS: GridColDef[] = [
    {
      field: 'title',
      width: 300,
      renderHeader: () => <strong className="fs-5">{'Title'}</strong>,
      renderCell: (params) => (
        <a href={params.row.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: params.row.consulted ? 'line-through' : 'none' }}>
          {params.row.title}
        </a>
      ),
    },
    {
      field: 'author',
      width: 150,
      renderHeader: () => <strong className="fs-5">{'Author'}</strong>,
    },
    {
      field: 'year',
      renderHeader: () => <strong className="fs-5">{'Year'}</strong>,
    },
    {
      field: 'date_modification',
      renderCell: (params) => {
        const date = new Date(params.row.date_modification);
        return date.toLocaleDateString('en-US');
      },
      renderHeader: () => <strong className="fs-5">{'Time'}</strong>,
    },
    {
      field: 'consulted',
      width: 120,
      renderHeader: () => <strong className="fs-5">{'Consulted'}</strong>,
      renderCell: (params) => <StatusIcon active={params.row.consulted} />,
    },
    {
      field: 'read_later',
      width: 120,
      renderHeader: () => <strong className="fs-5">{'Read later'}</strong>,
      renderCell: (params) => <StatusIcon active={params.row.read_later} />,
    },
    {
      field: 'liked',
      renderHeader: () => <strong className="fs-5">{'Liked'}</strong>,
      renderCell: (params) => (
        <span
          className={`inline-flex h-8 w-8 items-center justify-center ${
            params.row.liked ? 'text-red-500 dark:text-red-400' : 'text-slate-400 dark:text-slate-500'
          }`}
          aria-label={params.row.liked ? 'Liked' : 'Not liked'}
          title={params.row.liked ? 'Liked' : 'Not liked'}
        >
          <Heart size={18} fill={params.row.liked ? 'currentColor' : 'none'} aria-hidden="true" />
        </span>
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      renderHeader: () => <strong className="fs-5">{'Edit'}</strong>,
      renderCell: (params) => (
        <div className="d-flex justify-content-center align-items-center">
          <EditButton activeItem={params.row} />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageHeader title="Articles" description="Manage your library and track your reading at a glance.">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-700">{articles.length} total</span>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
            {consultedCount} consulted
          </span>
          <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-900/40 dark:text-red-300">{likedCount} liked</span>
        </div>
      </PageHeader>

      <div className="flex justify-end">
        <AddButton FormComponent={ArticleForm} title={TITLE_ADD_FORM} activeItem={newArticle} />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <DataTable data={articles} columns={COLUMNS} />
      </div>
    </div>
  );
}

// Exportation
export default ArticlesPage;
